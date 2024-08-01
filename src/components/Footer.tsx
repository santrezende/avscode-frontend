import styled from "styled-components";
import BoschLogo from "../assets/bosch-service-logo";

function Footer() {
    return(
        <FooterContainer>
            <BoschLogo />
        </FooterContainer>
    );
};

const FooterContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

export default Footer;