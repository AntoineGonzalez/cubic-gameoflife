import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Selector } from '../store'

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

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initialize: (state, action: PayloadAction<size>) => {
      const faces = [
        'top',
        'bot',
        'left',
        'right',
        'front',
        'back'
      ]

      const cube = Object.fromEntries(
        faces.map(
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
