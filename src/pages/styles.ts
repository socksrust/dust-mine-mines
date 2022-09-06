import styled from 'styled-components'

export const Area = styled.div`
  min-height: 660px;
  width: 90%;
  max-width: 650px;
  /* background-color: #F00; */
  margin-top: 40px;
  display: flex;
  border-radius: 4px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const GameArea = styled.div`
  display: flex;
  width: 100%;
  min-height: 440px;
  background: #1C242C;

  border-radius: 4px;
  @media only screen and (max-width: 1023px) {
    flex-direction: column-reverse;
    padding: 40px 0;
    margin-bottom: 20px;
  }
`

export const BetsArea = styled.div`
  /* height: 100%; */
  width: 35%;
  border-radius: 4px;
  background-color: #1C242C;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  padding: 20px;
  gap: 18px;
  
  padding-top: 40px;

  @media only screen and (max-width: 1023px) {
    height: fit-content;
    width: 100%;
    border-right: none;
  }
`

export const Game = styled.div`
  /* height: 100%; */
  width: 70%;
  background-color: transparent;
  display: flex;
  border-radius: 4px;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  @media only screen and (max-width: 1023px) {
    height: fit-content;
    width: 100%;
  }
`

export const Input = styled.input`
  height: 40px;
  width: 100%;
  color: #000;
  padding: 6px;
  outline: none;
  background: #111922;
  color: #fff;
  border-radius: 4px;
  border: 2px solid #1E1E1E;

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
  background: #111922;
  border: 2px solid #1E1E1E;

  border-radius: 4px;
  :focus {
    filter: opacity(1);
  }
`

export const BetButton = styled.button<{ isBottom: boolean }>`
  height: 54px;
  width: 100%;

  background-color: #DE4151;
  font-size: 18px;
  font-weight: bold;
  border-radius: 4px;
  transition: .2s;
  margin-top: ${({ isBottom }) => isBottom && 'auto' };

  :hover {
    transform: translate(0, -4px);
  }
`

export const Line = styled.div`
  height: 64px;
  width: 100%;
  /* background-color: #abcabc; */
  display: flex;
  justify-content: center;
  gap: 6px;
  
  @media only screen and (max-width: 1023px) {
    height: 58px;
  }
`

export const Mine = styled.button`
  height: 64px;
  width: 64px;
  background-color: rgba(255, 255, 255, 1);
  color: #DE4151 !important;
  border-radius: 4px;
  transition: .2s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;

  :hover {
    transform: translate(0, -4px);
    filter: opacity(1);
  }

  @media only screen and (max-width: 1023px) {
    height: 58px;
    width: 58px;
  }

`

export const Bomb = styled.img`
  height: 70%;
  width: auto;
`
