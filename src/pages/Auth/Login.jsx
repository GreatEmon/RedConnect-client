import React, { use, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router';
import { AuthContext } from '../../context/AuthProvider';
import Swal from 'sweetalert2'
import Loading from '../../components/Loading';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login, loading, setLoading } = use(AuthContext)
  const location = useLocation()

  document.title = "Login - RedConnect"

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    const { email, password } = formData;

    login(email, password)
      .then((userCredential) => {
        // Signed in 
        Swal.fire({
          title: "Success",
          text: "Logged In",
          icon: "success"
        });
        setLoading(false)
        navigate(location.state || "/dashboard")

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire({
          title: "Error",
          text: "Incorrect Email or password",
          icon: "error"
        });
        setLoading(false)

      });


  };
  if(loading) return <Loading></Loading>

  return (
    <div className="py-30 flex items-cent er justify-center bg-red-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="input input-bordered w-full"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{' '}
          <Link to="/register" className="text-red-600 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
