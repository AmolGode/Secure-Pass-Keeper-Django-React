import React, { useEffect, useState } from 'react';
import PasswordCard from '../PasswordCard/PasswordCard';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import api from '../../../services/api'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [passStoreData, setPassStoreData] = useState([]);
  const [allPassStoreData, setAllPassStoreData] = useState(passStoreData);

  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate()

  const handleLogout = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    navigate("/")
  }

  useEffect(() => {
    const fetchPassStoreData = async () => {
      try {
        const response = await api.get('password_store/get-all-pass-store-objs/?request_type=get-all-objs');
        if (response.ok) {
          const responseData = await response.json();
          setPassStoreData(responseData);
          setAllPassStoreData(responseData)
          console.log("responseData => ", responseData)
        } else if (response.status == 401) {
          alert("Your token is expired. Please login again.")
          handleLogout()
        } else {
          console.error('Request failed:', response.statusText);
          alert("Failed: " + response.statusText)
        }
      } catch (error) {
        console.error('Error during API call:', error);
        alert("Error: " + error)
      }
    };

    fetchPassStoreData(); // Call the function to fetch PassStoreData when the component mounts
  }, []); // The empty dependency array ensures that the effect runs only once on mount  


  function handleSearch() {
    // Convert search_title to lowercase for case-insensitive search
    const searchQueryLowerCase = searchQuery.toLowerCase();

    // Use the filter method to create a new array with matching objects
    const matchingObjs = allPassStoreData.filter(obj =>
      obj.title.toLowerCase().includes(searchQueryLowerCase)
    );

    setPassStoreData(matchingObjs)
    console.log(searchQuery, matchingObjs)
  }


  return (
    <>
      <div className="container">
        <div className="row">
          <div className='col-lg-8 col-md-8 col-sm-12'>
            {/* Content for the 5-column offset */}
          </div>

          <div className='col-lg-4 col-md-4 col-sm-12' style={{marginTop: 5}}>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="outline-success" onClick={handleSearch}>Search</Button>
            </Form>
          </div>



          {passStoreData.map((data, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12">
              <PasswordCard id={data.id} title={data.title} description={data.description} />
            </div>
          ))}

        </div>
      </div>
    </>
  );
};

export default Dashboard;
