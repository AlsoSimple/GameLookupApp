import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <IoSearchOutline className={styles.icon} />
      <input
        type="text"
        placeholder="Search games..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={styles.input}
      />
    </form>
  );
};
