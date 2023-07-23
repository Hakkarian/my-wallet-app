import { Formik } from 'formik'
import * as Yup from 'yup';
import { useState } from 'react'
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

console.log(window.ethereum.isConnected());

const WalletForm = () => {
  const [defaultAccount, setDefaultAccount] = useState("");
  const [userBalance, setUserBalance] = useState(null);
  const { open, close } = useWeb3Modal();
  const web3Modal = new Web3Modal();

  const isConnected = web3Modal.connect().then(result => console.log(result))
  console.log(Number(0.1 * 1000000000000).toString(16));

  const sendTransaction = async (e) => {
    e.preventDefault();
    const address = e.target.address.value;
    const balance = e.target.balance.value;
    console.log(balance)
    let params = [
      {
        from: "0x806a568F718dbF42811942430C80Bb5Ce1009cd2",
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

  return (
    <>
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
    </>
  );
}
;

export default WalletForm;