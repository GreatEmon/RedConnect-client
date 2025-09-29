import React, { useState, useEffect } from "react";
import axios from "axios";
import districtsData from "../../data/districts.json";
import upazilasData from "../../data/upazila.json";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const SearchPage = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [upazilasDataAll, setUpazilasDataAll] = useState([]);
  const [formData, setFormData] = useState({
    bloodGroup: "",
    district: "",
    upazila: "",
  });
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load district and upazila data
  useEffect(() => {
    setDistricts(districtsData);
    setUpazilasDataAll(upazilasData);
  }, []);

  // Update upazilas when district changes
  useEffect(() => {
    if (formData.district) {
      const selectedDistrict = districts.find(d => d.name === formData.district);
      const filteredUpazilas = upazilasDataAll.filter(
        u => u.district_id === selectedDistrict.id
      );
      setUpazilas(filteredUpazilas);
    } else {
      setUpazilas([]);
    }
  }, [formData.district]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/search-donors", {
        params: {
          bloodGroup: formData.bloodGroup,
          district: formData.district,
          upazila: formData.upazila,
        },
      });
      setDonors(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-gray-700">Search Donors</h2>

      {/* Search Form */}
      <form className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6" onSubmit={handleSearch}>
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
            {bloodGroups.map(bg => (
              <option key={bg} value={bg}>{bg}</option>
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
            {districts.map(d => (
              <option key={d.name} value={d.name}>{d.name}</option>
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
            {upazilas.map(u => (
              <option key={u.id} value={u.name}>{u.name}</option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button type="submit" className="btn btn-primary w-full">
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {/* Search Results */}
      <div className="mt-6">
        {donors.length === 0 && !loading && <p>No donors found. Please fill the search form and click Search.</p>}

        {donors.length > 0 && (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Blood Group</th>
                  <th>District</th>
                  <th>Upazila</th>
                </tr>
              </thead>
              <tbody>
                {donors.map((donor, index) => (
                  <tr key={donor._id}>
                    <th>{index + 1}</th>
                    <td>{donor.name}</td>
                    <td>{donor.email}</td>
                    <td>{donor.bloodGroup}</td>
                    <td>{donor.district}</td>
                    <td>{donor.upazila}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
