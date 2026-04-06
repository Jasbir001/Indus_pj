import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 flex justify-between h-14 items-center">
                <div className="flex items-center">
                    <Link to="/" className="text-2xl font-bold text-cyan-600">INDUS</Link>
                </div>
                <ul className="flex items-center space-x-6">
                    <li><Link to="/" className="text-gray-600 hover:text-cyan-600 text-sm font-semibold">Home</Link></li>
                    <li><Link to="/about" className="text-gray-600 hover:text-cyan-600 text-sm font-semibold">About</Link></li>
                    <li><Link to="/contact" className="text-gray-600 hover:text-cyan-600 text-sm font-semibold">Contact</Link></li>
                    <li><Link to="/services" className="text-gray-600 hover:text-cyan-600 text-sm font-semibold">Services</Link></li>
                    <li><Link to="/products" className="text-gray-600 hover:text-cyan-600 text-sm font-semibold">Products</Link></li>
                    <li><Link to="/cart" className="text-gray-600 hover:text-cyan-600 text-sm font-semibold">Cart</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;