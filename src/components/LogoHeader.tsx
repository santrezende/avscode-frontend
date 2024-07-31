import styled from "styled-components";
import AVSLogo from "../assets/AVS_LOGO_HORIZONTAL.png";

function LogoHeader(){
    return(
        <HeaderContainer>
            <img src={AVSLogo} />
        </HeaderContainer>
    );
};

const HeaderContainer = styled.div`
height: 65px;
width: 100%;
display: flex;
justify-content: center;
img{
    max-width: 100%;
    max-height: 100%;
    display: block;
};
`;

export default LogoHeader;