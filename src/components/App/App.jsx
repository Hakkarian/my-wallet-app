import { Container } from '../SharedLayout';
import Header from '../Header';
import Hero from '../Hero';

const App = () => {
  return (
    <>
      <Header />
      <Container>
        <Hero />
      </Container>
    </>
  );
}

export default App;