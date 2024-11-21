import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

function DropdownMenu({ searchText, setSearchText }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    setShowDropdown(value.length > 0);
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 200); // Small delay to allow clicks
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
        onFocus={() => setShowDropdown(searchText.length > 0)}
      />
      {showDropdown && (
        <div className="dropdown-menu search-dropdown show">
          {/* Replace with dynamic suggestions */}
          <div className="dropdown-item">Suggested Result 1</div>
          <div className="dropdown-item">Suggested Result 2</div>
          <div className="dropdown-item">Suggested Result 3</div>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;