import React from 'react';
import { Link } from 'react-router';

const Main = React.createClass({
  render() {
    const ACTIVE = {
      'backgroundColor': '#70c9c0',
      'color': '#f5f5f5'
    }

    return (
      <div className="container">
        <div className="dashboard-nav">
          <Link to='/vote' activeStyle={ACTIVE}>Vote on talks</Link>
          <Link to='/submit' activeStyle={ACTIVE}>Submit talks</Link>
        </div>
        { React.cloneElement(this.props.children, this.props) }
      </div>
    );
  }
});

export default Main;
