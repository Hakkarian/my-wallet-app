import React from 'react'
import { Radio } from 'react-loader-spinner'

const Loader = () => {
  return (
    <Radio
      visible={true}
      height="20"
      width="20"
      ariaLabel="radio-loading"
      wrapperStyle={{}}
      wrapperClass="radio-wrapper"
      colors={["#747bff", "#FFFF00", "#FFD700"]}
    />
  );
}

const LoaderDesktop = () => {
  return (
    <Radio
      visible={true}
      height="10000"
      width="10000"
      ariaLabel="radio-loading"
      wrapperStyle={{}}
      wrapperClass="radio-wrapper"
      colors={["#747bff", "#FFFF00", "#FFD700"]}
    />
  );
}

export {Loader, LoaderDesktop}