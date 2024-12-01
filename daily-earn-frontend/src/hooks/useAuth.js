import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserData } from '../services/api';

const useAuth = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      setLoading(false);
    } else {
      fetchUserData(token)
        .then((res) => {
          setUserData(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error.response ? error.response.data : error);
          localStorage.removeItem('token');
          setError('Session expired. Please log in again.');
          setLoading(false);
          setTimeout(() => navigate('/login'), 2000);
        });
    }
  }, [navigate]);

  return { userData, loading, error };
};

export default useAuth;
