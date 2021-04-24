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
});

//const auth = firebase.auth();
//const firestore = firebase.firestore();

const MainContainer = styled.section`
  width: 100vw;
  position: relative;
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-image: url(${waldoExample});
  cursor: pointer;
`;

const WaldoImage = styled.img`
  width: 100vw;
  visibility: hidden;
`;

const CharacterTile = styled.div`
  background: red;
  opacity: 0;
  position: absolute;
`;

export const App = () => {
  const [HasUserClicked, setHasUserClicked] = useState(() => false);
  const [clickPosition, setClickPosition] = useState(() => [0, 0]);
  const [clickedCharacter, setClickedCharacter] = useState(() => '');
  const [charactersToFind, setCharactersToFind] = useState(() => ['Yellow Ship', 'Waldo', 'Red Ball'])
  const [hasUserWon, setHasUserWon] = useState(() => false);
  const [currentTime, setCurrentTime] = useState(() => 0);
  const [intervalHandle, setIntervalHandle] = useState();

  const increaseTimeByOne = () => 
    setCurrentTime(prevValue => prevValue+1);

  useEffect(() => {
    setIntervalHandle(setInterval(increaseTimeByOne, 1000));
  }, []);

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

  const checkIfCharacterWasFound = (pickedCharacter) => 
    clickedCharacter === pickedCharacter 
      ? removeCharacterFromList(pickedCharacter)
      : '';

  const handleClick = (e) => {
    if (hasUserWon) return;
    setClickPosition([e.clientX, e.clientY]);
    setHasUserClicked(!HasUserClicked);
  }
  if (!hasUserWon)
    return (
      <MainContainer 
        data-testid="main-container" 
        onClick={handleClick}>
        <WaldoImage 
          data-testid="waldo-image"
          src={`${waldoExample}`}/>
        <CharacterTile 
          style={{top:"48%", left:"20%", height:"10%", width:"4.2%"}} 
          data-testid="waldo"
          onClick={() => setClickedCharacter('Waldo')}/>
        <CharacterTile 
          style={{top:"52.4%", left:"28.3%", height:"2.5%", width:"2%"}} 
          data-testid="red-ball"
          onClick={() => setClickedCharacter('Red Ball')}/>
        <CharacterTile 
          style={{top:"22%", left:"37.5%", height:"7%", width:"11%"}}
          data-testid="yellow-ship"
          onClick={() => setClickedCharacter('Yellow Ship')}/>
        {HasUserClicked
          ? <SelectorPopUp 
            clickPosition={clickPosition} 
            charactersToFind={charactersToFind}
            checkIfCharacterWasFound={checkIfCharacterWasFound}
            setClickedCharacter={setClickedCharacter}/> 
          : ""}
        <Timer currentTime={currentTime} />
      </MainContainer>
    )
  else 
    return (
      <WinningScreen currentTime={currentTime} restartGame={restartGame}/>
    )
}
