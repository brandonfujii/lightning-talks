'use strict';

import React from 'react';
import TalksContainer from './TalksContainer';

const Vote = React.createClass({
  componentWillMount() {
    this.props.fetchTalks();
  },

  render() {
    return (
      <div className="row">
        <TalksContainer {...this.props} />
      </div>
    );
  }
});

export default Vote;
