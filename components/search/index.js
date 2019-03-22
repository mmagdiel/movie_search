import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Router from 'next/router'
import Col from 'react-bootstrap/Col'

export default () => {
    const [search, setSearch] = useState('')
    const [clickable, setClickable] = useState(true)

    useEffect(
        () => {
            search.length > 2 ? setClickable(false) :  setClickable(true)
        }, [search]
    )

    const handleChange = e => {
        setSearch(e.target.value)
    }

    const handlerClick = e => {
        e.preventDefault()
        Router.push({
            pathname: '/list',
            query: { movie: search }
        })
    }

    return(
        <Form>
            <Form.Row>
                <Col>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control 
                            type="text" 
                            placeholder="e.g. The Gatsby" 
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Button 
                        variant="primary" 
                        type="submit"
                        onClick={handlerClick}
                        disabled={clickable}
                    >
                        Search
                    </Button>
                </Col>
            </Form.Row>
        </Form>
    )
}