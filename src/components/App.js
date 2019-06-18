import React, {Component} from 'react';
import Home from './Home';
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import '../css/index.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div id='main-div' className="container-fluid">
        <Home />
      </div>
    );
  }


}

const mapStateToProps = (state) => {
  return {
    searchInputText: state.searchText,
    searchResult: state.artistsSearchResult
  }
}

export default connect(mapStateToProps, null)(App);