import { FaCircle, FaRegCircle } from "react-icons/fa";
import styled from "styled-components";
import { useSwipeable } from 'react-swipeable';
import { useState } from "react";
import HomeCard from "../components/HomeCard";
import BoschHands from "../assets/bcs_hands.jpg";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import LogoHeader from "../components/LogoHeader";

function ClientHomePage() {
    const [showImage, setShowImage] = useState("false");

    const handlers = useSwipeable({
        onSwipedLeft: () => setShowImage("true"),
        onSwipedRight: () => setShowImage("false"),
        trackMouse: true
    });

    const navigate = useNavigate();
    const navigateToCarInfo = () => {
        navigate("/car");
    };
    const navigateToHistory = () => {
        navigate("/history");
    };

    return (
        <>
            <LogoHeader />
            <h5>Olá, Nome!</h5>
            <HomeContainer {...handlers} showimage={showImage} backgroundimage={BoschHands}>
                {showImage === "false" ? (
                    <>
                        <div>
                            <FaCircle size={10} style={{
                                color: '#F2F2F0',
                                paddingLeft: '2px',
                                paddingRight: '2px'
                            }} />
                            <FaRegCircle onClick={() => setShowImage("true")} size={10} style={{
                                color: '#F2F2F0',
                                paddingLeft: '2px',
                                paddingRight: '2px'
                            }} />
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <FaRegCircle onClick={() => setShowImage("false")} size={10} style={{
                                color: '#F2F2F0',
                                paddingLeft: '2px',
                                paddingRight: '2px'
                            }} />
                            <FaCircle size={10} style={{
                                color: '#F2F2F0',
                                paddingLeft: '2px',
                                paddingRight: '2px'
                            }} />
                        </div>
                    </>
                )}
                {showImage === "false" ? (
                    <>
                        <h3>Última troca de óleo:</h3>
                        <h1>NOV/2023</h1>
                        <div />
                        <h3>Próxima troca em</h3>
                        <h1>5 meses</h1>
                        <h6>NOV/2024</h6>
                    </>
                ) : (
                    <>
                        <div>
                            <h3>Conheça a Bosch</h3>
                        </div>
                    </>
                )}
            </HomeContainer>
            <HomeCard text={"Informações do veículo"} onClick={navigateToCarInfo} />
            <HomeCard text={"Histórico de atendimentos"} onClick={navigateToHistory} />
            <Footer />
        </>
    )
}

interface HomeContainerProps {
    showimage: string;
    backgroundimage: string;
}

const HomeContainer = styled.div<HomeContainerProps>`
  height: 380px;
  position: relative;
  background-color: ${(props) => (props.showimage === "false" ? "#FF6060" : "transparent")};
  border-radius: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
  overflow: hidden;
  transition: background-color 0.5s ease;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: ${(props) => (props.showimage === "true" ? `url(${props.backgroundimage})` : 'none')};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: right;
    opacity: ${(props) => (props.showimage === "true" ? 1 : 0)};
    transition: opacity 0.5s ease;
    z-index: 0;
  }

  h3, h1, h6, div {
    position: relative;
    z-index: 1;
  }

  h3 {
    color: #F2F2F0;
    width: 170px;
    margin-bottom: 5px;
    padding-left: 15px;
  }

  h1, h6 {
    color: #F2F2F0;
    padding-left: 15px;
  }

  div:nth-of-type(1) {
    display: flex;
    justify-content: center;
    padding-top: 15px;
    padding-bottom: 20px;
  }

  div:nth-of-type(2) {
    background-color: ${(props) => (props.showimage === "false" ? "#F2F2F0" : "rgba(255, 255, 255, 1)")};
    height: ${(props) => (props.showimage === "false" ? "2px" : "90px")};
    width: ${(props) => (props.showimage === "false" ? "auto" : "100%")};
    margin: ${(props) => (props.showimage === "false" ? "15px" : "0px")};
    margin-bottom: ${(props) => (props.showimage === "false" ? "25px" : "0px")};
    margin-top: ${(props) => (props.showimage === "false" ? "25px" : "0px")};
    position: ${(props) => (props.showimage === "false" ? "static" : "absolute")};
    bottom: ${(props) => (props.showimage === "false" ? "auto" : "0")};
    display: flex;
    align-items: center;

    h3 {
      color: #151515;
      font-weight: 400;
    }
  }
`;

export default ClientHomePage;