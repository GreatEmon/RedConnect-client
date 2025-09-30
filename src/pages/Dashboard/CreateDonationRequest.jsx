import React, { useState, useEffect, use } from 'react';
import axios from 'axios';
import districtsData from '../../data/districts.json'
import upazilasJSON from '../../data/upazila.json';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthProvider';
import Swal from 'sweetalert2';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const CreateDonationRequest = () => {
    const navigate = useNavigate();
    const { user } = use(AuthContext)
    const [districts, setDistricts] = useState([]);
    const [upazilasData, setUpazilasData] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [blocked, setBlocked] = useState(false);

    const [formData, setFormData] = useState({
        requesterName: user?.displayName || '',
        requesterEmail: user?.email || '',
        recipientName: '',
        recipientDistrict: '',
        recipientUpazila: '',
        hospitalName: '',
        address: '',
        bloodGroup: '',
        donationDate: '',
        donationTime: '',
        requestMessage: ''
    });

    useEffect(() => {
        setDistricts(districtsData);
        setUpazilasData(upazilasJSON);
    }, []);

    useEffect(() => {
        if (formData.recipientDistrict) {
            const selectedDistrict = districts.find(d => d.name === formData.recipientDistrict);
            const filteredUpazilas = upazilasData.filter(u => u.district_id == selectedDistrict.id);
            setUpazilas(filteredUpazilas);
        } else {
            setUpazilas([]);
        }
    }, [formData.recipientDistrict]);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/check-block?email=${user.email}`).
            then(res => {
                if (res.data.blocked) {
                    Swal.fire({
                        title: "Blocked",
                        text: "You are blocked, please contact with us",
                        icon: "error"
                    })
                }
                setBlocked(res.data.blocked)
            })
    }, [])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (blocked) {
            Swal.fire({
                title: "Blocked",
                text: "You are blocked",
                icon: "error"
            })
            return;
        }

        try {
            const res = await axios.post('http://localhost:3000/api/donation-requests', {
                ...formData,
                status: 'pending'
            });
            if (res.data.requestId) {
                Swal.fire({
                    title: "Good job!",
                    text: "Added Successfully!",
                    icon: "success"
                });
            }
            // navigate('/dashboard');
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: "Error",
                text: err,
                icon: "error"
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 py-10">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-2xl font-bold text-red-600 mb-6">Create Donation Request</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Requester Name & Email (read-only) */}
                    <div>
                        <label className="block mb-1 font-semibold">Your Name</label>
                        <input type="text" value={formData.requesterName} readOnly className="input input-bordered w-full" />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Your Email</label>
                        <input type="email" value={formData.requesterEmail} readOnly className="input input-bordered w-full" />
                    </div>

                    {/* Recipient Name */}
                    <div>
                        <label className="block mb-1 font-semibold">Recipient Name</label>
                        <input type="text" name="recipientName" value={formData.recipientName} onChange={handleChange} className="input input-bordered w-full" required />
                    </div>

                    {/* Recipient District & Upazila */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-semibold">District</label>
                            <select name="recipientDistrict" value={formData.recipientDistrict} onChange={handleChange} className="select select-bordered w-full" required>
                                <option value="">Select District</option>
                                {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold">Upazila</label>
                            <select name="recipientUpazila" value={formData.recipientUpazila} onChange={handleChange} className="select select-bordered w-full" required disabled={!formData.recipientDistrict}>
                                <option value="">Select Upazila</option>
                                {upazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Hospital & Address */}
                    <div>
                        <label className="block mb-1 font-semibold">Hospital Name</label>
                        <input type="text" name="hospitalName" value={formData.hospitalName} onChange={handleChange} className="input input-bordered w-full" required />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Full Address</label>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} className="input input-bordered w-full" required />
                    </div>

                    {/* Blood Group */}
                    <div>
                        <label className="block mb-1 font-semibold">Blood Group</label>
                        <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="select select-bordered w-full" required>
                            <option value="">Select Blood Group</option>
                            {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                        </select>
                    </div>

                    {/* Donation Date & Time */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-semibold">Donation Date</label>
                            <input type="date" name="donationDate" value={formData.donationDate} onChange={handleChange} className="input input-bordered w-full" required />
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold">Donation Time</label>
                            <input type="time" name="donationTime" value={formData.donationTime} onChange={handleChange} className="input input-bordered w-full" required />
                        </div>
                    </div>

                    {/* Request Message */}
                    <div>
                        <label className="block mb-1 font-semibold">Request Message</label>
                        <textarea name="requestMessage" value={formData.requestMessage} onChange={handleChange} className="textarea textarea-bordered w-full" required></textarea>
                    </div>

                    {/* Submit */}
                    <button type="submit" className="btn btn-primary w-full" disabled={blocked ? true : false}>Request</button>
                </form>
            </div>
        </div>
    );
};

export default CreateDonationRequest;
