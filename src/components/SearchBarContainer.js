import React, { Component } from 'react';
import SearchBar from './SearchBar';
import { SUBMIT_INPUT } from '../constants/actionTypes';
import { connect } from "react-redux";
import { Redirect } from 'react-router';

/* Handles the logic of the Search Bar */
class SearchBarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
    this.handleInput = this.handleInput.bind(this);
  }

  /* Submits the new input desencadenating the dispatch of the SUBMIT_INPUT
     action. And redirects to the Artists List */
  handleInput(input) {
    if (input) {
      this.props.submitInput(input);
      this.setState(() => {
        return {
          redirect: true
        }
      })
    }
  }

  render() {
    let toRender;
    if (this.state.redirect) {
      toRender = <div>
                  <Redirect push to='/artists' />
                  <SearchBar handleChange={this.handleInput} />
                </div>
    } else {
      toRender = <SearchBar  handleChange={this.handleInput} />
    }
    return (
      toRender
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitInput: (payload) => { dispatch({type: SUBMIT_INPUT, payload: payload}) }
  }
}

const mapStateToProps = (state) => {
  return {
    searchText: state.searchText,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarContainer);