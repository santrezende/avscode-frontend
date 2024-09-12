import styled from 'styled-components';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingWhatsApp = () => {
  const handleWhatsAppClick = () => {
    const message = 'Olá! Estou entrando em contato pelo AVS Code!';
    const phoneNumber = '5531971921519';
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`);
  };

  return (
    <WhatsAppButton onClick={handleWhatsAppClick}>
      <FaWhatsapp size={40} />
    </WhatsAppButton>
  );
};

const WhatsAppButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #25d366;
  color: white;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 1000;
  
  &:hover {
    opacity: 0.8;
  }
`;

export default FloatingWhatsApp;