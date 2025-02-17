// components/SearchBar.tsx
interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    return (
        <div className="mb-6">
            <input
                type="text"
                placeholder="Pokémon-এর নাম লিখুন..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                aria-label="Pokémon সার্চ বক্স"
            />
        </div>
    );
};

export default SearchBar;
