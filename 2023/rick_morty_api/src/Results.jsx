import { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";

const Results = ({ cards }) => {
  const [charactersObj, setCharacters] = useState({});
  const [charactersArray, setCharactersArray] = useState([]);

  useEffect(() => {
    if (cards) {
      cards.map((e) => {
        charactersObj[e.id] = e;
      });
      setCharacters(charactersObj);
      setCharactersArray(Object.values(charactersObj));
    }
  }, [cards]);

  if (!charactersArray.length) return null;

  return (
    <ContentWrapper>
      {charactersArray.map((card, i) => (
        <Card id={card.id} card={card} />
      ))}
    </ContentWrapper>
  );
};

export default Results;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 200px 200px 200px;
  column-gap: 20px;
  row-gap: 20px;
  margin: 0 auto;
  justify-content: center;
  @media only screen and (max-width: 700px) {
    grid-template-columns: 180px 180px;
    column-gap: 25px;
  }
`;
