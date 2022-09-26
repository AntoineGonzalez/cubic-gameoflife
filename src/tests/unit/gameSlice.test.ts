import gameSlice from '../../store/slices/gameSlice'
import gridsFixtures from '../fixtures/grids.json'

describe('store/slices/gameSlice', () => {
  it('reduces the initialize action', () => {
    const { actions, reducer } = gameSlice

    const initialState = {
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

    const actual = reducer(
      initialState,
      actions.initialize(5)
    )

    const expected = {
      ...initialState,
      cube: {
        top: gridsFixtures.initial,
        bot: gridsFixtures.initial,
        left: gridsFixtures.initial,
        right: gridsFixtures.initial,
        front: gridsFixtures.initial,
        back: gridsFixtures.initial
      }
    }

    expect(actual).toStrictEqual(expected)
  })

  it('reduces state to start the game', () => {
    const { actions, reducer } = gameSlice

    const initialState = {
      isRunning: false,
      iterationCounter: 0,
      cube: {
        top: [[]],
        bot: [[]],
        left: [[]],
        right: [[]],
        front: [[]],
        back: [[]]
      }
    }

    const actual = reducer(initialState, actions.startGame())

    const expected = {
      ...initialState,
      isRunning: true
    }

    expect(actual).toStrictEqual(expected)
  })

  it('reduces state to stop the game', () => {
    const { actions, reducer } = gameSlice

    const initialState = {
      isRunning: true,
      iterationCounter: 0,
      cube: {
        top: [[]],
        bot: [[]],
        left: [[]],
        right: [[]],
        front: [[]],
        back: [[]]
      }
    }

    const actual = reducer(initialState, actions.stopGame())

    const expected = {
      ...initialState,
      isRunning: false
    }

    expect(actual).toStrictEqual(expected)
  })
})
