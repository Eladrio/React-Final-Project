import React, {Component} from 'react';
import Home from './Home';
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import { getArtists } from '../actions/actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(input) {
    this.props.getArtists(input);
  }

  render() {
    if (this.props.searchInputText) {
      return(
        <Redirect to={{
            pathname: '/artists'
          }}
        />
      );
    }
    return(
      <div className="container">
        <Home handleChange={this.handleChange}/>
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

const mapDispatchToProps = (dispatch) => {
  return {
    getArtists: (query) => dispatch(getArtists(query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);