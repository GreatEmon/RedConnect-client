import React, { use, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { FaUserCircle } from 'react-icons/fa';
import { MdMenuOpen } from "react-icons/md";
import { AuthContext } from '../context/AuthProvider';
import Swal from 'sweetalert2'
import Loading from './Loading';

const Navbar = () => {
  const { user, logout, setUser } = use(AuthContext)
  const [loading, setLoading] = useState()

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

  if (loading) return <Loading />
  return (
    <nav className="bg-base-100 shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="md:text-2xl font-bold text-primary">
          Red-Connect
        </Link>

        {/* Links */}
        <div className="md:flex items-center gap-3 md:text-base text-sm hidden">
          <NavLink to="/donation-requests" className="link link-hover">
            Donation Requests
          </NavLink>
          <NavLink to="/blog" className="link link-hover">
            Blog
          </NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/contact">Contact</NavLink>


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
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full md:mt-3">
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

        {/* Mobile Menu  */}
        <div className="md:hidden items-center gap-3 md:text-base text-sm flex">

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
              {/* User Dropdown */}
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full md:mt-3">
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

              {/* Mobile Dropdown */}
              <div className="dropdown dropdown-end md:hidden">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full md:mt-3">
                    < MdMenuOpen className="text-3xl mt-2" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 mt-2"
                >
                  <NavLink to="/funding" className="link link-hover">
                    Funding
                  </NavLink>
                  <NavLink to="/about">About Us</NavLink>
                  <NavLink to="/contact">Contact</NavLink>
                  <NavLink to="/donation-requests" className="link link-hover">
                    Donation Requests
                  </NavLink>
                  <NavLink to="/blog" className="link link-hover">
                    Blog
                  </NavLink>

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
