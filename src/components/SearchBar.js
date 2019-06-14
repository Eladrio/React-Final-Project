import React from 'react';

function SearchBar(props) {

  function handleSubmit(event) {
    props.handleChange(event.target.value);
  }

  function handleEnterKeyPress(e) {
    if(e.which === 13){
      e.preventDefault();
      e.target.blur();
    }
    return false;
}

  const filterText = props.filterText;
  return (
    <div className="input-group col-md-4">
      <form>
        <div className="row">
          <div className="col-auto">

        <span className="input-group-append">
          <button className="btn btn-outline-secondary border-left-0 border" type="button">
            <i className="fa fa-search"></i>
          </button>
        </span>
          </div>
          <div className="col">
          <input
          type="text"
          className="form-control py-2 border-right-0 border"
          placeholder="Search..."
          value={filterText}
          onBlur={handleSubmit}
          onKeyPress={handleEnterKeyPress}
        />
          </div>
        </div>
    </form>
  </div>
  );
}

export default SearchBar;