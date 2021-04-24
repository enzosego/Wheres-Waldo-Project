import { render, fireEvent, act } from '@testing-library/react';
import { App } from './App';


test('Application renders correctly', () => {
  const {queryByTestId} = render(<App />);
  const mainContainer = queryByTestId("main-container");
  const WaldoImage = queryByTestId("waldo-image");
  const timer = queryByTestId("timer");
  const waldoTile = queryByTestId("waldo");
  const ballTile = queryByTestId("red-ball");
  const shipTile = queryByTestId("yellow-ship");
  expect(mainContainer).toBeTruthy();
  expect(WaldoImage).toBeTruthy();
  expect(timer).toBeTruthy();
  expect(waldoTile).toBeTruthy();
  expect(ballTile).toBeTruthy();
  expect(shipTile).toBeTruthy();
});

describe('Timer', () => {
  it('Works as intended after 7 seconds', () => {
    jest.useFakeTimers();
    const {getByText} = render(<App />);
    expect(getByText("0")).toBeTruthy();
    act(() => {
      jest.advanceTimersByTime(7000);
    });
    expect(getByText("7")).toBeTruthy();
  });

  it('Gives the correct play time to the winning screen', () => {
    jest.useFakeTimers();
    const {getByTestId, getByText} = render(<App />);

    const waldoTile = getByTestId("waldo");
    fireEvent.click(waldoTile);
    fireEvent.click(getByText("Waldo"));

    const ballTile = getByTestId("red-ball");
    fireEvent.click(ballTile);
    fireEvent.click(getByText("Red Ball"));

    act(() => {
      jest.advanceTimersByTime(12000);
    });

    const shipTile = getByTestId("yellow-ship");
    fireEvent.click(shipTile);
    fireEvent.click(getByText("Yellow Ship"));

    expect(getByText("Your time is: 12")).toBeTruthy();
  })
});

describe('Character selector pop-up', () => {
  it('Pops up after clicking somewhere in the game image', () => {
    const {queryByTestId} = render(<App />);
    const mainContainer = queryByTestId("main-container");
    fireEvent.click(mainContainer);
    const selectorPopUp = queryByTestId("selector-popup");
    expect(selectorPopUp).toBeTruthy();
  });

  it('Goes away after clicking one option - Waldo', () => {
    const {queryByTestId, queryByText} = render(<App />);
    const mainContainer = queryByTestId("main-container");
    fireEvent.click(mainContainer);
    const waldoOption = queryByText("Waldo");
    fireEvent.click(waldoOption);
    const selectorPopUp = queryByTestId("selector-popup");
    expect(selectorPopUp).toBeFalsy();
  })

  it('Goes away after clicking one option - Red Ball', () => {
    const {queryByTestId, queryByText} = render(<App />);
    const mainContainer = queryByTestId("main-container");
    fireEvent.click(mainContainer);
    const ballOption = queryByText("Red Ball");
    fireEvent.click(ballOption);
    const selectorPopUp = queryByTestId("selector-popup");
    expect(selectorPopUp).toBeFalsy();
  })

  it('Goes away after clicking one option - Yellow Ship', () => {
    const {queryByTestId, queryByText} = render(<App />);
    const mainContainer = queryByTestId("main-container");
    fireEvent.click(mainContainer);
    const shipOption = queryByText("Yellow Ship");
    fireEvent.click(shipOption);
    const selectorPopUp = queryByTestId("selector-popup");
    expect(selectorPopUp).toBeFalsy();
  })

  it('Goes away after clicking outside of it', () => {
    const {queryByTestId} = render(<App />);
    const mainContainer = queryByTestId("main-container");
    fireEvent.click(mainContainer);
    fireEvent.click(mainContainer);
    const selectorPopUp = queryByTestId("selector-popup");
    expect(selectorPopUp).toBeFalsy();
  })

  test('Options dissapears after getting it right - Waldo', () => {
    const {queryByTestId, queryByText} = render(<App />);
    const waldoTile = queryByTestId("waldo");
    fireEvent.click(waldoTile);
    let waldoOption = queryByText("Waldo");
    fireEvent.click(waldoOption);
    fireEvent.click(waldoTile);
    waldoOption = queryByText("Waldo");
    const selectorPopUp = queryByTestId("selector-popup");
    expect(waldoOption).toBeFalsy();
    expect(selectorPopUp).toBeTruthy();
  })

  test('Options dissapears after getting it right - Red Ball', () => {
    const {queryByTestId, queryByText} = render(<App />);
    const ballTile = queryByTestId("red-ball");
    fireEvent.click(ballTile);
    let ballOption = queryByText("Red Ball");
    fireEvent.click(ballOption);
    fireEvent.click(ballTile);
    ballOption = queryByText("Red Ball");
    const selectorPopUp = queryByTestId("selector-popup");
    expect(ballOption).toBeFalsy();
    expect(selectorPopUp).toBeTruthy();
  })

  test('Options dissapears after getting it right - Yellow Ship', () => {
    const {queryByTestId, queryByText} = render(<App />);
    const shipTile = queryByTestId("yellow-ship");
    fireEvent.click(shipTile);
    let shipOption = queryByText("Yellow Ship");
    fireEvent.click(shipOption);
    fireEvent.click(shipTile);
    shipOption = queryByText("Yellow Ship");
    const selectorPopUp = queryByTestId("selector-popup");
    expect(shipOption).toBeFalsy();
    expect(selectorPopUp).toBeTruthy();
  })
});

test('After checking every character, a winning screen appears', () => {
  const {queryByTestId, queryByText} = render(<App />);
  const waldoTile = queryByTestId("waldo");
  const ballTile = queryByTestId("red-ball");
  const shipTile = queryByTestId("yellow-ship");

  fireEvent.click(waldoTile);
  const waldoOption = queryByText("Waldo")
  fireEvent.click(waldoOption);

  fireEvent.click(shipTile);
  const shipOption = queryByText("Yellow Ship")
  fireEvent.click(shipOption);

  fireEvent.click(ballTile);
  const ballOption = queryByText("Red Ball")
  fireEvent.click(ballOption);

  const WaldoImage = queryByTestId("waldo-image");
  const mainContainer = queryByTestId("main-container");
  const winningScreen = queryByTestId("winning-screen");

  expect(winningScreen).toBeTruthy();
  expect(mainContainer).toBeFalsy();
  expect(WaldoImage).toBeFalsy();
});
