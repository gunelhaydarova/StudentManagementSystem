import React, { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import loginIcon from '../../images/user.png';
import uiImage from '../../images/login_ico1.svg';
import './Login.css';
export default function Login() {
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [errorMes, setErrorMes] = useState("");

    sessionStorage.setItem('id', -1);
    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        sessionStorage.setItem('mail', email);
        event.preventDefault();
        const userData = {
            username: email,
            password: password
        }
        const url = 'http://localhost:8080/login';
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }
        fetch(url, params)

            .then(response => response.json())
            .then(response => {
                if (response.status) {
                    console.log('1')
                    setErrorMes('İstifadəçi adı və ya parol səhvdir!');
                    setEmail('');
                    setPassword('')
                }
                else {
                    fetch(`http://localhost:8080/v1/teams/teacher-email/?email=${email}`)
                        .then(response => response.json())
                        .then(response => {
                            sessionStorage.setItem('subjectId', response.subjectId);;
                        })
                    var url;
                    sessionStorage.setItem('role', response.role);
                    if (response.role == 'TEACHER') {
                        fetch('http://localhost:8080/v1/teams')
                            .then((response) => response.json())
                            .then((res) => {
                                url = '/group/:' + res[0].id;
                                var url_id = ':' + res[0].id;
                                window.location.replace(url);
                            });

                    }
                    else window.location.replace(response.role);


                };
            });



    }
    return (
        <>
            <Container className="mt-5">
                <Row>
                    <Col lg={7} md={6} sm={12}>
                        <img className="w-100" src={uiImage} alt="icon" />
                    </Col>
                    <Col lg={5} md={6} sm={12} className="text-center p-5 mt-5 align-middle">
                        <img className="icon-img" src={loginIcon} alt="icon" />
                        <Form onSubmit={handleSubmit}>
                            <span className="text-danger text-left">{errorMes}</span>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => { setEmail(e.target.value); setErrorMes('') }} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value); setErrorMes('') }} required />
                            </Form.Group>
                            <Button variant="primary  btn-block" type="submit" disabled={!validateForm()} className="submit_btn">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
