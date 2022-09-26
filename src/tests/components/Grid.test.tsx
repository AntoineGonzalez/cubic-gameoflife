import { render, screen, within } from '@testing-library/react'
import wrapWithReduxProvider from '../utils/reduxProviderWrapper'
import gridsFixtures from '../fixtures/grids.json'
import Grid from '../../components/Grid'

describe('components/Grid.tsx', () => {
  it('displays a representation of the grid passed as props', () => {
    const gridData = gridsFixtures.initial
    render(wrapWithReduxProvider(<Grid face='top' grid={gridData} />))

    const grid = screen.getByRole('grid')
    const rows = within(grid).getAllByRole('row')
    expect(rows).toHaveLength(gridData.length)

    rows.forEach((row, rowIndex) => {
      const rowCells = within(row).getAllByRole('gridcell')
      expect(rowCells).toHaveLength(gridData[0].length)

      rowCells.forEach((cell, lineIndex) => {
        const isAlive = gridData[rowIndex][lineIndex]
        expect(cell).toHaveStyle(
          isAlive
            ? 'background-color:white'
            : 'background-color:grey'
        )
      })
    })
  })
})
