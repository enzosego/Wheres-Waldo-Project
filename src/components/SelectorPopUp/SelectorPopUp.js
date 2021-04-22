import React from "react"
import styled from 'styled-components';

const StyledUl = styled.ul`
  list-style: none;
  background: rgba(255, 255, 255, .7);
  padding: 5px;
  border-radius: 5px;
  font-weight: 600;
`

const StyledLi = styled.li`
  cursor: pointer;
  :hover {
    color: red;
  }
`

export const SelectorPopUp = ({clickPosition, charactersToFind, checkIfCharacterWasFound}) => {
  const [xAxis, yAxis] = clickPosition;
  const PopUp = styled.div`
    position: absolute;
    left: ${xAxis}px;
    top: ${yAxis}px;
  `

  const handleClick = (e) => {
    const pickedCharacter = e.target.textContent;
    checkIfCharacterWasFound(pickedCharacter);
  }
  return(
    <section>
      <PopUp>
        <StyledUl>
          {charactersToFind.map(character => 
          <StyledLi onClick={handleClick}>{character}</StyledLi>)}
        </StyledUl>
      </PopUp>
    </section>
    )
}
