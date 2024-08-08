import { FaHouse } from "react-icons/fa6";
import { LiaAngleLeftSolid } from "react-icons/lia";
import styled from "styled-components";

interface OperationalHeaderProps {
    handleBackClick: () => void;
    handleHomeClick: () => void;
};

function OperationalHeader({ handleBackClick, handleHomeClick }: OperationalHeaderProps) {

    return(
        <Header>
            <LiaAngleLeftSolid size={30} onClick={handleBackClick} />
            <FaHouse size={30} onClick={handleHomeClick} />
        </Header>
    );
};

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px;
    margin-bottom: 8px;
`;

export default OperationalHeader;