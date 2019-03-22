import 'isomorphic-fetch'
import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Badge from 'react-bootstrap/Badge'

const fill = '../../static/starFill.svg'
const solid = '../../static/starSolid.svg'
const altFill = 'A fill start'
const altSolid = 'A solid start'
const apikey = 'd5c1e7ff'
const styleStart = {
    width: "18px", 
    height: "18px", 
    padding: "0 0 0 0",
    margin: "0 0 0 0"
}
export default ({ search }) => {
    const [show, setShow] = useState(false)
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [ratings, setRatings] = useState('')
    const [genre, setGenre] = useState([])
    const [actors, setActors] = useState('')
    const [plot, setPlot] = useState('')
    const [poster, setPoster] = useState('')

    const handlerShow = e => {
        setId(e.currentTarget.id)
        setShow(true)
    }

    const handlerClose = e => {
        setShow(false)
    }

    const request = async (id) => {
        try {
            const url = `http://www.omdbapi.com/?i=${id}&apikey=${apikey}`
            let req = await fetch(url)
            let { Actors, Genre, Year, imdbRating, Title, Plot, Poster } = await req.json()
            setActors(Actors)
            setGenre(Genre.split(" "))
            setYear(Year)
            setRatings(imdbRating)
            setTitle(Title)
            setPlot(Plot)
            setPoster(Poster)
        } catch(e) {
            console.log("503")
        }
    }

    useEffect(
        () => {
            if(show){
                request(id)
            }
        }, [show]
    )

    search.sort(
        (el) => {
            if(el.Poster !== "N/A") {
                return 1
            }
            return 0
    })

    return(
        <>
            {
                search.map((el,i) => {
                    return (
                        <Col md={{ span: 3 }} key={i}>
                            <botton
                                id={el.imdbID}
                                onClick={handlerShow}
                            >
                                <Card style={{ width: '12rem' }} >
                                    <Card.Img variant="top" src={el.Poster} alt={el.Title} />
                                    <Card.Body>
                                        <Card.Title>
                                            {el.Title}
                                        </Card.Title>
                                        <Card.Text>
                                            {el.Year}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </botton>
                        </Col>
                    )
                })
            }

            <Modal show={ show } onHide={ handlerClose }>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={{ span: 6 }}>
                            <Image 
                                style={{maxWidth: "233px"}}
                                src={poster} 
                                alt={title} 
                                rounded 
                            />
                        </Col>
                        <Col xs={{ span: 6 }}>
                            <p>{year}</p>
                            <h5>
                                {
                                    genre.map((el,i) => {
                                        return <Badge
                                                key={i+'a'} 
                                                variant="secondary"
                                            >
                                                {el}
                                            </Badge>
                                    })
                                }
                            </h5>
                            <p>
                                {
                                    Array(10)
                                        .fill(0)
                                        .fill(1,0, Math.round(ratings))
                                        .map(
                                            (el,i) => el === 1 ? 
                                                <img style={styleStart} src={solid} alt={altSolid} /> : 
                                                <img style={styleStart} src={fill} alt={altFill} /> 
                                        )
                                }
                            </p>
                            <p>{plot}</p>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    {actors}
                </Modal.Footer>
            </Modal>
        </>
    )
}