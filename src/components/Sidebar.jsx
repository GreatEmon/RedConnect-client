import { NavLink } from "react-router";
import { FaUser, FaHome, FaSignOutAlt, FaPlusCircle, FaListAlt } from "react-icons/fa";

const Sidebar = () => {
  const navItems = [
    { to: "/dashboard", icon: <FaHome />, label: "Home" },
    { to: "/dashboard/profile", icon: <FaUser />, label: "Profile" },
    { to: "/dashboard/create-donation-request", icon: <FaPlusCircle />, label: "Create Request" },
    { to: "/dashboard/my-donation-requests", icon: <FaListAlt />, label: "My Requests" },
    { to: "/logout", icon: <FaSignOutAlt />, label: "Logout" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 bg-white shadow-lg flex-col p-4 sticky top-0">
        <div className="text-2xl font-bold text-red-600 mb-8">Dashboard</div>
        <nav className="flex flex-col gap-2">
          {navItems.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end     // Ensures exact match (important for /dashboard root)
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-md transition-colors ${
                  isActive
                    ? "bg-red-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-red-100 hover:text-red-600"
                }`
              }
            >
              {icon} {label}
            </NavLink>
          ))}
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
                    isActive
                      ? "bg-red-500 text-white"
                      : "text-gray-600 hover:text-red-600 hover:bg-red-100"
                  }`
                }
              >
                {icon}
                <span className="text-xs">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
