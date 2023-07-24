import { Toaster } from "react-hot-toast";
import { Container } from "../SharedLayout";
import Header from "../Header";
import Hero from "../Hero";
import { useEffect } from "react";


const App = () => {
  return (
    <>
      <Toaster />
      <Header />
      <Container>
        <Hero />
      </Container>
    </>
  );
};

export default App;
