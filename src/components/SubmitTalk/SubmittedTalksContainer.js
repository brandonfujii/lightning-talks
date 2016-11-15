import React from 'react';
import TalksList from '../Vote/TalksList';

const SubmittedTalksContainer = React.createClass({
  render() {
    return (
      <div id="talk-container" className="submitted">
        <h3>Your Submitted Talks</h3>
        <TalksList arr={this.props.talksByUser} editable={true} {...this.props}/>
      </div>
    )
  }
});

export default SubmittedTalksContainer;
