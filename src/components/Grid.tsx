import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectIsRunning } from '../store/slices/gameSlice'
import Cell from './Cell'

const Grid = ({ grid }: { grid: boolean[][] }) => {
  const gameIsRunning = useSelector(selectIsRunning)

  return (
    <Wrapper id="grid" width={grid[0].length} height={grid.length} isRunning={gameIsRunning} role="grid">
      {
        grid.map((line, lineIndex) =>
          <Line key={`line-${lineIndex}`} role="row">
            {
              line.map((isAlive, colIndex) =>
                <Cell
                  id={`cell-${colIndex}-${lineIndex}`}
                  key={`cell-${colIndex}-${lineIndex}`}
                  gridWidth={grid[0].length}
                  gridHeight={grid.length}
                  isAlive={isAlive}
                  role="gridcell"
                />
              )
            }
          </Line>
        )
      }
    </Wrapper>
  )
}

type WrapperProps = {
  isRunning: boolean
  width: number
  height: number
}

const Wrapper = styled.div<WrapperProps>`
  margin: auto;
  margin: 0.5em;
  border: solid 1px black;
  &:hover {
    cursor: ${({ isRunning }) => isRunning ? 'inherit' : 'pointer'};
  }
`

const Line = styled.div`
  display: flex
`

export default Grid
