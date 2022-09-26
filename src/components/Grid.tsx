import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import gameSlice, { Coord, Face, selectIsRunning } from '../store/slices/gameSlice'
import Cell from './Cell'

const Grid = ({ grid, face }: { grid: boolean[][], face: Face }) => {
  const dispatch = useDispatch()
  const gameIsRunning = useSelector(selectIsRunning)
  const handleCellClick = (coord: Coord) => {
    if (grid[coord.y][coord.x]) {
      dispatch(gameSlice.actions.killCell({
        face,
        coord
      }))
      return
    }

    dispatch(gameSlice.actions.reviveCell({
      face,
      coord
    }))
  }

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
                  onClick={() => handleCellClick({ x: colIndex, y: lineIndex })}
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
