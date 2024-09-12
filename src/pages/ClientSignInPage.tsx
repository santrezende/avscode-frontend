import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useClientContext } from "../context/ClientContext";
import { toast } from "react-toastify";

function ClientSignInPage() {
    const [licensePlatePage, setLicensePlatePage] = useState("");
    const handlelicensePlateInput = (event: ChangeEvent<HTMLInputElement>) => setLicensePlatePage(event.target.value);

    const [cpfPage, setCpfPage] = useState("");
    const handleCpfInput = (event: ChangeEvent<HTMLInputElement>) => setCpfPage(event.target.value);

    const [insertedlicensePlate, setInsertedlicensePlate] = useState(false);
    const handleNextClick = () => {
        if (licensePlatePage.length === 7) {
            setInsertedlicensePlate(true);
            setRenderWarning(false);
        }
    }

    const [renderWarning, setRenderWarning] = useState(false);

    const navigate = useNavigate();
    const { setName, setCpf, setLastOilChange, setLicensePlate, setCarInfo } = useClientContext();

    const handleSignInClick = async () => {
        try{
            const response = await api.post(`/vehicles/${licensePlatePage.toUpperCase()}`, { licensePlate: licensePlatePage.toUpperCase(), cpf: cpfPage });

            setCarInfo(response.data);

            setName(response.data.customerName);
            localStorage.setItem('name', response.data.customerName);

            setCpf(response.data.cpf);
            localStorage.setItem('cpf', response.data.cpf);

            setLastOilChange(response.data.lastOilChange);
            localStorage.setItem('lastOilChange', response.data.lastOilChange);

            setLicensePlate(response.data.licensePlate);
            localStorage.setItem('licensePlate', response.data.licensePlate);

            navigate('/home');
            toast.success('Login realizado com sucesso!');
        } catch (error: any) {
            console.log(error.response.data);
            setRenderWarning(true);
            setInsertedlicensePlate(false);
            setLicensePlatePage("");
            setCpfPage("");
        }
    }

    return (
        <>
            {insertedlicensePlate === false ? (
                <>
                    <Instruction>Digite sua placa</Instruction>
                    <Input type="text" maxLength={7} value={licensePlatePage} onChange={handlelicensePlateInput} />
                    <button onClick={handleNextClick}>Próximo</button>
                </>
            ) : (
                <>
                    <LicensePlate>{licensePlatePage}</LicensePlate>
                    <Instruction>Digite seu CPF</Instruction>
                    <Input type="text" maxLength={11} value={cpfPage} onChange={handleCpfInput} />
                    <button onClick={handleSignInClick}>Entrar</button>
                </>
            )}
            {renderWarning === true ? (
                <>
                    <WarningContainer>
                        <h4>Placa não cadastrada ou CPF inválido!</h4>
                        <h6>Tente novamente ou fale com a gente pelo WhatsApp.</h6>
                    </WarningContainer>
                </>
            ): ''}
            <Footer />
        </>
    )
}

const LicensePlate = styled.h3`
    margin-bottom: 10px;
    text-transform: uppercase;
`
const Instruction = styled.h1`
    color: #151515;
    width: 135px;
    margin-bottom: 20px;
`
const Input = styled.input`
    margin-bottom: 20px;
`
const WarningContainer = styled.div`
    background-color: #FFFFFF;
    border-radius: 10px;
    height: 140px;
    margin-top: 20px;
    padding-left: 10px;
    padding-top: 15px;
    display: grid;
`

export default ClientSignInPage;