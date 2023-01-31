import React, { useState } from 'react';

import { useGlobalContext } from '../context/AppContext';

const Search = () => {
    const [text, setText] = useState('');
    const { setSearchTerm } = useGlobalContext();

    const handleChange = (e) => {
        setText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (text) {
            setSearchTerm(text);
            setText('');
        }
    }

    return (
        <header className="search-container">
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Type favorite meal..."
                    value={text}
                    onChange={handleChange}
                />
                <button className="btn" type="submit">
                    Search
                </button>
                <button className="btn btn-hipster" type="button">
                    Surprise me!
                </button>
            </form>
        </header>
    );
}

export default Search;
