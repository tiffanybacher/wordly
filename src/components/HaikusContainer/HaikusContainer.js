import React, { Component } from 'react';
import { connect } from 'react-redux';
import Haiku from '../Haiku/Haiku';
import BackBtn from '../BackBtn/BackBtn';

export class HaikusContainer extends Component {
  goBack = () => {
    this.props.history.goBack();
  }

  renderHaikuCards = () => {
    let haikuCards;
    const { haikus } = this.props;

    if (haikus.length) {
      haikuCards = haikus.map(haiku => {
        return <Haiku {...haiku} />
      });
    } else {
      haikuCards = <Haiku />
    }

    return haikuCards;
  }

  render() {
    return (
      <section className="HaikusContainer">
        <div className="haikus-header">
          <BackBtn goBack={this.goBack} />
          <h2>YOUR HAIKUS</h2>
        </div>
        <Haiku />
        {this.renderHaikuCards()}
      </section>
    );
  }
}

export const mapStateToProps = (state) => ({
  haikus: state.haikus
}); 

export default connect(mapStateToProps)(HaikusContainer);