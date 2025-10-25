export default function HowItWorksSection() {
  const steps = [
    { icon: "🩸", title: "Register", desc: "Sign up and verify your donor profile." },
    { icon: "🔍", title: "Find or Request Blood", desc: "Search donors by blood group or create a request." },
    { icon: "🤝", title: "Connect & Donate", desc: "Coordinate with volunteers and donate safely." },
  ];
  return (
    <section className="pt-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-10 text-red-600">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="p-6 bg-white shadow-lg rounded-lg">
              <div className="text-5xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
