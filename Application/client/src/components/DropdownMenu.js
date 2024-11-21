import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { autoComplete } from '../services/sampleDataFunctions';

function DropdownMenu({ searchText, setSearchText }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value.length >= 3) {
      const results = await autoComplete(value);
      setFilteredData(results);
      setShowDropdown(results.length > 0);
    } else {
      setFilteredData([]);
      setShowDropdown(false);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
      setFilteredData([]);
    }, 200);
  };

  return (
    <div className="search-wrapper">
      <Form.Control
        type="text"
        placeholder="Search products..."
        className="search-input"
        value={searchText}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onFocus={() => setShowDropdown(filteredData.length > 0)}
      />
      {showDropdown && (
        <div className="dropdown-menu search-dropdown show">
          {filteredData.map((media, index) => (
            <Link
              key={index}
              to={'/media'}
              state={{ mediaType: media.Type, mediaTitle: media.Title }}
              className="dropdown-item"
            >
              <div>
                {media.Title}: <strong>{media.Type}</strong>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;