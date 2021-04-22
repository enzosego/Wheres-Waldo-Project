import React from "react"
import styled from 'styled-components';

const StyledTimer = styled.section`
  height: 30px;
  width: 60px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
  font-size: 1.5rem;
`

export const Timer = ({currentTime}) => {
  return(
    <StyledTimer>
      <h1>{currentTime}</h1>
    </StyledTimer>
    )
}
