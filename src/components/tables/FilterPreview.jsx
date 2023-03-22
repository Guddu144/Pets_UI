import React from 'react';

const FilterPreview = ({ filters }) => {
  const active = filters
    .map(group => {
      let value = group.value;
      if (group.filters) {
        value = group.filters
          .filter(f => f.active)
          .map(f => f.label)[0];
      }
      return [group.label, value];
    })
    .filter(g => Boolean(g[1]));

  if (active.length === 0) {
    return null;
  }

  return (
    <div className="text-sm flex mb-1">
      {active.map(([label, value]) => (
        <span key={label} className="space-x-1 inline-flex items-center px-2.5 py-1.5 rounded text-xs bg-gray-100 mr-2 mb-2">
          <span className="font-medium">{label}</span>
          <span>{value}</span>
        </span>
      ))}
    </div>
  );
};

export default FilterPreview;
