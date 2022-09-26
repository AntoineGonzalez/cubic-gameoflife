import './App.css'
import styled from 'styled-components'
import Cube from './components/Cube'
import { useDispatch, useSelector } from 'react-redux'
import gameSlice, { selectCubeSize, selectIsRunning, selectIterationCounter } from './store/slices/gameSlice'

function App () {
  const dispatch = useDispatch()
  const size = useSelector(selectCubeSize)
  const gameIsRunning = useSelector(selectIsRunning)
  const iterationCounter = useSelector(selectIterationCounter)

  function handleStarGame () {
    dispatch(gameSlice.actions.startGame())
  }

  function handleClearGame () {
    dispatch(gameSlice.actions.initialize(size))
  }

  function handleStopGame () {
    dispatch(gameSlice.actions.stopGame())
  }

  return (
    <AppContainer>
      <Aside>
        <Header>
          Jeu de la vie
        </Header>
        <List>
          <li>Nombre d&apos;itérations : {iterationCounter}</li>
          <li>
            <Button onClick={handleClearGame} role="button">
              Reset
            </Button>
          </li>
          <li>
            <Button onClick={gameIsRunning ? handleStopGame : handleStarGame} role="button">
              {gameIsRunning ? 'Stop' : 'Start'}
            </Button>
          </li>
        </List>
      </Aside>
      <Container>
        <Cube size={20} />
      </Container>
    </AppContainer>
  )
}

const Container = styled.div`
  margin: 1.5em;
  min-height: 100vh;
`
const Header = styled.header`
  margin-bottom: 1.5em;
  padding: 1em;
  border-bottom: solid 1px grey;
`
const AppContainer = styled.div`
  display: flex;
`
const Aside = styled.aside`
  width: 300px;
  text-align: center;
  border-right: solid 1px grey;
`
export const List = styled.ul`
  list-style-type: none;
  padding: 1em;
  margin: 0 0 1em 0em;
`
const Button = styled.button`
  margin-top: 1em
`
export default App
