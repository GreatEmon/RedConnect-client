import React, { use, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../context/AuthProvider';
import Swal from 'sweetalert2'
import Loading from './Loading';

const Navbar = () => {
  const { user, logout, loading ,setLoading, setUser} = use(AuthContext)

  const handleSignOut = () => {
    
    setLoading(true)
    logout().then(() => {
      // Sign-out successful.
      Swal.fire({
        title: "Good job!",
        text: "Sign Out Successful!",
        icon: "success"
      });
      setUser(null)
      setLoading(false)
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <nav className="bg-base-100 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          Red-Connect
        </Link>

        {/* Links */}
        <div className="flex items-center gap-4">
          <NavLink to="/donation-requests" className="link link-hover">
            Donation Requests
          </NavLink>
          <NavLink to="/blog" className="link link-hover">
            Blog
          </NavLink>



          {!user ? (
            // Before login
            <>
              <NavLink to="/login" className="btn btn-outline btn-sm ml-2">
                Login
              </NavLink>
              <NavLink to="/register" className="btn btn-primary btn-sm ml-2">
                Register
              </NavLink>
            </>
          ) : (
            // After login
            <>
              <NavLink to="/funding" className="link link-hover">
                Funding
              </NavLink>

              {/* User Dropdown */}
              <div className="dropdown dropdown-end ite">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full mt-3">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="User Avatar" />
                    ) : (
                      <FaUserCircle className="text-3xl" />
                    )}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 mt-2"
                >
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <button onClick={handleSignOut}>Logout</button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
