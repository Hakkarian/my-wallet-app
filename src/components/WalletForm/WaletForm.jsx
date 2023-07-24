import { Formik } from 'formik'
import * as Yup from 'yup';
import { useEffect, useState } from 'react'
import { ErrorMessageCss, FieldCss, FormCss, SubmitButtonCss } from './WalletForm.styled';
import { useWeb3Modal } from '@web3modal/react';
import Web3Modal  from 'web3modal';
import { toast } from 'react-hot-toast';

const validationSchema = Yup.object().shape({
  balance: Yup.number().required(),
  address: Yup.string().required().matches(/^0x[0-9a-zA-Z]{40}$/, "Address must be a combination of 40 chars followed by 0x prefix.")
})

const initialState = {
  balance: null,
  address: ""
}

const WalletForm = () => {
  const [defaultAccount, setDefaultAccount] = useState("");
  const [isAndroid, setIsAndroid] = useState(null);
  const [isIOS, setIsIOS] = useState(null);
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);
  const { open, close } = useWeb3Modal();
  const web3Modal = new Web3Modal();

  console.log(defaultAccount);

  alert("Device seen in the mobile");

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

  const isConnected = web3Modal.connect().then(result => console.log(result))
  console.log(Number(0.1 * 1000000000000).toString(16));

  const sendTransaction = async (e) => {
    e.preventDefault();
    const address = e.target.address.value;
    const balance = e.target.balance.value;
    console.log(balance)
    let params = [
      {
        from: defaultAccount,
        to: address,
        gas: Number(21000).toString(16),
        gasPrice: Number(2500000).toString(16),
        value: Number(balance * 1000000000000).toString(16),
      },
    ];

    await window.ethereum?.request({ method: "eth_sendTransaction", params }).catch((err) => {
      console.log(err);
    })
    toast.promise(saveSettings(settings), {
      loading: "Saving...",
      success: <b>Settings saved!</b>,
      error: <b>Could not save.</b>,
    });
  }

  const installMetamask = () => {
    if (isIOS) {
      return window.location.href = "https://apps.apple.com/ru/app/metamask-blockchain-wallet/id1438144202"
    }
    if (isAndroid) {
      return (window.location.href =
        "https://play.google.com/store/search?q=metamask&c=apps");
    }
    window.location.href =
      "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn";
  }

  return (
    <>
      {isMetamaskInstalled && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2 style={{ color: "#000" }}>
            To use this app, you need to <span style={{color: "#fff"}}>install Metamask.</span> Please,
            do it.
          </h2>
          <button type="button" onClick={installMetamask}>
            Install Metamask
          </button>
        </div>
      )}
      {!isMetamaskInstalled && (
        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={sendTransaction}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
            /* and other goodies */
          }) => (
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
              <SubmitButtonCss type="submit" disabled={isSubmitting}>
                Submit
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