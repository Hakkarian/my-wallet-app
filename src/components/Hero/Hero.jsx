import WalletForm from '../WalletForm';
import { HeroCss, LinkCss } from './Hero.styled';

const Hero = () => {
  return (
    <HeroCss>
      <WalletForm />
      <LinkCss href="https://github.com/Hakkarian/my-wallet-app">Github</LinkCss>
    </HeroCss>
  );
}

export default Hero