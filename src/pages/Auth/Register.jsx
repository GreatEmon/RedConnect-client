import React, { useState, useEffect, use } from 'react';
import { useNavigate, Link } from 'react-router';
import axios from 'axios';
import districtsData from '../../data/districts.json'
import upazilasJSON from '../../data/upazila.json'
import { AuthContext } from '../../context/AuthProvider';
import Swal from 'sweetalert2'
import Loading from '../../components/Loading'

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const Register = () => {
    const navigate = useNavigate();
    const { register, updateUser } = use(AuthContext)
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [upazilasData, setUpazilasData] = useState([]);
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        avatar: '',
        bloodGroup: '',
        district: '',
        upazila: '',
        password: '',
        confirmPassword: ''
    });

    // Fetch districts and upazilas
    useEffect(() => {
        setDistricts(districtsData);
        setUpazilasData(upazilasJSON)
    }, []);

    // Update upazilas when district changes
    useEffect(() => {
        if (formData.district) {
            const selectedDistrict = districts.find(
                (d) => d.name === formData.district
            );
            const upazilafetch = upazilasData.filter(e => e.district_id == selectedDistrict.id)
            setUpazilas(selectedDistrict ? upazilafetch : []);
        } else {
            setUpazilas([]);
        }
    }, [formData.district]);

    // Set the data
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle avatar upload to ImageBB (mock function)
    const handleAvatarUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const form = new FormData();
        form.append('image', file);

        try {
            const apiKey = import.meta.env.VITE_imgbb_apikey; // replace with your key
            const res = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, form);
            setFormData({ ...formData, avatar: res.data.data.url });
        } catch (err) {
            console.error('Avatar upload error:', err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        const { password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            setLoading(false)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please type same password"
            });
            return;
        }

        register(formData.email, formData.password)
            .then(async (userCredential) => {

                updateUser({
                    displayName: formData.name,
                    photoURL: formData.avatar
                }).then(() => {
                    setLoading(false)
                    Swal.fire({
                        icon: "success",
                        title: "Regitration Successful",
                        text: "Welcome to RedConnect Family"
                    });
                }).catch((error) => {
                    setLoading(false)
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong"
                    });
                })

                const user = userCredential.user;
                const backendData = {
                    firebaseId: user.uid,
                    name: formData.name,
                    email: formData.email,
                    avatar: formData.avatar,
                    bloodGroup: formData.bloodGroup,
                    district: formData.district,
                    upazila: formData.upazila,
                };

                await axios.post('http://localhost:3000/api/users/register', backendData);
                navigate('/');

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setLoading(false)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong"
                });
            });


    };

    if(loading) return <Loading></Loading>
    return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 py-20">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
                    Register
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block mb-1 font-semibold">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-semibold">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Avatar */}
                    <div>
                        <label className="block mb-1 font-semibold">Avatar</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarUpload}
                            className="file-input file-input-bordered w-full"
                        />
                        {formData.avatar && (
                            <img
                                src={formData.avatar}
                                alt="avatar preview"
                                className="w-20 h-20 rounded-full mt-2"
                            />
                        )}
                    </div>

                    {/* Blood Group */}
                    <div>
                        <label className="block mb-1 font-semibold">Blood Group</label>
                        <select
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleChange}
                            className="select select-bordered w-full"
                            required
                        >
                            <option value="">Select Blood Group</option>
                            {bloodGroups.map((bg) => (
                                <option key={bg} value={bg}>
                                    {bg}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* District */}
                    <div>
                        <label className="block mb-1 font-semibold">District</label>
                        <select
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            className="select select-bordered w-full"
                            required
                        >
                            <option value="">Select District</option>
                            {districts.map((d) => (
                                <option key={d.name} value={d.name}>
                                    {d.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Upazila */}
                    <div>
                        <label className="block mb-1 font-semibold">Upazila</label>
                        <select
                            name="upazila"
                            value={formData.upazila}
                            onChange={handleChange}
                            className="select select-bordered w-full"
                            required
                            disabled={!formData.district}
                        >
                            <option value="">Select Upazila</option>
                            {upazilas.map((u) => (
                                <option key={u.id} value={u.name}>
                                    {u.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 font-semibold">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter Password"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block mb-1 font-semibold">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Submit */}
                    <button type="submit" className="btn btn-primary w-full">
                        Register
                    </button>
                </form>

                <p className="text-center text-sm mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-red-600 font-semibold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
