import MobileTable from '../../MobileTable'
import { CurrencyContext } from '../../../contexts/CurrencyProvider'
import { BetsContext } from '../../../contexts/RouletteProvider'
import { useContext, useState } from 'react'
import {
  All,
  BetButton,
  Bets,
  BetsArea,
  Cell,
  NumberArea,
  TableArea,
  ZeroArea
} from './styles.table'

export default function Table () {
  const data = [
    { option: 1, backgroundColor: '#C90022' },
    { option: 2, backgroundColor: '#25222B' },
    { option: 3, backgroundColor: '#C90022' },
    { option: 4, backgroundColor: '#25222B' },
    { option: 5, backgroundColor: '#C90022' },
    { option: 6, backgroundColor: '#25222B' },
    { option: 7, backgroundColor: '#C90022' },
    { option: 8, backgroundColor: '#25222B' },
    { option: 9, backgroundColor: '#C90022' },
    { option: 10, backgroundColor: '#25222B' },
    { option: 11, backgroundColor: '#25222B' },
    { option: 12, backgroundColor: '#C90022' },
    { option: 13, backgroundColor: '#25222B' },
    { option: 14, backgroundColor: '#C90022' },
    { option: 15, backgroundColor: '#25222B' },
    { option: 16, backgroundColor: '#C90022' },
    { option: 17, backgroundColor: '#25222B' },
    { option: 18, backgroundColor: '#C90022' },
    { option: 19, backgroundColor: '#C90022' },
    { option: 20, backgroundColor: '#25222B' },
    { option: 21, backgroundColor: '#C90022' },
    { option: 22, backgroundColor: '#25222B' },
    { option: 23, backgroundColor: '#C90022' },
    { option: 24, backgroundColor: '#25222B' },
    { option: 25, backgroundColor: '#C90022' },
    { option: 26, backgroundColor: '#25222B' },
    { option: 27, backgroundColor: '#C90022' },
    { option: 28, backgroundColor: '#25222B' },
    { option: 29, backgroundColor: '#25222B' },
    { option: 30, backgroundColor: '#C90022' },
    { option: 31, backgroundColor: '#25222B' },
    { option: 32, backgroundColor: '#C90022' },
    { option: 33, backgroundColor: '#25222B' },
    { option: 34, backgroundColor: '#C90022' },
    { option: 35, backgroundColor: '#25222B' },
    { option: 36, backgroundColor: '#C90022' }
  ]
  const posibilities = {
    odds: [
      1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35
    ],
    even: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36],
    firstLine: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
    secondLine: [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
    thirdLine: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
    red: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 39],
    black: [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35],
    oneTo18: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    from19: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
    oneTo12: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    thirteenTo24: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    from25ToMax: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
    none: []
  }
  const [active, setActive] = useState<any[]>([])
  const { updateBets, currentValue } = useContext(BetsContext)
  const { currentCurrency, currentTokenMint } = useContext(CurrencyContext)

  function handleSetActive (pos = 'none') {
    if (!Object.keys(posibilities).includes(pos)) return
    // @ts-ignore
    setActive(posibilities[pos])
  }

  function handleClick (type: string, option: string | number) {
    console.log({ option })
    updateBets({
      type,
      option,
      value: currentValue,
      currency: currentCurrency,
      id: Math.random(),
      tokenMint: currentTokenMint
    })
  }

  return (
    <>
      <All>
        <TableArea>
          <ZeroArea>
            <Cell height={138} width={42} color='#17BF68' onClick={() => handleClick('STRAIGHT', 0)}>
              0
            </Cell>
          </ZeroArea>

          <NumberArea>
            {
              data.map(({ option, backgroundColor }) => (
                <Cell
                  key={option}
                  height={42}
                  width={42}
                  color={backgroundColor}
                  active={
                    active.includes(Number(option))
                  }
                  onClick={() => handleClick('STRAIGHT', option)}
                >
                  {option}
                </Cell>
              ))
            }
          </NumberArea>
          <ZeroArea>
            <Cell
              height={42}
              width={42}
              color='transparent'
              border='rgba(151, 151, 151, 1)'
              onMouseOver={() => handleSetActive('firstLine')}
              onMouseOut={() => handleSetActive('none')}
              onClick={() => handleClick('LINE1', 'First Line')}
              textColor='rgba(151, 151, 151, 1)'
            >
              2:1
            </Cell>

            <Cell
              height={42}
              width={42}
              color='transparent'
              border='rgba(151, 151, 151, 1)'
              onMouseOver={() => handleSetActive('secondLine')}
              onMouseOut={() => handleSetActive('none')}
              onClick={() => handleClick('LINE2', 'Second Line')}
              textColor='rgba(151, 151, 151, 1)'
            >
              2:1
            </Cell>

            <Cell
              height={42}
              width={42}
              color='transparent'
              border='rgba(151, 151, 151, 1)'
              onMouseOver={() => handleSetActive('thirdLine')}
              onMouseOut={() => handleSetActive('none')}
              onClick={() => handleClick('LINE3', 'Third Line')}
              textColor='rgba(151, 151, 151, 1)'
            >
              2:1
            </Cell>
          </ZeroArea>
        </TableArea>
        <BetsArea>
          <Bets>
            <BetButton
              width={100}
              onMouseOver={() => handleSetActive('oneTo12')}
              onMouseOut={() => handleSetActive('none')}
              onClick={() => handleClick('RANGE1', '1 to 12')}
            >
              1 to 12
            </BetButton>

            <BetButton
              width={48}
              onMouseOver={() => handleSetActive('oneTo18')}
              onMouseOut={() => handleSetActive('none')}
              onClick={() => handleClick('SMALL', '1 to 18')}
            >
              1 to 18
            </BetButton>
            <BetButton
              width={48}
              onMouseOver={() => handleSetActive('even')}
              onMouseOut={() => handleSetActive('none')}
              onClick={() => handleClick('EVEN', 'Even')}
            >
              EVEN
            </BetButton>
          </Bets>

          <Bets>
            <BetButton
              width={100}
              onMouseOver={() => handleSetActive('thirteenTo24')}
              onMouseOut={() => handleSetActive('none')}
              onClick={() => handleClick('RANGE2', '13 to 24')}
            >
              13 to 24
            </BetButton>

            <BetButton
              width={48}
              onMouseOver={() => handleSetActive('red')}
              onMouseOut={() => handleSetActive('none')}
              onClick={() => handleClick('RED', 'Red')}
              color='#C90022'
            >
            </BetButton>
            <BetButton
              width={48}
              onMouseOver={() => handleSetActive('black')}
              onMouseOut={() => handleSetActive('none')}
              onClick={() => handleClick('BLACK', 'Black')}
              color='#24222B'
            >
            </BetButton>
          </Bets>

          <Bets>
            <BetButton
              width={100}
              onMouseOver={() => handleSetActive('from25ToMax')}
              onMouseOut={() => handleSetActive('none')}
              onClick={() => handleClick('RANGE3', '25 to 36')}
            >
              25 to 36
            </BetButton>

            <BetButton
              width={48}
              onMouseOver={() => handleSetActive('odds')}
              onMouseOut={() => handleSetActive('none')}
              onClick={() => handleClick('ODD', 'Odd')}
            >
              ODD
            </BetButton>
            <BetButton
              width={48}
              onMouseOver={() => handleSetActive('from19')}
              onMouseOut={() => handleSetActive('none')}
              onClick={() => handleClick('HIGH', '19 to 36')}
            >
              19 to 36
            </BetButton>
          </Bets>
        </BetsArea>
      </All>
      <MobileTable handleClick={handleClick} active={active} handleSetActive={handleSetActive} />
    </>
  )
}
