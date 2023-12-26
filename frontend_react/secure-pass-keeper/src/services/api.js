import Cookies from 'js-cookie';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;


// const handleResponse = (response) => {
//   if (!response.ok) {
//     throw new Error(`Request failed with status: ${response.status}`);
//   }
//   return response.json();
// };

const api = {
  get: async (endpoint) => {
    let accessToken = Cookies.get('access_token');
    try {
      let response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      });

      if (response.status == 401) {
        await api.refreshToken()
        accessToken = Cookies.get('access_token');
        response = await fetch(`${BASE_URL}/${endpoint}/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        });
      }

      return response;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },

  post: async (endpoint, formData, withoutHeader=false) => {
    try {
      if(withoutHeader)
      {
        let response = await fetch(`${BASE_URL}/${endpoint}`, {
          method: 'POST',
          body: formData
        });
        return response
      }
      let accessToken = Cookies.get('access_token');
      let response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      });

      if (response.status == 401) {
        await api.refreshToken()
        accessToken = Cookies.get('access_token');

        response = await fetch(`${BASE_URL}/${endpoint}`, {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        });
      }

      return response;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },

  refreshToken: async () => {
    console.log("Access token expire..!")
    const refresh_token = Cookies.get('refresh_token');

    // Make a request to your server to refresh the token
    const formData = new FormData()
    formData.append('refresh', refresh_token)
    const refreshResponse = await fetch(`${BASE_URL}/refresh_token/`, {
      method: 'POST',
      body: formData
    });

    if (refreshResponse.status == 200) {
      const responseData = await refreshResponse.json();
      Cookies.set('access_token', responseData.access)

      console.log("New access_token", responseData.access)
    }

  }

  // Additional methods (e.g., put, delete) can be added as needed
};

export default api;
