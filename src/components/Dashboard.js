import React, { useState, useEffect } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import instance from './instance'

export default function Dashboard() {

    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();
    const [userType, setUserType] = useState('');

    useEffect(() => {
        instance.get('/users.json').then(res => {
            for (const item in res.data) {
                if (res.data[item].email === currentUser.email){
                    setUserType(res.data[item].type)
                }
            }
        })
    }, [currentUser.email])

    const history = useHistory();

    async function  handleLogout() {
        setError('')
        try {
            await logout()
            history.push('/login')
        } catch {
            setError('Failed to log out')
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4" >Profile</h2>
                    {error && <Alert variant="danger" >{error}</Alert>}
                    <strong className="m-2">Email: </strong>{currentUser.email}
                    <strong className="m-2" >User type: </strong>{userType}
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
                </Card.Body>
            </Card>
            <div className="w-100 mt-2 text-center" >
                <Button variant="link" onClick={handleLogout} >Log Out</Button>
            </div>
        </>
    )
}
