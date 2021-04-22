import React, { useState, useEffect } from 'react';
import { SelectorPopUp } from './components/SelectorPopUp/SelectorPopUp';
import { Timer } from './components/Timer/Timer';
import { WinningScreen } from './components/WinnningScreen/WinningScreen';
import styled from 'styled-components';
import waldoExample from './wheres-waldo-example.jpg';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
//import { useAuthState } from 'react-firebase-hooks/auth';
//import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyAYQDTmQRQYzvHCa2xCDK7t1a6qZQZWBS8",
    authDomain: "wheres-waldo-project.firebaseapp.com",
    projectId: "wheres-waldo-project",
    storageBucket: "wheres-waldo-project.appspot.com",
    messagingSenderId: "320072162622",
    appId: "1:320072162622:web:5f4753a3e040b78c42606f"
})

//const auth = firebase.auth();
//const firestore = firebase.firestore();

const MainContainer = styled.section`
  height: 100vh;
  width: 100vw;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${waldoExample});
  cursor: pointer;
`;

const checkCharacterPositions = (xAxis, yAxis) => {
  if (xAxis > 480 && xAxis < 610 && yAxis > 205 && yAxis < 275)
    return 'Yellow Ship';
  if (xAxis > 258 && xAxis < 305 && yAxis > 465 && yAxis < 545)
    return 'Waldo';
  if (xAxis > 360 && xAxis < 385 && yAxis > 510 && yAxis < 530)
    return 'Red Ball';
} 

export const App = () => {
  const [HasUserClicked, setHasUserClicked] = useState(() => false);
  const [clickPosition, setClickPosition] = useState(() => [0, 0]);
  const [charactersToFind, setCharactersToFind] = useState(() => ['Yellow Ship', 'Waldo', 'Red Ball'])
  const [hasUserWon, setHasUserWon] = useState(() => false);
  const [currentTime, setCurrentTime] = useState(() => 0);
  const [intervalHandle, setIntervalHandle] = useState();

  const increaseTimeByOne = () => 
    setCurrentTime(prevValue => prevValue+1);

  useEffect(() => {
    setIntervalHandle(setInterval(increaseTimeByOne, 1000));
  }, [])

  useEffect(() => {
    if (charactersToFind.length === 0) {
      setHasUserWon(true);
      clearInterval(intervalHandle);
    }
  }, [charactersToFind]);

  const restartGame = () => {
    setCharactersToFind(() => ['Yellow Ship', 'Waldo', 'Red Ball']);
    setCurrentTime(() => 0);
    setIntervalHandle(setInterval(increaseTimeByOne, 1000));
    setHasUserWon(() => false);
  }

  const removeCharacterFromList = (characterFound) => {
    const charactersCopy = 
      [...charactersToFind];
    const indexOfCharacter = 
      charactersCopy.indexOf(characterFound);
    charactersCopy.splice(indexOfCharacter, 1);
    setCharactersToFind(charactersCopy);
  }

  const checkIfCharacterWasFound = (pickedCharacter) => {
    const [xAxis, yAxis] = clickPosition;
    const characterFound = 
      checkCharacterPositions(xAxis, yAxis);
    if (characterFound === pickedCharacter) {
      removeCharacterFromList(characterFound);
      return;
    }
    alert("Try again");
  }

  const handleClick = (e) => {
    setClickPosition([e.clientX, e.clientY])
    setHasUserClicked(prevValue => !prevValue)
  }
  return (
    <MainContainer data-testid="main-container" onClick={handleClick}>
      {HasUserClicked && !hasUserWon
        ? <SelectorPopUp 
          clickPosition={clickPosition} 
          charactersToFind={charactersToFind}
          checkIfCharacterWasFound={checkIfCharacterWasFound}/> 
        : ""}
      {!hasUserWon
        ? <Timer currentTime={currentTime} />
        : ""}
      {hasUserWon
        ? <WinningScreen currentTime={currentTime} restartGame={restartGame}/>
        : ""}
    </MainContainer>
  );
}
