import React from 'react';
import './KeywordSelector.css';

const KeywordSelector = ({ selectedKeywords, handleKeywordSelection }) => {
  const allKeywords = ['Μητσοτάκης', 'Τσίπρας', 'Βαρουφάκης', 'Κουτσούμπας', 'Ανδρουλάκης','Κωνσταντοπούλου'];

  const handleClick = (keyword) => {
    const isSelected = selectedKeywords.includes(keyword);
    handleKeywordSelection(keyword, !isSelected);
  };

  return (
    <div>
      {allKeywords.map((keyword) => (
        <button
          key={keyword}
          onClick={() => handleClick(keyword)}
          className={`custom-button ${selectedKeywords.includes(keyword) ? 'active' : ''}`}
        >
          {keyword}
        </button>
      ))}
    </div>
  );
};

export default KeywordSelector;
