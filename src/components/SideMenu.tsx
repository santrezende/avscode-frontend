import { FaCar, FaClock } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface MenuProps {
    isOpen: boolean;
    onClose: () => void;
}

function Menu({ isOpen, onClose }: MenuProps) {

    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate("/home");
    };

    const navigateToCarInfo = () => {
        navigate("/car");
    };

    const navigateToHistory = () => {
        navigate("/history");
    };

    return (
        <MenuContainer isOpen={isOpen}>
            <CloseButton onClick={onClose}>
                <IoMdClose size={30} />
            </CloseButton>
            <MenuItem onClick={navigateToHome}>
                <FaHouse size={30} />
                <h5>Home</h5>
            </MenuItem>
            <LineDiv />
            <MenuItem onClick={navigateToCarInfo}>
                <FaCar size={30} />
                <h5>Informação do veículo</h5>
            </MenuItem>
            <LineDiv />
            <MenuItem onClick={navigateToHistory}>
                <FaClock size={30} />
                <h5>Histórico de atendimentos</h5>
            </MenuItem>
        </MenuContainer>
    );
}

const MenuContainer = styled.div<{ isOpen: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: fit-content;
    background-color: #d9d9d9;
    display: flex;
    flex-direction: column;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 20px;
    z-index: 2;
    transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-100%)')};
    transition: transform 0.3s ease-in-out;
`;

const CloseButton = styled.div`
    align-self: flex-end;
    padding: 10px;
    cursor: pointer;
`;

const LineDiv = styled.div`
    width: 100%;
    height: 1px;
    background-color: #000000;
    margin-top: 20px;
    margin-bottom: 25px;
`;

const MenuItem = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;

    h5 {
        font-weight: 400;
        margin-left: 10px;
    }
`;

export default Menu;
