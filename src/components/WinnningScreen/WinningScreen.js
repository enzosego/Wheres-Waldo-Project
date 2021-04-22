import React from "react"
import styled from 'styled-components';

const StyledSection = styled.section`
  background: green;
  color: white;
  font-size: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
export const WinningScreen = ({currentTime, restartGame}) => {
  return(
    <StyledSection onClick={restartGame}>
      <h1>You won!</h1>
      <h2>Your time is: {currentTime}</h2>
      <h5>Click anywhere to restart the game</h5>
    </StyledSection>
    )
}
