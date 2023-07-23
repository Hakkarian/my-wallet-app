import Header from '../Header'
import { Outlet } from 'react-router-dom'
import { Container } from './SharedLayout.styled'

const SharedLayout = () => {
  return (
      <>
          <Header />
          <Container>
              <Outlet />
          </Container>
      </>
  )
}

export default SharedLayout