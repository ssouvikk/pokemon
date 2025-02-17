// components/Navbar.tsx
import Link from 'next/link';
import { Moon, Sun } from 'lucide-react';

interface NavbarProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 shadow-md">
            <div className="container mx-auto flex justify-between items-center p-4">
                <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Pokémon Explorer
                </Link>
                <button
                    onClick={toggleDarkMode}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                    {darkMode ? <Sun size={18} /> : <Moon size={18} />} {darkMode ? 'লাইট মোড' : 'ডার্ক মোড'}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;