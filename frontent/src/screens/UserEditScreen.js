import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id

    const [name, setName] = useState('') 
    const [email, setEmail] = useState('') 
    const [isAdmin, setIsAdmin] = useState(false) 

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    // get values from the state wich was set by userActions -> userReducers 
    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector((state) => state.userUpdate)
    const { 
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate
     } = userUpdate


    useEffect(() => {
        //if somebody try to use this route without being an admin will be redirect to login page
        if(userInfo && userInfo.isAdmin){
             // if user was successful updated
            if(successUpdate) {
                // reset user details
                dispatch({ type: USER_UPDATE_RESET })
                // go back to user list
                history.push('/admin/userlist')
            } else {
                // first userDetails should be empty and we have to bring here: dispatch(getUserDetails(userId))
                // check if user was already brought in
                if(!user.name || user._id !== userId) {
                    // if not we have to bring the user from userDetails
                    dispatch(getUserDetails(userId))
                } else {
                        // if user was already brought in, we have to updete values
                        setName(user.name)
                        setEmail(user.email)
                        setIsAdmin(user.isAdmin)
                    }
            }
        } else {
            history.push('/login')
        }
    }, [user, dispatch, userId, history, successUpdate, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    }

    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> 
                : error ? <Message variant='danger'>{error}</Message>
                : (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Adress</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='isadmin'>
                        <Form.Check
                            type='checkbox'
                            label='Is Admin'
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                            >
                        </Form.Check>
                    </Form.Group>

                    <Button type='submit' varinat='primary'>
                        Update
                    </Button>
                </Form>
                )}
               
                
            </FormContainer>
        </>
    )
}

export default UserEditScreen
