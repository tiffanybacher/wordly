import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchWord } from '../../apiCalls/fetchWord';
import * as actions from '../../actions';
import WordResult from '../WordResult/WordResult';

export class Header extends Component {
  state = {
    searchShown: false,
    searchQuery: '',
    resultShown: false,
    currentResult: null
  }

  toggleSearch = () => {
    this.setState({
      searchShown: !this.state.searchShown,
      searchQuery: '',
      resultShown: !this.state.resultShown,
      currentResult: null
    });
  }

  updateSearchQuery = (e) => {
    const { value } = e.target;

    this.setState({
      searchQuery: value
    });
  }

  submitSearch = (e) => {
   e.preventDefault();

   this.props.clearError();

   this.props.fetchWord(this.state.searchQuery)
    .then(data => this.setState({
      currentResult: data,
      resultShown: true
    }));
  }

  handleClear = () => {
    this.setState({
      searchQuery: '',
      currentResult: null
    });
  }

  renderSearch = () => {
    return this.state.searchShown 
      ? <div className="search-bar">
          <form className="search-form" onSubmit={this.submitSearch}>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search for a word..."
              value={this.state.searchQuery}
              onChange={this.updateSearchQuery} />
          </form>
          <button onClick={this.handleClear} className="clear-btn">
            <i className="fas fa-times"></i>
          </button>
        </div>
      : null;
  }

  renderResult = () => {
    let result;

    if (this.props.error) {
      result = <WordResult error={this.props.error} />
    } else if (this.state.currentResult && this.state.resultShown && this.state.searchShown) {
      result = <WordResult {...this.state.currentResult} />
    }

    return result;
  }

  render() {
    const tabindex = this.props.menuShown
      ? "-1"
      : "1"

    return (
      <div>
      <header className="Header">
        <div className="flex-container">
          <button 
            className="hamburger-icon" 
            onClick={this.props.toggleMenu}
            tabIndex={this.tabindex}>
            <i className="fas fa-bars"></i>
          </button>
          <Link to="/" tabIndex={tabindex}>
            <h1>Haikuit<i className="fas fa-feather-alt"></i></h1>
          </Link>
          <button 
            className="search-icon" 
            onClick={this.toggleSearch}
            tabIndex={this.tabindex}>
            <i className="fas fa-search"></i>
          </button>
        </div>
        {this.renderSearch()}
        {this.renderResult()}
      </header>
        
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  error: state.error
});

export const mapDispatchToProps = (dispatch) => ({
  fetchWord: (searchQuery) => dispatch(fetchWord(searchQuery)),
  clearError: () => dispatch(actions.clearError())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

Header.propTypes = {
  searchShown: PropTypes.bool,
  searchQuery: PropTypes.string,
  resultShown: PropTypes.bool,
  currentResult: PropTypes.object
}