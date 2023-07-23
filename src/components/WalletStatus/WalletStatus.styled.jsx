import styled from "@emotion/styled";

export const WalletButtonCss = styled.button`
    background-color: transparent;
    border: 1px solid #000;

    &:hover, &:focus {
        background-color: #1a1a1a;
        color: #646cff;
    }
`;

export const WalletInfoCss = styled.div`
    display: flex;
    align-items: center;
    gap: 1.25rem;
    padding: 0 0.5rem;
    border: 1px solid #1a1a1a;
    border-radius: 0.25rem;
`