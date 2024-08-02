import { useState } from 'react';
import { LiaAngleLeftSolid } from "react-icons/lia";
import { VscThreeBars } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Menu from "./SideMenu";

function HeaderButtons() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate("/home");
    };

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <Header>
                <LiaAngleLeftSolid size={30} onClick={navigateToHome} className="pointer" />
                <VscThreeBars size={30} onClick={toggleMenu} className="pointer" />
            </Header>
            {isMenuOpen && <Overlay onClick={toggleMenu} />}
            <Menu isOpen={isMenuOpen} onClose={toggleMenu} />
        </>
    );
}

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
`;

export default HeaderButtons;
