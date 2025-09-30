// src/components/Dashboard/Sidebar.jsx
import { NavLink, useNavigate } from "react-router";
import { FaUser, FaHome, FaSignOutAlt, FaPlusCircle, FaListAlt } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";

import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";
import Loading from "./Loading";

const Sidebar = () => {
  const { user, logout, setUser } = useContext(AuthContext);
  const [admin, setAdmin] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user role
  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axios
        .get(`http://localhost:3000/role?email=${user.email}`)
        .then((res) => {
          console.log(res.data.role)
          if(res.data.role === "admin"){
            setAdmin(1);
          }else if(res.data.role === "volunteer"){
            setAdmin(2);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [user]);

  const handleSignOut = () => {
    setLoading(true);
    logout()
      .then(() => {
        Swal.fire({
          title: "Good job!",
          text: "Sign Out Successful!",
          icon: "success",
        });
        setUser(null);
        navigate("/");
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  if (loading) return <Loading />;

  // Links for all users
  let navItems = [
    { to: "/dashboard", icon: <FaHome />, label: "Home" },
    { to: "/dashboard/profile", icon: <FaUser />, label: "Profile" },
    { to: "/dashboard/create-donation-request", icon: <FaPlusCircle />, label: "Create Request" },
    { to: "/dashboard/my-donation-requests", icon: <FaListAlt />, label: "My Requests" },
  ];

  // Add admin-only links dynamically
  // console.log(admin)
  if (admin==1) {
    navItems = [
      { to: "/dashboard/stat", icon: <FaHome />, label: "Home" },
      { to: "/dashboard/all-users", icon: <FaUser />, label: "All Users" },
      { to: "/dashboard/all-blood-donation-request", icon: <FaListAlt />, label: "All Requests" },
      { to: "/dashboard/content-management", icon: <FaPlusCircle />, label: "Content Management" }
    ];
  }
  if (admin==2) {
    navItems = [
      { to: "/dashboard/stat", icon: <FaHome />, label: "Home" },
      { to: "/dashboard/all-blood-donation-request", icon: <FaListAlt />, label: "All Requests" },
      { to: "/dashboard/content-management", icon: <FaPlusCircle />, label: "Content Management" }
    ];
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 bg-white shadow-lg flex-col p-4 sticky top-0 h-screen">
        <div className="text-2xl font-bold text-red-600 mb-8">Dashboard</div>
        <nav className="flex flex-col gap-2">
          {navItems.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-md transition-colors ${
                  isActive ? "bg-red-500 text-white shadow-md" : "text-gray-700 hover:bg-red-100 hover:text-red-600"
                }`
              }
            >
              {icon} {label}
            </NavLink>
          ))}
          <button
            onClick={handleSignOut}
            className="btn bg-red-600 gap-3 p-3 rounded-md transition-colors text-white mt-5 hover:bg-red-100 hover:text-red-600 text-left"
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </aside>

      {/* Mobile Horizontal Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-inner border-t z-50 py-2">
        <ul className="flex justify-around items-center">
          {navItems.map(({ to, icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end
                className={({ isActive }) =>
                  `flex flex-col items-center px-4 py-2 rounded-md transition-colors ${
                    isActive ? "bg-red-500 text-white" : "text-gray-600 hover:text-red-600 hover:bg-red-100"
                  }`
                }
              >
                {icon}
                <span className="text-xs">{label}</span>
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={handleSignOut}
              className="flex flex-col items-center px-4 py-2 rounded-md transition-colors text-gray-600 hover:text-red-600 hover:bg-red-100"
            >
              <FaSignOutAlt />
              <span className="text-xs">Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
