import styled from 'styled-components'

export const Content = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
  gap: 12px;
`

export const GamesWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const Area = styled.div`
  min-height: 600px;
  width: 90%;
  max-width: 1000px;
  display: flex;
  overflow: auto;
  flex-direction: column;
  /* border: 1px solid #F00; */
`

export const Input = styled.input`
  height: 40px;
  width: 360px;
`

export const GameArea = styled.div`
  min-height: 280px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;

`

export const Center = styled.span`
  align-self: center;
  justify-self: center;
  font-size: 58px;
  font-weight: bold;
`

export const PlayerArea = styled.div`
  height: 100%;
  /* background-color: #dadada; */
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 300px;
  /* border: 1px solid #F00; */
`

export const HouseArea = styled.div`
  height: 100%;
  /* background-color: #dadada; */
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 260px;
  /* border: 1px solid #F00; */
`

export const Title = styled.span`
  font-size: 24px;
  font-weight: bold;
`

export const Games = styled.div`
  height: 100%;
  width: 100%;
  /* background-color: #F00; */
  background-color: #aec8ae;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

export const Game = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  >div {
    display: flex;
    align-items: center;
  }

  >div >span {
    font-size: 18px;
    font-weight: bold;
  }
`

export const Cards = styled.div`
  display: flex;
`

export const Button = styled.button<{ clickable: boolean }>`
  height: 32px;
  width: 45%;
  max-width: 100px;
  outline: none;
  border: 1px solid blue;
  background-color: transparent;
  border-radius: 6px;
  color: #FFF;
  font-weight: bold;
  font-size: 12px;
  cursor: ${({ clickable }) => !clickable ? 'pointer' : 'not-allowed'};
  transition: .2s;


  :hover {
    background-color: ${({ clickable }) => !clickable ? 'blue' : '#dadada'};
  }

`

export const ButtonsArea = styled.div`
  width: 100%;
  max-width: 200px;
  min-width: 210px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  align-self: center;

`

export const SelectArea = styled.div`
  height: 30px;
  display: flex;
  gap: 1px;
  background-color: #000;
  border-radius: 8px;
`

export const OneSide = styled.div`
  height: 30px;
  width: 40px;
  background-color: #dadada;
  border-radius: 6px 0 0 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .2s;


  :hover {
    background-color: #ada00e;
  }
`

export const ElevenSide = styled.div`
  height: 30px;
  width: 40px;
  background-color: #dadada;
  border-radius: 0 6px 6px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;


  transition: .2s;
  :hover {
    background-color: #ada00e;
  }
`
