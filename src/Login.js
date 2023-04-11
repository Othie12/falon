import React, { useState } from "react";
//import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import RegistrationForm from "./Signup"
import axios from "axios";
import { json } from "react-router-dom";

const LoginForm = ({setLoggedIn, setId}) => {
        //send login request to the server and handle response
        //I can use HTTP or axios
        //Then st the appropriate coocKies or JWTs if login is succesful
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    //history = useHistory();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        /*
        try {
        const response = await axios.post("http://localhost:8080/Login", {
            email,
            pwd
        }, {
            headers: {'Content-Type': 'application/json'}
        })
        if (response.status === 200) {
            window.location.href = "/";
          }
        } catch (error) {
            console.log(error)
          setErrorMessage("Invalid username or password");
        }
      };
*/

        fetch('http://localhost:8080/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, pwd: pwd})
        })
        .then(response => {
        if(response.status === 200){
           // setEmail("");
            //setPwd("");
            //window.location.href = "/";
            setLoggedIn(l => !l);
            console.log("Response status: " + response.status)

            return response.json();
        }else{
            console.log("Response status: " + response.status)
        }

        })
        .then(data => {
            console.log(data);
            setId(data.id) 
        })
        .catch(error => {
            console.error(error);
            setErrorMessage("invalid email or password");
        });
    };

    return (
        <div className="container mt-3">
            <p align="center" className="text-info"><i>Already have an account</i></p>
            <h2 align="center">Login form</h2>
            <h3>{email} {pwd}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
            <Form.Group controlId="pwd">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    required
                />
            </Form.Group>
            {errorMessage && (
                <div className="text-danger mb-3">{errorMessage}</div>
            )}

            <Button variant="primary" type="submit">Login</Button>
            </Form>
        </div>
    )
}

const CombineForms = ({setLoggedIn, setId}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-6 col-md-6 col-lg-6 col-xs-6 jumbotron">
                    <LoginForm setLoggedIn = {setLoggedIn} setId = {setId}/>
                    <hr></hr>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-6 col-xs-6">
                    <RegistrationForm />
                </div>
            </div>
        </div>
    );
}

export default CombineForms;