import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { MDBInput } from 'mdb-react-ui-kit';
import api from '../../../services/api'


function PasswordCard({ id, title, description }) {

const [loginPassword, setLoginPassword] = useState('');
const [decryptedPassword, setDecryptedPassword] = useState('********')

const handleDecryptePassword = async () => {
    try {
      const formData = new FormData()
      formData.append('password_store_id', id)
      formData.append('user_password', loginPassword)
      const response = await api.post('password_store/get-decrypt-password/', formData);

      console.log(response)

      if(response.status == 200)
      {
        const responseData = await response.json();
        console.log(responseData)
        setDecryptedPassword(responseData.dycrypted_password)
      }else if(response.status == 403)
      {
        alert("Failed : Invalid Login Password")
      }
      else if(response.status == 401)
      {
        alert("Error : Your token is expired. Please Login again.")        
      }else
      {
        alert("Error : Decrypt Password Failed.")
      }

    } catch (error) {
      console.error('Error during decrypt pasword post api call.:', error);
      alert(error)
    }
  };

  return (
    <Card style={{marginTop: 10}}>
      <Card.Header as="h5">{decryptedPassword}</Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>

        <hr></hr>

        <div className="row">
            <div className="col-8">
                <MDBInput wrapperClass='mb-1' placeholder='Login Password' type='password' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value )}/>
            </div>
            <div className="col-3">
                <Button variant="primary" onClick={handleDecryptePassword}>Show</Button>
            </div>
        </div>

      </Card.Body>
    </Card>
  );
}

export default PasswordCard;