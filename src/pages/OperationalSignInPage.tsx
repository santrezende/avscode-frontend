import styled from "styled-components";
import LogoHeader from "../components/LogoHeader";
import api from '../api/api.tsx';
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOperationalContext } from "../context/OperationalContext.tsx";

function OperationalSignInPage(){
    const [email, setEmail] = useState('');
    const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);

    const [password, setPassword] = useState('');
    const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

    const { setName, setToken } = useOperationalContext();

    const [invalidPassword, setInvalidPassword] = useState(false);

    const navigate = useNavigate();

    const handleSignInButton = () => {
        api.post('/auth/sign-in', { email, password })
          .then(res => {
            navigate('/auth/home');
            setName(res.data.name);
            setToken(res.data.token);
        })
          .catch(err => {
            console.log(err.response.data);
            setInvalidPassword(true);
        });
    };

    return(
        <>
            <LogoHeader />
            <StyledH3>Login</StyledH3>
            <Input type="email" value={email} onChange={handleEmailInput}/>
            <StyledH3>Senha</StyledH3>
            <Input type="password" value={password} onChange={handlePasswordInput} />
            <button onClick={handleSignInButton}>Entrar</button>
            {invalidPassword === true ? (
            <>
                <WarningContainer>
                    <h4>Email ou senha <br/>incorretos</h4>
                    <h5>Tente novamente.</h5>
                </WarningContainer>
            </>
            ) : ""
            }
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

const WarningContainer = styled.div`
    background-color: #FFFFFF;
    border-radius: 10px;
    height: 100px;
    margin-top: 20px;
    padding-left: 10px;
    padding-top: 15px;
    display: grid;
`


export default OperationalSignInPage;