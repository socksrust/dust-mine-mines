import styled from 'styled-components'

export const Area = styled.div`
  height: 660px;
  width: 90%;
  max-width: 900px;
  background-color: #F00;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const GameArea = styled.div`
  display: flex;
  width: 100%;
  background-color: #F0F;
  height: 80%;
`

export const BetsArea = styled.div`
  height: 100%;
  width: 30%;
  background-color: #dadada;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 18px;
`

export const Game = styled.div`
  height: 100%;
  width: 70%;
  background-color: #cdcdcd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
`

export const Input = styled.input`
  height: 40px;
  width: 100%;
  color: #000;
  padding: 6px;
  outline: none;
  filter: opacity(.8);

  :focus {
    filter: opacity(1);
  }
`

export const Label = styled.div`
  display: flex;
  flex-direction: column;
`

export const Select = styled.select`
  height: 40px;
  width: 100%;
  color: #000;
  padding: 6px;
  outline: none;
  filter: opacity(.8);
  background-color: #FFF;

  :focus {
    filter: opacity(1);
  }
`

export const BetButton = styled.button`
  height: 54px;
  width: 100%;
  background-color: #01fd21;
  font-size: 20px;
  font-weight: bold;
  border-radius: 6px;
  transition: .2s;

  :hover {
    transform: translate(0, -4px);
  }
`

export const Line = styled.div`
  height: 64px;
  width: 100%;
  background-color: #abcabc;
  display: flex;
  justify-content: center;
  gap: 6px;
`

export const Mine = styled.button`
  height: 64px;
  width: 64px;
  background-color: #F00;
  border-radius: 6px;
  transition: .2s;
  filter: opacity(.8);

  :hover {
    transform: translate(0, -4px);
    filter: opacity(1);
  }

`