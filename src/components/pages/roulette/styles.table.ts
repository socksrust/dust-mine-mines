import styled from 'styled-components'

export const TableArea = styled.div`
  min-height: 50px;
  width: 700px;
  margin: 0 auto;
  display: flex;
  gap: 6px;
  /* border: 1px solid #dadada; */
  @media only screen and (max-width: 1023px) {
    gap: 2px;
    background-color: #F00;
  }
`

export const Cell = styled.div<{ height: number, width: number, color: string, border?: string, active?: boolean, textColor?: string }>`
  height: ${({ height }) => `${height}px`};
  width: ${({ width }) => `${width}px`};
  background-color: ${({ active, color }) => active ? color === '#C90022' ? '#fc7086' : '#5f5b69' : color === '#C90022' ? '#C90022' : color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  border: ${({ border }) => border && `1px solid ${border}`};
  cursor: pointer;
  transition: .2s;
  color: ${({ textColor }) => textColor ? 'rgba(151, 151, 151, 1)' : '#FFF'};

  :hover {
    background-color: ${({ color }) => color === '#C90022' ? '#fc7086' : '#5f5b69'};
  }
`

export const ZeroArea = styled.div`
  height: 100%;
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const NumberArea = styled.div`
  height: 138px;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  flex-wrap: wrap;
  gap: 6px;
`

export const All = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 9999;
  gap: 6px;

  @media only screen and (max-width: 1023px) {
    display: none;
    /* transform: rotate(90deg); */
  }
`

export const BetsArea = styled.div`
  min-height: 50px;
  width: 700px;
  /* background-color: #Fdda00; */
  margin: 0 auto;
  padding-left: 48px;
  display: flex;
  gap: 9px;

  @media only screen and (max-width: 1023px) {
    padding-left: 36px;
  }
`

export const Bets = styled.div`
  min-height: 50px;
  width: 194px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  
  @media only screen and (max-width: 1023px) {
    width: 25.3%;
  }
`

export const BetButton = styled.button<{ width: number, color?: string }>`
  outline: none;
  width: ${({ width }) => `${width}%`};
  height: 50px;
  background-color: ${({ color }) => color || 'transparent'};
  border: ${({ color }) => color ? 'none' : '1px solid rgba(151, 151, 151, 1)'};
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  color: #979797;

  :hover {
    background-color: ${({ color }) => color ? '' : '#5f5b69'};
  }


  @media only screen and (max-width: 1023px) {
    width: 48%;
    height: 36px;
    font-size: 12px;

    :nth-child(1) {
      width: 100%;
    }
  }

`
