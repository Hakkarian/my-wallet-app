import { Formik } from 'formik'
import * as Yup from 'yup';
import { useEffect, useState } from 'react'
import { useWeb3Modal } from "@web3modal/react";
import Web3Modal from "web3modal";
import { toast } from "react-hot-toast";
import { ErrorMessageCss, FieldCss, FormCss, SubmitButtonCss, Css } from './WalletForm.styled';
import {Loader} from '../Loader'


const validationSchema = Yup.object().shape({
  balance: Yup.number().required().min(0.000001, "Please, enter more that 0.000001 tokens.").max(100000, "Please, enter less than 100000 tokens."),
  address: Yup.string().required().matches(/^0x[0-9a-zA-Z]{40}$/, "Address must be a combination of 40 chars followed by 0x prefix.")
})

const initialState = {
  balance: null,
  address: ""
}

const WalletForm = () => {
  const [defaultAccount, setDefaultAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAndroid, setIsAndroid] = useState(null);
  const [isIOS, setIsIOS] = useState(null);
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);
  const { open, close } = useWeb3Modal();
  const web3Modal = new Web3Modal();

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    setIsIOS(/iPad|iPhone|iPod/.test(userAgent));
    setIsAndroid(/Android/.test(userAgent));
    setIsIOS(() => {

    })
    setIsMetamaskInstalled(!window.ethereum)
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((account) => setDefaultAccount(account[0]));
      
      window.ethereum.on('accountsChanged', account => {
        setDefaultAccount(account[0])
      })
    }
  }, [])

  const sendTransaction = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const address = e.target.address.value;
    const balance = e.target.balance.value;

    if (balance > 100000 || balance < 0.000001) {
      setIsLoading(false);
      toast("Something with your balance :(", {
        icon: "😞",
        style: {
          borderRadius: "20px",
          backgroundColor: "darkred",
          color: "#fff",
        },
      });
      return;
    }
    let params = [
      {
        from: defaultAccount,
        to: address,
        gas: Number(21000).toString(16),
        gasPrice: Number(2500000).toString(16),
        value: (balance * 1e18).toString(16),
      },
    ];

    await window.ethereum
      ?.request({ method: "eth_sendTransaction", params })
      .then(() =>
        toast("Successful transaction!", {
          icon: "🥳",
          style: {
            borderRadius: "20px",
            background: "darkgreen",
            color: "#fff",
          },
        })
      )
      .catch((err) => {
        console.log(err);
        toast("Usuccessful transaction :(", {
          icon: "😞",
          style: {
            borderRadius: "20px",
            backgroundColor: "black",
            color: "#fff",
          },
        });
      })
      .finally(() => {
        setIsLoading(false);
        toast;
      });

  }

  const installMetamask = async () => {
    const promise = new Promise((resolve, reject) => {
      if (isIOS) {
        return resolve(window.location.href =
          "https://apps.apple.com/ru/app/metamask-blockchain-wallet/id1438144202");
      }
      if (isAndroid) {
        return resolve(window.location.href =
          "https://play.google.com/store/search?q=metamask&c=apps");
      }
      resolve(window.location.href =
        "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn")
    })

    await promise.catch((err) => console.log(err))
  }

  return (
    <>
      {isMetamaskInstalled && (
        <Css>
          <h2 style={{ color: "#000" }}>
            To use this app, you need to{" "}
            <span style={{ color: "#fff" }}>install Metamask.</span> Please, do
            it.
          </h2>
          <button type="button" onClick={installMetamask} disabled={isLoading} style={{display: "flex"}}>
            {isLoading && <Loader />} <span>Install Metamask</span>
          </button>
        </Css>
      )}
      {!isMetamaskInstalled && (
        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={sendTransaction}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <FormCss onSubmit={sendTransaction}>
              <label>
                <label>
                  <FieldCss
                    type="address"
                    name="address"
                    placeholder="Enter your address..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    className={errors.address ? "invalid" : "valid"}
                  />
                </label>
                {errors.address && (
                  <ErrorMessageCss>
                    {errors.address && touched.address && errors.address}
                  </ErrorMessageCss>
                )}
                <FieldCss
                  type="balance"
                  name="balance"
                  placeholder="Enter your balance..."
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.balance}
                  className={errors.balance ? "invalid" : "valid"}
                />
              </label>
              {errors.balance && (
                <ErrorMessageCss>
                  {errors.balance && touched.balance && errors.balance}
                </ErrorMessageCss>
              )}
              <SubmitButtonCss type="submit" disabled={isLoading}>
                {isLoading && <Loader />} <span>Submit</span>
              </SubmitButtonCss>
            </FormCss>
          )}
        </Formik>
      )}
    </>
  );
}
;

export default WalletForm;