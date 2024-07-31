import { LiaAngleRightSolid } from "react-icons/lia";
import styled from "styled-components";

interface HomeCardProps {
    text: string;
    onClick: () => void;
}

function HomeCard({ text, onClick }: HomeCardProps) {
    return(
        <CardContainer onClick={onClick}>
                    <div/>
                    <div>
                        <h3>{text}</h3>
                        <LiaAngleRightSolid style={{
                            marginBottom: "10px",
                            marginRight: "10px",
                        }} size={30} />
                    </div>
        </CardContainer>
    );
};

const CardContainer = styled.div`
display: flex;
height: 110px;
border-radius: 10px;
background-color: #FFFFFF;
margin-bottom: 15px;
cursor: pointer;

div:nth-of-type(1) {
width: 10px;
background-color: #FF6060;
border-bottom-left-radius: 10px;
border-top-left-radius: 10px;
}

div:nth-of-type(2) {
    display: flex;
    align-items: end;
    h3 {
        font-weight: 300;
        margin-left: 10px;
        margin-bottom: 10px;
    }
}
`;

export default HomeCard;