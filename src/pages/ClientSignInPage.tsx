import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";

function ClientSignInPage() {
    const [plate, setPlate] = useState("");
    const handlePlateInput = (event: ChangeEvent<HTMLInputElement>) => setPlate(event.target.value);

    const [cpf, setCpf] = useState("");
    const handleCpfInput = (event: ChangeEvent<HTMLInputElement>) => setCpf(event.target.value);

    const [insertedPlate, setInsertedPlate] = useState(false);
    const handleClick = () => {
        if(plate.length === 7) setInsertedPlate(true);
    }

    return (
        <>
            {insertedPlate === false ? (
                <>
                    <Instruction>Digite sua placa</Instruction>
                    <Input type="text" maxLength={7} value={plate} onChange={handlePlateInput}/>
                    <button onClick={handleClick}>Próximo</button>
                </>
            ) : (
                <>
                    <Plate>{plate}</Plate>
                    <Instruction>Digite seu CPF</Instruction>
                    <Input type="text" maxLength={11} value={cpf} onChange={handleCpfInput}/>
                    <button>Entrar</button>
                </>
            )}
            <Footer/>
        </>
    )
}

// <>
//     <Plate>HBW7408</Plate>
//     <Instruction>Digite sua placa</Instruction>
//     <PlateInput type="text" maxLength={7} value={plate} onChange={handleInputChange}/>
//     <button onClick={handleClick}>Próximo</button>
//     <WarningContainer>
//         <h4>*Placa não encontrada</h4>
//         <h6>Tente novamente ou fale com a gente pelo WhatsApp.</h5>
//     </WarningContainer>
// </>

const Plate = styled.h3`
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
// const WarningContainer = styled.div`
//     background-color: #FFFFFF;
//     border-radius: 10px;
//     height: 140px;
//     margin-top: 20px;
//     padding-left: 10px;
//     padding-top: 15px;
//     display: grid;
// `

export default ClientSignInPage