export default function StatsSection() {
  const stats = [
    { label: "Total Donors", value: "1,200+" },
    { label: "Successful Donations", value: "3,400+" },
    { label: "Volunteers", value: "150+" },
    { label: "Funds Raised", value: "$25,000+" },
  ];
  return (
    <section className="pt-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-10 text-red-600">Our Impact</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-white shadow-md rounded-lg p-6">
              <p className="text-4xl font-bold text-red-600">{s.value}</p>
              <p className="text-gray-600">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
