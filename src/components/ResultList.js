import React from 'react';
import { ListGroup, ListGroupItem, Col, Row } from 'reactstrap';

function ResultList(props) {
    const { oldGuesses } = props;
    return (
        <ListGroup>
            {
                oldGuesses ? oldGuesses.map((oldGuess, index) => {
                    return <Row key={index}>
                        <Col sm={6} style={{ paddingRight: "0" }}>
                            <ListGroupItem className="text-center">{oldGuess.guess}</ListGroupItem>
                        </Col>
                        <Col sm={6} style={{ paddingLeft: "0" }}>
                            <ListGroupItem className="text-center">{oldGuess.result}</ListGroupItem>
                        </Col>
                    </Row>
                }) : ""
            }
        </ListGroup>
    )
}

export default ResultList;