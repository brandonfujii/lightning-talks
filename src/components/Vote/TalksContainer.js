'use strict';

import React from 'react';
import TalksListContainer from './TalksListContainer';

const TalksContainer = React.createClass({
  render() {
    return (
      <div id="talk-container">
        <TalksListContainer {...this.props} />
      </div>
    );
  }
});

export default TalksContainer;
