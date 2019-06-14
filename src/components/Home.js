import React, { Component } from 'react';
//import { connect } from "react-redux";
import SearchBar from './SearchBar';

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(input) {
    console.log(this.props);
    this.props.handleChange(input);
  }

  render() {
    return(
      <SearchBar handleChange={this.handleChange}/>
    );
  }
}

/* const mapStateToProps = (state) => {
  return {
    searchInputText: state.searchText
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //inputSearchText: (payload) => { dispatch({type: INPUT_SEARCH_TEXT, payload: payload}) }
  }
} */

export default Home;