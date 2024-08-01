import { LiaAngleLeftSolid } from "react-icons/lia";
import { VscThreeBars } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function HeaderButtons() {

    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate("/home");
    };

    return (
        <Header>
            <LiaAngleLeftSolid size={30} onClick={navigateToHome} className="pointer"/>
            <VscThreeBars size={30} />
        </Header>
    );
};

const Header = styled.div`
display: flex;
justify-content: space-between;
padding: 8px;
`;

export default HeaderButtons;