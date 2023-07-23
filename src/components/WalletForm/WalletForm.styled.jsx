import styled from '@emotion/styled';
import { Field, Form } from "formik";
import { WalletButtonCss } from '../WalletStatus/WalletStatus.styled';

export const FormCss = styled(Form)`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  background-color: rgba(255, 255, 255, 0.5);

  backdrop-filter: blur(10px);

  border-radius: 1.25rem;

  @media screen and (min-width: 768px) {
    height: 15rem;
  }

  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

export const FieldCss = styled(Field)`
  padding: 0.5rem;

  border-radius: 1.25rem;

  &.valid {
    border: 1px solid green;
  }

  &.invalid {
    border: 1px solid #8b0000;
  }

  @media screen and (min-width: 768px) {
    width: 20rem;
    height: 1.5rem;
  }
`;

export const ErrorMessageCss = styled.span`
  color: #8b0000;

`;
export const SubmitButtonCss = styled(WalletButtonCss)`
  &:hover,
  &:focus {
    color: #ffd700;
    border: 1px solid #ffd700;
  }
`;