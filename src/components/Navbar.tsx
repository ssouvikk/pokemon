// components/Navbar.tsx
import Link from 'next/link';

interface NavbarProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-gray-50 dark:bg-gray-800 shadow-md">
            <div className="container mx-auto flex justify-between items-center p-4">
                <Link href="/" className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Pokémon Explorer
                </Link>
                <button
                    onClick={toggleDarkMode}
                    className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    {darkMode ? 'লাইট মোড' : 'ডার্ক মোড'}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
