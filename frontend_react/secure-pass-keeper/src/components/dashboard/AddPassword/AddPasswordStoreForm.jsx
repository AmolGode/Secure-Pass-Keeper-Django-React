import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import { useNavigate } from 'react-router-dom';
import api from '../../../services/api'

function AddPasswordStoreForm() {


    const navigate = useNavigate();

    const handleAddingToPasswordStore = async () => {
      try {
        const formData = new FormData()
        formData.append('title', passwordStoreData.title)
        formData.append('description', passwordStoreData.description)
        formData.append('raw_password_to_store', passwordStoreData.password_to_store)
        formData.append('user_password', passwordStoreData.login_password)
        const response = await api.post('password_store/add-to-store/', formData);
  
        if(response.status == 201)
        {
          alert("Password Stored successfully..!")
          navigate('/dashboard') //To remove action title from url
          const responseData = await response.json();
          navigate('/dashboard')
        }else if(response.status == 401)
        {
          alert("Error : Please enter valid login password.")        
        }else
        {
          alert("Error : Password Storing Failed.")
        }
  
      } catch (error) {
        console.error('Error during add pasword storing post api call.:', error);
        alert(error)
      }
    };
  
    const [passwordStoreData, setPasswordStoreData] = useState({
      title: '',
      description: '',
      password_to_store: '',
      login_password: ''
    });

    

  return (
    <div className="container">
        <div className="row">
            <div className="col-lg-4 col-md-8 col-sm-12 mx-auto">
                <h1 className="text-center">Add Password</h1>
                <hr></hr>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Password Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Password Title"
                        autoFocus
                        value={passwordStoreData.title} onChange={(e) => setPasswordStoreData({ ...passwordStoreData, title: e.target.value })}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Password (Which you want to encrypt.)</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Which you want to store."
                        value={passwordStoreData.password_to_store} onChange={(e) => setPasswordStoreData({ ...passwordStoreData, password_to_store: e.target.value })}
                    />
                    </Form.Group>

                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea3"
                    >
                    <Form.Label>Description (Optional)</Form.Label>
                    <Form.Control
                    as="textarea" rows={3} 
                    value={passwordStoreData.description} onChange={(e) => setPasswordStoreData({ ...passwordStoreData, description: e.target.value })}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                    <Form.Label>Login Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="To encrypt your password."
                        value={passwordStoreData.login_password} onChange={(e) => setPasswordStoreData({ ...passwordStoreData, login_password: e.target.value })}
                    />
                    </Form.Group>

                    <Button variant="primary" onClick={handleAddingToPasswordStore}>
                        Save Changes
                    </Button>

                </Form>
            </div>
        </div>
    </div>
  )
}

export default AddPasswordStoreForm
