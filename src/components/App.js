import React, {Component} from 'react';
import Home from './Home';
import { connect } from "react-redux";
import { getToken } from "../actions/actions"
import '../css/index.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

/*   componentDidMount() {
    this.props.getToken();
  }
 */
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

const mapDispatchToProps = (dispatch) => {
  return {
    getToken: () => dispatch(getToken())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);