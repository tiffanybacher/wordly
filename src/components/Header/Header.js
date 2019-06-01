import React, { Component } from 'react';
import HamburgerIcon from '../HamburgerIcon/HamburgerIcon';
import SearchIcon from '../SearchIcon/SearchIcon';

class Header extends Component {
  state = {
    searchShown: false
  }

  toggleSearch = () => {
    this.setState({
      searchShown: !this.state.searchShown
    });
  }

  renderSearch = () => {
    return this.state.searchShown 
      ? <input 
          type="text" 
          className="search-input" 
          placeholder="Search for a word..." />
      : null
  }

  render() {
    return (
      <header className="Header">
        <div className="flex-container">
          <HamburgerIcon toggleMenu={this.props.toggleMenu} />
          <h1>Haikuit<i className="fas fa-feather-alt"></i></h1>
          <SearchIcon toggleSearch={this.toggleSearch} />
        </div>
        {this.renderSearch()}
      </header>
    );
  }
}

export default Header;