import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 15px;
        background-color: #F2F2F0;
        font-family: "Archivo", sans-serif;
    }
    button {
        all: unset;
        font-size: 20px;
        background-color: #151515;
        border-radius: 10px;
        outline: none;
        border:none;
        width: 100%;
        height: 65px;
        font-weight: 600;
        color: #FFFFFF;
        cursor: pointer;
        text-align: center;
    }
    h1 {
        font-size: 48px;
    }
    h3 {
        font-size: 32px;
        font-weight: lighter;
    }
    h4{
        font-size: 24px;
        font-weight: bold;
    }
    h5{
        font-size: 24px;
        font-weight: lighter;
    }
    h6{
        font-size: 20px;
    }
    input {
        all: unset;
        font-size: 20px;
        background-color: #D9D9D9;
        border-radius: 10px;
        outline: none;
        border:none;
        width: 100%;
        height: 65px;
        text-align: center;
        font-size: 40px;
        text-transform: uppercase;
    }
`;

export default GlobalStyle;