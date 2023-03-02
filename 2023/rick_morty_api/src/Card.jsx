import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = (props) => {
  const { card } = props;

  return (
    <SCard status={card.status}>
      <SCardSection>
        <SCardHeaderText>{card.name}</SCardHeaderText>
      </SCardSection>
      <SCardImage image={card.image} />
      <SCardSection>
        <SCardHeaderText>{card.status}</SCardHeaderText>
      </SCardSection>
      <SCardDescriptionSection></SCardDescriptionSection>
    </SCard>
  );
};

export default Card;

const SCard = styled.div`
  background-color: white;
  width: 100%;
  height: 300px;

  padding: 8px;

  border-radius: 8px;
  border: 4px solid #000;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;

  background-image: url(${({ status }) => {
    if (status.toLowerCase() === "unknown") {
      return "https://i.pinimg.com/736x/d7/b4/af/d7b4afb4db39c0818f220c6726e0e1e9.jpg";
      return "https://e1.pxfuel.com/desktop-wallpaper/22/758/desktop-wallpaper-rick-and-morty-middle-finger-thumbnail.jpg";
    }
    if (status.toLowerCase() === "dead") {
      return "https://i.pinimg.com/736x/61/0c/38/610c38fabddea7efcbc8ce35251a0405.jpg";
    }
    return "https://wallpapercave.com/wp/wp6737202.png";
    return "https://i.pinimg.com/236x/dc/af/53/dcaf538ac3049d83a232048939bf3212.jpg";
    return "https://scontent.fbne5-1.fna.fbcdn.net/v/t39.30808-6/276284169_5063898680373580_4210653231031352426_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=9267fe&_nc_ohc=LhQgsVi72iUAX8QNrbp&_nc_ht=scontent.fbne5-1.fna&oh=00_AfBK8CR6sWr6XbnUq4mwfi80fbV6Rl6X8llcaLnRTa5w0A&oe=6405F10C";
  }});
  background-size: cover;

  -webkit-box-shadow: 8px 8px 10px 2px #525252;
  box-shadow: 8px 8px 10px 2px #525252;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
`;

const SCardSection = styled.div`
  width: 100%;
  height: 30px;
  background-color: #ffffffeb;
  padding: 0px 10px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const SCardHeaderText = styled.div`
  display: block;
  text-transform: capitalize;
  text-overflow: ellipsis;

  /* Needed to make it work */
  overflow: hidden;
  white-space: nowrap;
`;

const SCardDescriptionSection = styled(SCardSection)`
  border-radius: 10px;
  height: auto;
  padding: 5px 10px;
`;
const SCardImage = styled.div`
  background-color: #fff;
  width: 100%;
  height: 120px;
  background-image: url(${({ image = false }) => image});

  border-radius: 10px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 25%;

  border-radius: 8px;
  border: 1px solid #000;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
`;
