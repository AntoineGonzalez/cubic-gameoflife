import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Selector } from '../store'

export enum Faces {
  'top',
  'bot',
  'left',
  'right',
  'front',
  'back'
}

export type Face = keyof typeof Faces

export type Cube = {
  top: boolean[][]
  bot: boolean[][]
  left: boolean[][]
  right: boolean[][]
  front: boolean[][]
  back: boolean[][]
}

export type GameState = {
  cube: Cube
  isRunning: boolean
  iterationCounter: number
}

export type Coord = {
  x: number
  y: number
}

type CubePosition = {
  face: Face
  coord: Coord
}

export type size = number

export const initialState: GameState = {
  cube: {
    top: [[]],
    bot: [[]],
    left: [[]],
    right: [[]],
    front: [[]],
    back: [[]]
  },
  isRunning: false,
  iterationCounter: 0
}

const setCellIsAlive = (grid: boolean[][], coord: Coord, value: boolean) =>
  grid.map((line, lineIndex) =>
    line.map((isAlive, colIndex) =>
      (colIndex === coord.x && lineIndex === coord.y) ? value : isAlive
    )
  )

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initialize: (state, action: PayloadAction<size>) => {
      const cube = Object.fromEntries(
        Object.keys(Faces).filter((value) => isNaN(Number(value))).map(
          face => [
            face, Array.from(Array(action.payload).keys()).map(() => (
              Array.from(Array(action.payload).keys()).map(() => false)
            ))
          ]
        )
      ) as Cube

      return {
        ...state,
        isRunning: false,
        iterationCounter: 0,
        cube
      }
    },
    reviveCell: (state, action: PayloadAction<CubePosition>) => ({
      ...state,
      cube: {
        ...state.cube,
        [action.payload.face]: setCellIsAlive(
          state.cube[action.payload.face],
          action.payload.coord,
          true
        )
      }
    }),
    killCell: (state, action: PayloadAction<CubePosition>) => ({
      ...state,
      cube: {
        ...state.cube,
        [action.payload.face]: setCellIsAlive(
          state.cube[action.payload.face],
          action.payload.coord,
          false
        )
      }
    }),
    stopGame: (state) => ({
      ...state,
      isRunning: false
    }),
    startGame: (state) => ({
      ...state,
      isRunning: true
    })
  }
})

export const selectCube: Selector<Cube> = state => state.game.cube
export const selectCubeSize: Selector<size> = state => state.game.cube.front.length
export const selectGameState: Selector<GameState> = state => state.game
export const selectIsRunning: Selector<boolean> = state => state.game.isRunning
export const selectIterationCounter: Selector<number> = state => state.game.iterationCounter

export default gameSlice
