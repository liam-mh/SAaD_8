import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import MediaFrontEndService from '../../services/storefront/mediaFrontEndService';

const mediaFrontEndService = new MediaFrontEndService();

function DropdownMenu({ searchText, setSearchText }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value.length >= 3) {
      const results = await mediaFrontEndService.autoComplete(value);
      setFilteredData(results.data);
      setShowDropdown(results.data.length > 0);
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