import React from "react";
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';

export default function Producer_profile({ producer }){
    return (
        <div className="container mt-5">
            <Row>
                <Col md={4}>
                    <Card>
                        <Card.Img variant="top" src={producer.image} />
                        <Card.Body>
                            <Card.Title>{producer.name}</Card.Title>
                            <Card.Text>{producer.description}</Card.Text>
                            <Link to={`/producer/${producer.id}/edit`} className="btn btn-primary mr-2">Edit Profile</Link>
                            <Link to={`/producer/${producer.id}/beats`} className="btn btn-primary">My Beats</Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8}>
                    <h2>My Info</h2>
                    <hr />
                    <p><strong>Email:</strong>{producer.email}</p>
                    <p><strong>Location:</strong> {producer.location}</p>
                </Col>
            </Row>
        </div>
    );
};