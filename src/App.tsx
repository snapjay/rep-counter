import React, {Component} from 'react'
import './App.css'
import StopWatch from './Components/StopWatch'
import {Container, Row, Col, Navbar} from 'react-bootstrap'

class App extends Component {
    render() {
        return (
            <div>
                <Navbar bg="primary" className='mb-3' variant="dark" expand={true}>
                    <Navbar.Brand>
                        {'Rep Timer'}
                    </Navbar.Brand>
                </Navbar>
            <Container  fluid={true}>
                <Row>
                    <Col>
                        <StopWatch/>
                        <small className='mt-4 d-none'>Icons made by <a
                            href="https://www.flaticon.com/authors/roundicons"
                            title="Roundicons">Roundicons</a> from <a
                            href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a
                            href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0"
                            target="_blank">CC
                            3.0 BY</a></small>
                    </Col>
                </Row>
            </Container>
            </div>
        )
    }
}

export default App
