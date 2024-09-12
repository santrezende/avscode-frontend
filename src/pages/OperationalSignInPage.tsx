import styled from "styled-components";
import LogoHeader from "../components/LogoHeader";
import api from "../api/api.tsx";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOperationalContext } from "../context/OperationalContext.tsx";
import { toast } from "react-toastify";

function OperationalSignInPage() {
  const [email, setEmail] = useState("");
  const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);

  const [password, setPassword] = useState("");
  const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const { setName, setToken } = useOperationalContext();
  const [invalidPassword, setInvalidPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedName = localStorage.getItem("name");

    if (savedToken && savedName) {
      setToken(savedToken);
      setName(savedName);
      navigate("/auth/home");
    }
  }, [setToken, setName, navigate]);

  const handleSignInButton = () => {
    api
      .post("/auth/sign-in", { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.name);

        setName(res.data.name);
        setToken(res.data.token);
        navigate("/auth/home");
        toast.success("Login realizado com sucesso!");
      })
      .catch((err) => {
        console.log(err.response.data);
        setInvalidPassword(true);
      });
  };

  return (
    <>
      <LogoHeader />
      <StyledH3>Login</StyledH3>
      <Input type="email" value={email} onChange={handleEmailInput} />
      <StyledH3>Senha</StyledH3>
      <Input type="password" value={password} onChange={handlePasswordInput} />
      <button onClick={handleSignInButton}>Entrar</button>
      {invalidPassword && (
        <WarningContainer>
          <h4>
            Email ou senha <br /> incorretos
          </h4>
          <h5>Tente novamente.</h5>
        </WarningContainer>
      )}
    </>
  );
}

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
  background-color: #ffffff;
  border-radius: 10px;
  height: 100px;
  margin-top: 20px;
  padding-left: 10px;
  padding-top: 15px;
  display: grid;
`;

export default OperationalSignInPage;
