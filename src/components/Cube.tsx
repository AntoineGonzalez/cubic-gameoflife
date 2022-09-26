import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import gameSlice, { selectCube, size } from '../store/slices/gameSlice'
import Grid from './Grid'

const Cube = ({ size }: { size: size }) => {
  const dispatch = useDispatch()
  const cube = useSelector(selectCube)

  useEffect(() => {
    dispatch(gameSlice.actions.initialize(size))
  }, [dispatch, size])

  return (
    <div>
      <CubeLine>
        <Grid grid={cube.back} />
      </CubeLine>
      <CubeLine>
        <Grid grid={cube.left} />
        <Grid grid={cube.bot} />
        <Grid grid={cube.right} />
      </CubeLine>
      <CubeLine>
        <Grid grid={cube.front} />
      </CubeLine>
      <CubeLine>
        <Grid grid={cube.top} />
      </CubeLine>
    </div>
  )
}

const CubeLine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Cube
