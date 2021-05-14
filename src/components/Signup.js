import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import instance from './instance';

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const userTypeRef = useRef();
    const adminTypeRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }
        try {
            setError('')
            setLoading(true)
            if(userTypeRef.current.checked){
                const data = {email: emailRef.current.value, type: userTypeRef.current.value}
                instance.post('/users.json', data).then(res => {
                })
            }
            if(adminTypeRef.current.checked){
                const data = {email: emailRef.current.value, type: adminTypeRef.current.value}
                instance.post('/users.json', data).then(res => {
                })
            }
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push('/')

        } catch {
            setError('Failed to create an account')
        }
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4 " >Sign Up</h2>
                    {error && <Alert variant="danger" >{error}</Alert>}
                    <Form onSubmit={handleSubmit} >
                        <Form.Group id="email" >
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required ref={emailRef} ></Form.Control>
                        </Form.Group>
                        <Form.Group id="password" >
                            <Form.Label className="mt-2">Password</Form.Label>
                            <Form.Control type="password" required ref={passwordRef} ></Form.Control>
                        </Form.Group>
                        <Form.Group id="password-confirm" >
                            <Form.Label className="mt-2">Password Confirmation</Form.Label>
                            <Form.Control type="password" required ref={passwordConfirmRef} ></Form.Control>
                        </Form.Group>
                        <Form.Group className="mt-2" id="user-type" >
                            <Form.Label>Type of user</Form.Label>
                            <Form.Check type="radio" name="user-type" ref={userTypeRef} value="user" required label="Regular user"  ></Form.Check>
                            <Form.Check type="radio" name="user-type" ref={adminTypeRef} value ="admin" required  label="Admin" ></Form.Check>
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-3" type="submit" >Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2" >
                Already have an account? <Link to="/login" >Log In</Link>
            </div>
        </>
    )
}
