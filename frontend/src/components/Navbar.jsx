import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Warehouse Locator</h1>

      <div className="space-x-6">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/warehouses" className="hover:text-blue-600">Warehouses</Link>
      </div>
    </nav>
  );
}