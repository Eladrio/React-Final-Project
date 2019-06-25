import React from 'react';
import '../css/SortTable.css'

function SortTable(props) {
  return (
    <span onClick={props.handleSortClick}>
      <i className="fas fa-sort">Sort</i>
    </span>
  );
}
export default SortTable;