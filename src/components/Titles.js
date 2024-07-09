import React from 'react';

export default function Titles({titleName, collections, handleChangingTitle}) {
  return (
    <div className="work-names">
        {/* foldername */}
        {Object.entries(collections).map(([foldername, item]) => (
        <span
            key={foldername}
            className={`name-item ${titleName === foldername ? 'selected' : ''}`}
            onClick={() => handleChangingTitle(foldername)}
        >
            {`Untitled (${foldername})`}
        </span>
        ))}
    </div>
  )
}
