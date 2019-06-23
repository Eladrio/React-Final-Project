import React from 'react';
import '../css/SearchBar.css'

/* Manages the presentation of the SearchBar passing the input
   to its parent component */
function SearchBar(props) {

  function handleSubmit(event) {
    props.handleChange(event.target.value);
  }

  /* If the key pressed when the input is focused is the Enter key
     fires the blur event on the input that calls handleSubmit */
  function handleEnterKeyPress(e) {
    if(e.which === 13){
      e.preventDefault();
      e.target.blur();
    }
    return false;
}

  const filterText = props.filterText;
  return (
    <form className="card p-2 border-0" id="search-card">
      <div class="mb-3">
        <div class="input-group">
          <div class="input-group-prepend">
            <button className="btn" type="button">
              <i className="fa fa-search"></i>
            </button>
          </div>
          <input
            type="search"
            id="search-input"
            className="form-control input-lg py-2 border mr-sm-2"
            placeholder="Search..."
            value={filterText}
            onBlur={handleSubmit}
            onKeyPress={handleEnterKeyPress}
          />
        </div>
      </div>
    </form>
  )
}
{/*     <div className="card-body">
      <form className="form-inline my-2 my-lg-0">
        <div className="row">
          <div className="col">
            <span className="input-group-append">
              <button className="btn btn-outline-secondary btn-primary border-left-0 border" type="button">
                <i className="fa fa-search"></i>
              </button>
            </span>
          </div>
          <div className="col-10">
            <input
              type="search"
              className="form-control py-2 rounded-40 border mr-sm-2"
              placeholder="Search..."
              value={filterText}
              onBlur={handleSubmit}
              onKeyPress={handleEnterKeyPress}
            />
          </div>
        </div>
    </form>
  </div> */}
export default SearchBar;