import { Toaster } from "react-hot-toast";
import { Suspense, lazy, useEffect } from "react";

import { Container } from "../SharedLayout";
import Header from "../Header";
import Hero from "../Hero";
import { LoaderDesktop } from "../Loader";

// const Hero = lazy(() => import("../Hero"));


const App = () => {
  return (
    <>
      <Toaster />
      <Header />
      {/* <Suspense fallback={<LoaderDesktop />}> */}
        <Container>
          <Hero />
        </Container>
      {/* </Suspense> */}
    </>
  );
};

export default App;
