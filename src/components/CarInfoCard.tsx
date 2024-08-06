import { FaPen } from "react-icons/fa";
import styled from "styled-components";

function CarInfoCard(){
    return(
        <CarInfoContainer>
                <h3>PXZ8194</h3>
                <LineDiv />
                <h6>Nome</h6>
                <h3>Santiago Rezende</h3>
                <h6>Modelo</h6>
                <h3>Jeep Renegade</h3>
                <h6>Ano</h6>
                <h3>2016</h3>
                <h6>Motor</h6>
                <h3>1.8</h3>
                <h6>Quilometragem</h6>
                <h3>70.000 Km</h3>
                <h6>Última troca de óleo</h6>
                <h3>NOV/2023</h3>
                <div>
                    <FaPen />
                    <p>Editar</p>
                </div>
        </CarInfoContainer>
    );
};

const LineDiv = styled.div`
  width: 100%;
  height: 1px;
  background-color: #000000;
  margin-top: 20px;
  margin-bottom: 25px;
`

const CarInfoContainer = styled.div`
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 15px;
  h3, h6 {
    font-weight: 300;
    margin-top: 5px;
  }
  h6 {
    margin-top: 15px;
    width: 150px;
  }
  div:nth-of-type(2) {
    display: flex;
    justify-content: right;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 5px;
    p{
        font-size: 15px;
        font-weight: 500;
        margin-left: 10px;
        cursor: pointer;
    }
  }

`

export default CarInfoCard;