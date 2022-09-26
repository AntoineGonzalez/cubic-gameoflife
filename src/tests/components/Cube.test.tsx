import { render, screen, within } from '@testing-library/react'
import Cube from '../../components/Cube'
import wrapWithReduxProvider from '../utils/reduxProviderWrapper'
import userEvent from '@testing-library/user-event'

describe('components/Grid.tsx', () => {
  it('displays 6 grids (one for each cube face) of the desired size cotaining only dead cells', () => {
    render(wrapWithReduxProvider(<Cube size={10} />))

    const grids = screen.getAllByRole('grid')
    expect(grids).toHaveLength(6)

    grids.forEach((grid) => {
      const rows = within(grid).getAllByRole('row')
      expect(rows).toHaveLength(10)

      rows.forEach((row) => {
        const rowCells = within(row).getAllByRole('gridcell')
        expect(rowCells).toHaveLength(10)

        rowCells.forEach((cell) => {
          expect(cell).toHaveStyle('background-color:grey')
        })
      })
    })
  })

  it('revives a cell when a user clicks on a dead one', async () => {
    render(wrapWithReduxProvider(<Cube size={10} />))
    const grids = screen.getAllByRole('grid')
    const cell = within(grids[0]).getAllByRole('gridcell')[0]

    expect(cell).toHaveStyle('background-color:grey')
    await userEvent.click(cell)
    expect(cell).toHaveStyle('background-color:white')
  })

  it('kills a cell when a user clicks on a living one', async () => {
    render(wrapWithReduxProvider(<Cube size={10} />))
    const grids = screen.getAllByRole('grid')
    const cell = within(grids[0]).getAllByRole('gridcell')[0]

    await userEvent.click(cell)
    await userEvent.click(cell)
    expect(cell).toHaveStyle('background-color:grey')
  })
})
