import { Formik } from 'formik'
import * as Yup from 'yup';
import { useState } from 'react'
import { ErrorMessageCss, FieldCss, FormCss, SubmitButtonCss } from './WalletForm.styled';
import { useWeb3Modal } from '@web3modal/react';
import Web3Modal  from 'web3modal';

const validationSchema = Yup.object().shape({
  balance: Yup.number().required(),
  address: Yup.string().required()
})

const initialState = {
  balance: 0.00,
  address: ""
}

console.log(window.ethereum.isConnected());


const WalletForm = () => {
  const [defaultAccount, setDefaultAccount] = useState("");
  const [userBalance, setUserBalance] = useState(0);
  const { open, close } = useWeb3Modal();
  const web3Modal = new Web3Modal();

  const isConnected = web3Modal.connect().then(result => console.log(result))

  console.log(isConnected);

  const connectWallet = () => {
    if (window.ethereum) {
      window.ethereum?.request({ method: 'eth_requestAccounts' }).then((result) => {
          console.log(result[0])
          accountChanged(result[0])
      })
      open();
    } else {
      console.log(('Please, install MetaMask.'))
    }
  }

  const accountChanged = (accountName) => {
    setDefaultAccount(accountName);
    getUserBalance(accountName);
  }

  const getUserBalance = (accountName) => {
    window.ethereum?.request({ method: "eth_getBalance", params: [accountName, "latest"] }).then(balance => {
      console.log('here')
      console.log("weird", Number(balance).toFixed(2));
      setUserBalance(Number(balance));
    })
    console.log('after')
  }

  const sendTransaction = async (values) => {
    console.log(values)
    let params = [
      {
        from: "0x806a568F718dbF42811942430C80Bb5Ce1009cd2",
        to: values.address,
        gas: Number(21000).toString(16),
        gasPrice: Number(2500000),
        value: Number(1000000000000).toString(16),
      },
    ];

    await window.ethereum?.request({ method: "eth_sendTransaction", params }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <>
      {window.ethereum && <><p>{defaultAccount}</p></>}
      <button type='button' onClick={connectWallet}>Press me</button>
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
    </>
  );
}
;

export default WalletForm;