// src/components/SortControl.jsx
import React from "react";

const SortControl = ({ sortOrder, setSortOrder }) => {
  return (
    <div className="flex items-center gap-2">
      <label className="font-semibold">Sort by Date:</label>
      <select
        className="select select-bordered"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="">None</option>
        <option value="asc">Oldest → Newest</option>
        <option value="desc">Newest → Oldest</option>
      </select>
    </div>
  );
};

export default SortControl;
