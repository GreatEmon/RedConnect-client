import { Link } from "react-router";

export default function FinalCtaSection() {
  return (
    <section className="py-20 bg-red-700 text-white text-center my-20 rounded-3xl">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4">Be Someone’s Lifeline</h2>
        <p className="text-lg mb-8">Your one donation can save up to three lives.</p>
        <Link className="btn btn-primary btn-lg" to="/register">Join as Donor</Link>
      </div>
    </section>
  );
}
