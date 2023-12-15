import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';
import {toast} from 'react-hot-toast';

const AuthRoutes = () => {
  const [auth] = useAuthContext();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    if (!auth?.user) {
      // Redirect to the login page
      setLoading(true)
      navigate('/');
    } else {
      setLoading(false);
    }
  }, [auth, navigate]);

  if (loading) {
    <div>Redirecting You....</div>
  }

  return <Outlet/>;
};

export default AuthRoutes;
