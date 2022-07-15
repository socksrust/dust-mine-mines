import styled from 'styled-components'

export const Area = styled.div`
  min-height: 660px;
  width: 90%;
  max-width: 650px;
  /* background-color: #F00; */
  margin-top: 40px;
  display: flex;
  border-radius: 36px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const GameArea = styled.div`
  display: flex;
  width: 100%;
  background-color: #121e2f;
  min-height: 440px;
  border: 1px solid rgba(13, 22, 36, 1);
  border-radius: 36px;
  @media only screen and (max-width: 1023px) {
    flex-direction: column-reverse;
    padding: 40px 0;
    margin-bottom: 20px;
  }
`

export const BetsArea = styled.div`
  /* height: 100%; */
  width: 35%;
  border-radius: 36px 0 0 36px;
  background-color: transparent;
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
  background-color: #121e2f;
  display: flex;
  border-radius: 36px;
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

export const BetButton = styled.button<{ isBottom: boolean }>`
  height: 54px;
  width: 100%;
  background-color: #01fd21;
  font-size: 18px;
  font-weight: bold;
  border-radius: 6px;
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
  background-color: #FF0074;
  border-radius: 6px;
  transition: .2s;
  filter: opacity(.8);
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
