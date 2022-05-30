import styled from 'styled-components'

export const Content = styled.div`
  /* background-color: #F00; */
  /* height: 100%; */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  padding-bottom: 40px;
  /* background-color: #F00; */
  max-width: 1440px;
  margin: 0 auto;
  
  @media only screen and (max-width: 1023px) {
    flex-direction: column-reverse;
    padding-bottom: 40px;
    /* background-color: #FFF; */
    height: auto;
  }
`

export const Container = styled.div`
  /* min-height: 100vh; */
  background-image: url('/images/backgroundNew.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  margin-top: 50px;
`

export const Menu = styled.div`
  height: 150px;
  width: 150px;
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 12px;
  top: 0;
  
  @media only screen and (max-width: 750px) {
    left: 0;
    margin-top: 10px;
    width: 80%;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 16px;
    justify-content: space-around;
    left: 0; 
    right: 0; 
    margin-left: auto; 
    margin-right: auto; 
  }
`

export const Item = styled.a<{ isActive: boolean }>`
  font-size: 22px;
  text-decoration: underline ${({ isActive }) => isActive ? '#da2f31' : '#353535'} 3px;
  cursor: pointer;

  @media only screen and (max-width: 750px) {
    font-size: 18px;
  }
`

export const ImageAbsolute = styled.img`
  height: 150px;
  position: absolute;
  left:0;
  right:0;
  margin-left:auto;
  margin-right:auto;
  top: -60px;

  @media only screen and (max-width: 1330px) {
    height: 120px;
    top: -50px;
  }

  @media only screen and (max-width: 750px) {
    height: 80px;
    top: 120px;
  }
`

export const Area = styled.div`
  height: 620px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(204, 204, 204, 1);
  /* background-color: #FFF; */
  overflow: hidden;
  padding: 12px 60px 40px;
  backdrop-filter: blur(4px);


  @media only screen and (max-width: 1023px) {
    height: fit-content;
    width: 100%;
    max-width: 480px;
    /* background-color: #F00; */
    padding: 18px;
    border: none;
  }
`

export const AmountArea = styled.div`
  height: 620px;
  width: 280px;
  /* background-color: #FFF; */
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgba(204, 204, 204, 1);
  padding: 48px 0;
  gap: 12px;
  backdrop-filter: blur(4px);

  @media only screen and (max-width: 1023px) {
    height: fit-content;
    width: 90%;
    max-width: 480px;
  }
`

export const Title = styled.h1`
  color: #FFF;
  font-weight: 500;
  font-size: 30px;
  line-height: 36px;
  margin-bottom: 36px;
`

export const Input = styled.input`
  height: 40px;
  width: 360px;
`

export const AmountButton = styled.button<{ active: boolean }>`
  width: 90%;
  height: 50px;
  outline: none;
  background-color: transparent;
  border: 3px solid ${({ active }) => active ? '#da2f31' : '#9b9b9b'};
  cursor: pointer;
  border-radius: 18px;
  font-weight: 900;
  font-size: 20px;
  line-height: 24px;
  color: #FFF;
`

export const BetButton = styled.button`
  width: 90%;
  height: 50px;
  outline: none;
  background-color: rgba(151, 151, 151, 1);
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  color: #FFF;
  position: relative;
`

export const Image = styled.img`
  height: 40px;
  width: 40px;
  /* position: absolute;
  right: 6px;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto; */
`

export const RouletteCenter = styled.img`
  position: absolute;
  height: 180px;
  width: 180px;
  z-index: 9999;
  border-radius: 50%;
  transform: rotate(45deg);


  @media only screen and (max-width: 1023px) {
    height: 160px;
    width: 160px;
  }
`

export const GameArea = styled.div`
  min-height: 280px;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 20px auto;
  transform: rotate(-45deg);
  /* background-color: #F00; */


  img[alt~="roulette-static"] {
    position: absolute;
    z-index: 5;
    width: 10%;
    right: 35px;
    top: 35px;
    content: url("https://i.imgur.com/nq4Dylx.png");
    transform: rotate(45deg);
    height: 26px;
    width: auto;

    @media only screen and (max-width: 1023px) {
      top: 28px;
      right: 26px;
      min-height: 0;
    }
  }


  .bhdLno {
    height: 300px;
    width: 300px;
    border-radius: 50%;

    @media only screen and (max-width: 1023px) {
      height: 260px;
      width: 260px;
    }

    >div {
      background-color: transparent;
      border-radius: 50%;
      border: 1px solid #979797;
    }
  }

  @media only screen and (max-width: 1023px) {
    min-height: 0;
    /* transform: rotate(45deg); */

  }
`

export const Center = styled.span`
  align-self: center;
  justify-self: center;
  font-size: 58px;
  font-weight: bold;
`

export const Games = styled.div`
  height: 100%;
  width: 100%;
  /* background-color: #F00; */
  display: flex;
  justify-content: space-around;
  align-items: center;
`

export const Game = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #F00;
  width: 100%;
  
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
