import { render, fireEvent } from '@testing-library/react';
import { App, checkCharacterPositions } from './App';


it('renders correctly', () => {
  const {queryByTestId} = render(<App />);
  const mainContainer = queryByTestId("main-container");
  const waldoTile = queryByTestId("waldo");
  const ballTile = queryByTestId("red-ball");
  const shipTile = queryByTestId("yellow-ship");
  const WaldoImage = queryByTestId("waldo-image");
  expect(mainContainer).toBeTruthy();
  expect(WaldoImage).toBeTruthy();
  expect(waldoTile).toBeTruthy();
  expect(ballTile).toBeTruthy();
  expect(shipTile).toBeTruthy();
});

xtest('Timer works correctly', () => {
  const {} = render(<App />);
  setTimeout(5000)
    .then(expect().toBeCalledTimes(5));
});

xdescribe('Character positions get checked properly', () => {
  test('Waldo', () => {
    const characterFound = 
      checkCharacterPositions(270, 500);
    expect(characterFound).toBe('Waldo');
  });
  test('Red Ball', () => {
    const characterFound = 
      checkCharacterPositions(370, 520);
    expect(characterFound).toBe('Red Ball');
  });
  test('Yellow Ship', () => {
    const characterFound = 
      checkCharacterPositions(530, 235);
    expect(characterFound).toBe('Yellow Ship');
  });
  test('When nothing is found, an empty string gets returned', () => {
    const characterFound = 
      checkCharacterPositions(750, 600);
    expect(characterFound).toBe('');

  });
});
