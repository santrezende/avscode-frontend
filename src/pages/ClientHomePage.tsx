import { FaCircle, FaRegCircle } from "react-icons/fa";
import styled from "styled-components";
import { useSwipeable } from "react-swipeable";
import { useEffect, useState } from "react";
import HomeCard from "../components/HomeCard";
import BoschHands from "../assets/bcs_hands.jpg";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import LogoHeader from "../components/LogoHeader";
import { useClientContext } from "../context/ClientContext";
import api from "../api/api";

function ClientHomePage() {
  const [showImage, setShowImage] = useState("false");

  const handlers = useSwipeable({
    onSwipedLeft: () => setShowImage("true"),
    onSwipedRight: () => setShowImage("false"),
    trackMouse: true,
  });

  const navigate = useNavigate();

  const { lastOilChange, carInfo, setCarInfo } = useClientContext();

  const [date, setDate] = useState<string | Date >(lastOilChange);

  const getDataByLocalStorage = async () => {
    const licensePlate = localStorage.getItem("licensePlate");
    const cpf = localStorage.getItem("cpf");
    try {
      const response = await api.post(`/vehicles/${licensePlate}`, {
        licensePlate,
        cpf,
      });
      setCarInfo(response.data);
      return;
    } catch (error: any) {
        return <p>Sem informações do veículo disponíveis, tente novamente.</p>
    }
  };

  useEffect(() => {
    getDataByLocalStorage();
    const dateString = localStorage.getItem("lastOilChange");
    if (dateString) {
      setDate(new Date(dateString));
    }
  }, []);

  const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
    month: "short",
    year: "numeric",
  });

  const nextOilChangeDate = new Date(date);
  nextOilChangeDate.setMonth(nextOilChangeDate.getMonth() + 6);

  const nextOilChangeFormattedDate = nextOilChangeDate.toLocaleDateString(
    "pt-BR",
    {
      month: "short",
      year: "numeric",
    },
  );

  const today = new Date();
  const monthsDifference =
    (nextOilChangeDate.getFullYear() - today.getFullYear()) * 12 +
    nextOilChangeDate.getMonth() -
    today.getMonth();

  const customerName = carInfo?.customerName || localStorage.getItem("name");

  return (
    <>
      <LogoHeader />
      <h5>Olá, {customerName}!</h5>
      <HomeContainer
        {...handlers}
        showimage={showImage}
        backgroundimage={BoschHands}
      >
        {showImage === "false" ? (
          <>
            <div>
              <FaCircle
                size={10}
                style={{
                  color: "#F2F2F0",
                  paddingLeft: "2px",
                  paddingRight: "2px",
                }}
              />
              <FaRegCircle
                onClick={() => setShowImage("true")}
                size={10}
                style={{
                  color: "#F2F2F0",
                  paddingLeft: "2px",
                  paddingRight: "2px",
                }}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <FaRegCircle
                onClick={() => setShowImage("false")}
                size={10}
                style={{
                  color: "#F2F2F0",
                  paddingLeft: "2px",
                  paddingRight: "2px",
                }}
              />
              <FaCircle
                size={10}
                style={{
                  color: "#F2F2F0",
                  paddingLeft: "2px",
                  paddingRight: "2px",
                }}
              />
            </div>
          </>
        )}
        {showImage === "false" ? (
          <>
            <h3>Última troca de óleo:</h3>
            <h1>{formattedDate}</h1>
            <div />
            {monthsDifference > 0 ? (
              <>
                <h3>Próxima troca em</h3>
                <h1>{monthsDifference} meses</h1>
                <h6>{nextOilChangeFormattedDate}</h6>
              </>
            ) : (
              <>
                <h4>
                  Nova troca de óleo recomendada! Agende uma visita pelo
                  WhatsApp.
                </h4>
              </>
            )}
          </>
        ) : (
          <>
            <div
              onClick={() =>
                (window.location.href = "https://am.boschcarservice.com/br/pt/")
              }
            >
              <h3>Conheça a Bosch clicando aqui!</h3>
            </div>
          </>
        )}
      </HomeContainer>
      <HomeCard text={"Informações do veículo"} onClick={() => navigate("/car")} />
      <HomeCard
        text={"Histórico de atendimentos"}
        onClick={() => navigate("/history")}
      />
      <Footer />
    </>
  );
}

interface HomeContainerProps {
  showimage: string;
  backgroundimage: string;
}

const HomeContainer = styled.div<HomeContainerProps>`
  height: 380px;
  position: relative;
  background-color: ${(props) =>
    props.showimage === "false" ? "#FF6060" : "transparent"};
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
    background-image: ${(props) =>
      props.showimage === "true" ? `url(${props.backgroundimage})` : "none"};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: right;
    opacity: ${(props) => (props.showimage === "true" ? 1 : 0)};
    transition: opacity 0.5s ease;
    z-index: 0;
  }

  h3,
  h1,
  h6,
  div {
    position: relative;
    z-index: 1;
  }

  h3 {
    color: #f2f2f0;
    width: 170px;
    margin-bottom: 5px;
    padding-left: 15px;
  }

  h1,
  h6,
  h4 {
    color: #f2f2f0;
    padding-left: 15px;
  }

  h4 {
    font-size: 32px;
  }

  div:nth-of-type(1) {
    display: flex;
    justify-content: center;
    padding-top: 15px;
    padding-bottom: 20px;
  }

  div:nth-of-type(2) {
    background-color: ${(props) =>
      props.showimage === "false" ? "#F2F2F0" : "rgba(255, 255, 255, 1)"};
    height: ${(props) => (props.showimage === "false" ? "2px" : "90px")};
    width: ${(props) => (props.showimage === "false" ? "auto" : "100%")};
    margin: ${(props) => (props.showimage === "false" ? "15px" : "0px")};
    margin-bottom: ${(props) => (props.showimage === "false" ? "25px" : "0px")};
    margin-top: ${(props) => (props.showimage === "false" ? "25px" : "0px")};
    position: ${(props) =>
      props.showimage === "false" ? "static" : "absolute"};
    bottom: ${(props) => (props.showimage === "false" ? "auto" : "0")};
    display: flex;
    align-items: center;

    h3 {
      color: #151515;
      font-weight: 400;
      width: auto;
    }
  }
`;

export default ClientHomePage;
