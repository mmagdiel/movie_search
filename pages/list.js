import 'isomorphic-fetch'
import List from '../components/list'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Sear from '../components/search'
import NotFound from '../components/notFound'
const apikey = 'd5c1e7ff'
export default class extends React.Component {
    static async getInitialProps({query}) {
        try {
            const { movie } = query
            const url = `http://www.omdbapi.com/?s=${movie}&apikey=${apikey}`
            let req = await fetch(url)
            let { Search, totalResults, Response } = await req.json()
            return { Search, totalResults, Response, movie  }
        } catch(e) {
            return { Search: null, totalResults: 0, Response:false }
        }
    }
  
    render() {
        const { Response, Search, totalResults, movie } = this.props
        return(
            <>    
                <Container>
                    <Sear />
                    <Row>
                        { totalResults } results for { movie }
                    </Row>
                    <Row>
                        {
                            Response && Search ? <List search={Search} /> : <NotFound name={ movie }/>
                        }
                    </Row>
                </Container>
            </>
        )
    }
}