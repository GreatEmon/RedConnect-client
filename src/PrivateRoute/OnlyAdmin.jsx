import React, { useEffect, useState, useContext, use } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import { Navigate } from 'react-router';
import { AuthContext } from '../context/AuthProvider';

const OnlyAdmin = ({ children }) => {
  const { user, loading: authLoading } = use(AuthContext); // get user and loading from context
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    const fetchRole = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/role?email=${user.email}`, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${user.accessToken}`
        }
      });
        setRole(res.data.role);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [user]);

  if (authLoading || loading) return <Loading />;

  if (role === 'admin') return children;

  return <Navigate to="/restricted" />;
};

export default OnlyAdmin;
