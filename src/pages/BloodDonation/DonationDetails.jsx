import React, { use, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthProvider";
import Loading from "../../components/Loading";

const DonationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = use(AuthContext); // contains { displayName, email }
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [confirming, setConfirming] = useState(false);
    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/donation-requests/${id}`);
                if (res.status === 401) {
                    navigate("/login");
                    return;
                }
                const data = await res.json();
                setRequest(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchRequest();
    }, [id, navigate]);

    const handleConfirmDonation = async () => {
        setConfirming(true);
        try {
            const res = await fetch(`http://localhost:3000/api/donation-requests/${id}/confirm`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    donorName: user.displayName,
                    donorEmail: user.email,
                }),
            });
            if (!res.ok) throw new Error("Failed to confirm donation");
            const updated = await res.json();
            alert(updated.message);
            // refresh data to show updated status
            setRequest((prev) => ({
                ...prev,
                status: "inprogress",
                donorInfo: { name: user.displayName, email: user.email },
            }));
        } catch (err) {
            console.error(err);
            alert("Error confirming donation");
        } finally {
            setConfirming(false);
            navigate("/dashboard")
        }
    };

    if (loading) return <Loading />;
    if (!request) return <p className="text-center mt-10">Request not found</p>;

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4 text-red-600">
                Blood Donation Request Details
            </h1>
            <div className="space-y-2 border rounded-lg p-4 shadow">
                <p><span className="font-semibold">Requester:</span> {request.requesterName} ({request.requesterEmail})</p>
                <p><span className="font-semibold">Recipient:</span> {request.recipientName}</p>
                <p><span className="font-semibold">Location:</span> {request.recipientDistrict}, {request.recipientUpazila}</p>
                <p><span className="font-semibold">Hospital:</span> {request.hospitalName}</p>
                <p><span className="font-semibold">Address:</span> {request.address}</p>
                <p><span className="font-semibold">Blood Group:</span> {request.bloodGroup}</p>
                <p><span className="font-semibold">Date & Time:</span> {request.donationDate} at {request.donationTime}</p>
                <p><span className="font-semibold">Status:</span> {request.status}</p>
                {request.donorInfo && (
                    <p>
                        <span className="font-semibold">Donor Info:</span> {request.donorInfo.name} ({request.donorInfo.email})
                    </p>
                )}
                <p><span className="font-semibold">Message:</span> {request.requestMessage}</p>
            </div>

            {/* Donate Button (only if pending) */}
            {request.status === "pending" && (

                <button className="btn btn-primary w-full my-2" onClick={() => document.getElementById('my_modal_2').showModal()}>Donate</button>

            )}

            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h2 className="text-xl font-semibold mb-4">Confirm Donation</h2>
                    <div className="space-y-2">
                        <p>
                            <span className="font-semibold">Donor Name:</span> {user.displayName}
                        </p>
                        <p>
                            <span className="font-semibold">Donor Email:</span> {user.email}
                        </p>
                    </div>
                    <div className="flex justify-end mt-6 gap-4 items-center">
                        <div className="modal-action mt-0">
                            <form method="dialog">
                                {/* if there is a button, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                        <button
                            onClick={handleConfirmDonation}
                            className="btn btn-primary"
                            disabled={confirming}
                        >
                            {confirming ? "Processing..." : "Confirm"}
                        </button>
                    </div>
                </div>

            </dialog>
        </div>
    );
};

export default DonationDetails;
