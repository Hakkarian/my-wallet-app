import { Container } from '../SharedLayout';
import Header from '../Header';
import Hero from '../Hero';
import { Toaster } from 'react-hot-toast';

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
}

export default App;