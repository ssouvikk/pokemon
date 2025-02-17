// components/Loader.tsx
const Loader: React.FC = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
            <div className="flex flex-col items-center">
                {/* Spinner */}
                <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-4"></div>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-100">লোড হচ্ছে...</p>
            </div>
        </div>
    );
};

export default Loader;
