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
        <Grid face="back" grid={cube.back} />
      </CubeLine>
      <CubeLine>
        <Grid face="left" grid={cube.left} />
        <Grid face="bot" grid={cube.bot} />
        <Grid face="right" grid={cube.right} />
      </CubeLine>
      <CubeLine>
        <Grid face="front" grid={cube.front} />
      </CubeLine>
      <CubeLine>
        <Grid face="top" grid={cube.top} />
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
