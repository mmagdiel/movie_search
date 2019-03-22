import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Search from '../components/search'

export default () => {
  return(
    <Container>
        <Row>
            <Col md={{ span: 6, offset: 3 }}>
                <Search />
            </Col>
        </Row>
    </Container>
  )
}