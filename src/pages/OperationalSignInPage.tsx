import styled from "styled-components";
import LogoHeader from "../components/LogoHeader";

function OperationalSignInPage(){
    return(
        <>
            <LogoHeader />
            <StyledH3>Login</StyledH3>
            <Input />
            <StyledH3>Senha</StyledH3>
            <Input />
            <button>Entrar</button>
        </>
    );
};

const StyledH3 = styled.h3`
    font-weight: 400;
    margin-bottom: 20px;
`;

const Input = styled.input`
    margin-bottom: 20px;
    font-size: 20px;
    text-transform: none;
`;

// <>
//     <WarningContainer>
//         <h4>*Senha Incorreta</h4>
//         <h6>Tente novamente.</h5>
//     </WarningContainer>
// </>
// const WarningContainer = styled.div`
//     background-color: #FFFFFF;
//     border-radius: 10px;
//     height: 140px;
//     margin-top: 20px;
//     padding-left: 10px;
//     padding-top: 15px;
//     display: grid;
// `


export default OperationalSignInPage;