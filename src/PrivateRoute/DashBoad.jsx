import React, { useEffect, useState, useContext, use } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import { Navigate } from 'react-router';
import { AuthContext } from '../context/AuthProvider';

const DashBoard = ({ children }) => {
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
        setLoading(true)
        const res = await axios.get(`https://red-connect-backend.vercel.app/role?email=${user.email}`, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${user.accessToken}`
        }
      });
        setRole(res.data.role);
        setLoading(false)
      } catch (err) {
        console.error(err);
        setLoading(false)
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [user]);

  if (authLoading || loading) return <Loading />;

  if (role === 'admin') return <Navigate to="/dashboard/stat" />;
  if (role === 'volunteer') return <Navigate to="/dashboard/stat" />;
  if (role === 'donor') return children;
};

export default DashBoard;
