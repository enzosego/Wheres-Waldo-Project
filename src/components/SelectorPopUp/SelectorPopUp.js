import React, { useEffect } from "react"
import uniqid from 'uniqid';
import styled from 'styled-components';

const PopUp = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, .7);
  padding: 5px;
  border-radius: 5px;
  font-weight: 600;
`;

const StyledUl = styled.ul`
  list-style: none;
`;

const StyledLi = styled.li`
  cursor: pointer;
  :hover {
    color: red;
  }
`;

export const SelectorPopUp = ({clickPosition, charactersToFind,
  checkIfCharacterWasFound, setClickedCharacter}) => {
  useEffect(() => {
    return () => 
      setClickedCharacter('');
  }, []);

  const [xAxis, yAxis] = clickPosition;

  const handleClick = (e) => {
    const pickedCharacter = e.target.textContent;
    checkIfCharacterWasFound(pickedCharacter);
  }
  const popUpStyle = {
    left: xAxis,
    top: yAxis,
  }
  return(
    <PopUp 
      style={popUpStyle}
      data-testid="selector-popup">
      <StyledUl>
        {charactersToFind.map(character => 
        <StyledLi 
          onClick={handleClick}
          key={uniqid()}>
          {character}
        </StyledLi>)}
      </StyledUl>
    </PopUp>
    )
}
