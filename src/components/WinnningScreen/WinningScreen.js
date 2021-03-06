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
  width: 100vw;
  height: 100vh;
`;
export const WinningScreen = ({currentTime, restartGame}) => {
  return(
    <StyledSection 
      data-testid="winning-screen" 
      onClick={restartGame}>
      <h1>You won!</h1>
      <h2>Your time is: {currentTime}</h2>
      <h5>Click anywhere to restart the game</h5>
    </StyledSection>
    )
}
