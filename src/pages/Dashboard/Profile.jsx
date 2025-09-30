import React, { useState, useEffect, use } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthProvider';
import Swal from 'sweetalert2';
import Loading from '../../components/Loading';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: '',
    bloodGroup: '',
    district: '',
    upazila: '',
  });
  const [editable, setEditable] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [upazilasData, setUpazilasData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, updateUser } = use(AuthContext)

  useEffect(() => {
    // Fetch user data from backend
    axios.get(`https://red-connect-backend.vercel.app/api/users?email=${user.email}`, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${user.accessToken}`
      }
    }).then((res) => {
      setFormData(res.data);
      setLoading(false);
    }, []);

    // Load districts and upazilas JSON
    import('../../data/districts.json').then((data) => setDistricts(data.default));
    import('../../data/upazila.json').then((data) => setUpazilasData(data.default));
  }, []);

  // Update upazilas based on selected district
  useEffect(() => {
    if (formData.district) {
      const selectedDistrict = districts.find((d) => d.name === formData.district);
      const filtered = upazilasData.filter((u) => u.district_id == selectedDistrict?.id);
      setUpazilas(filtered);
    } else {
      setUpazilas([]);
    }
  }, [formData.district, districts, upazilasData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      updateUser({
        displayName: formData.name
      }).then(() => {
      }).catch((error) => {
        setLoading(false)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong"
        });
      })

      const res = await axios.put(`https://red-connect-backend.vercel.app/api/users?email=${user.email}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${user.accessToken}`
        }
      });
      // update user info
      if (res.status === 200) {
        setEditable(false);
        setFormData(res.data.user);
        setLoading(false);
        Swal.fire({
          title: "Good job!",
          text: "Updated Successfully!",
          icon: "success"
        });
      }


    } catch (err) {
      console.error(err);
      alert('Error updating profile');
      setLoading(false);
    }
  };

  if (loading) return <Loading></Loading>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-red-600">My Profile</h2>
        {!editable ? (
          <button
            onClick={() => setEditable(true)}
            className="btn btn-sm btn-outline btn-red"
          >
            Edit
          </button>
        ) : (
          <button onClick={handleSave} className="btn btn-sm btn-primary">
            Save
          </button>
        )}
      </div>

      {/* Avatar */}
      <div className="flex justify-center mb-6">
        <img
          src={formData.avatar || '/default-avatar.png'}
          alt="avatar"
          className="w-24 h-24 rounded-full border-2 border-red-600"
        />
      </div>

      <form className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!editable}
            className={`input input-bordered w-full ${!editable ? 'bg-gray-100' : ''}`}
          />
        </div>

        {/* Email (not editable) */}
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="block mb-1 font-semibold">Blood Group</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            disabled={!editable}
            className={`select select-bordered w-full ${!editable ? 'bg-gray-100' : ''}`}
          >
            <option value="">Select Blood Group</option>
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
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
            disabled={!editable}
            className={`select select-bordered w-full ${!editable ? 'bg-gray-100' : ''}`}
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.name}>
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
            disabled={!editable || !formData.district}
            className={`select select-bordered w-full ${!editable ? 'bg-gray-100' : ''}`}
          >
            <option value="">Select Upazila</option>
            {upazilas.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default Profile;
