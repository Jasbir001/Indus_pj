import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LSpage = () => {
    const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
    const [role, setRole] = useState<'user' | 'admin'>('user');
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');

    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            if (mode === 'login') {
                const user = await login(formData.email, formData.password);
                if (user.role === 'admin') navigate('/admin/dashboard');
                else navigate('/user/dashboard');
            } else if (mode === 'register') {
                await register(formData.username, formData.email, formData.password, role);
                navigate('/user/dashboard');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Authentication failed');
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-50 py-12 px-4 min-h-screen">
            <div className="max-w-4xl w-full flex bg-white rounded-2xl shadow-lg overflow-hidden min-h-[600px]">
                {/* Left Side: Illustration */}
                <div className="hidden lg:flex lg:w-1/2 bg-cyan-600 p-12 flex-col justify-between text-white relative">
                    <div className="relative z-10">
                        <h2 className="text-4xl font-bold tracking-tight">INDUS</h2>
                        <p className="mt-4 text-lg font-medium">Empowering the next generation of digital excellence.</p>
                    </div>
                    <div className="relative z-10">
                        <img
                            src="file:///C:/Users/Jasbir/.gemini/antigravity/brain/a29b8a75-15fb-4826-bed9-cc0f3d94b539/auth_illustration_1775513427476.png"
                            alt="Indus Auth"
                            className="w-full max-w-xs mx-auto drop-shadow-xl"
                        />
                    </div>
                    <div className="relative z-10 text-sm opacity-80 font-semibold">
                        &copy; 2026 Indus Inc. All rights reserved.
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-8">
                        <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            {mode === 'login' ? 'Welcome Back' : mode === 'register' ? 'Join Us' : 'Reset Password'}
                        </h3>
                        {error && <p className="text-red-500 text-sm mt-3 font-bold bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {mode === 'register' && (
                            <>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Full Name</label>
                                    <input
                                        type="text" name="username" value={formData.username} onChange={handleChange} required
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:bg-white outline-none transition-all focus:ring-4 focus:ring-cyan-50"
                                    />
                                </div>
                                <div className="flex bg-gray-100 p-1 rounded-xl">
                                    <button
                                        type="button" onClick={() => setRole('user')}
                                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${role === 'user' ? 'bg-white shadow-sm text-cyan-600' : 'text-gray-500'}`}
                                    >USER</button>
                                    <button
                                        type="button" onClick={() => setRole('admin')}
                                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${role === 'admin' ? 'bg-white shadow-sm text-cyan-600' : 'text-gray-500'}`}
                                    >ADMIN</button>
                                </div>
                            </>
                        )}

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Email Address</label>
                            <input
                                type="email" name="email" value={formData.email} onChange={handleChange} required
                                placeholder="name@example.com"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:bg-white outline-none transition-all focus:ring-4 focus:ring-cyan-50"
                            />
                        </div>

                        {mode !== 'forgot' && (
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Password</label>
                                <input
                                    type="password" name="password" value={formData.password} onChange={handleChange} required
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:bg-white outline-none transition-all focus:ring-4 focus:ring-cyan-50"
                                />
                            </div>
                        )}

                        <button className="w-full py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-black rounded-xl shadow-lg shadow-cyan-100 transition-all transform active:scale-95 uppercase tracking-widest mt-4">
                            {mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Request Link'}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm font-bold text-gray-500">
                        {mode === 'login' ? "Don't have an account?" : mode === 'register' ? "Already a member?" : "Back to basics?"}
                        <button
                            type="button"
                            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                            className="ml-1.5 text-cyan-600 hover:text-cyan-800 transition-colors underline decoration-2 decoration-cyan-100"
                        >
                            {mode === 'login' ? 'Sign up' : 'Sign in'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LSpage;