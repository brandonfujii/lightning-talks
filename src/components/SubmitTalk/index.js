'use strict';

import React from 'react';
import SubmitTalkForm from './SubmitTalkForm'
import SubmittedTalksContainer from './SubmittedTalksContainer';
import _ from 'underscore';

const SubmitTalk = React.createClass({
  render() {
    let userId = document.getElementsByTagName('body')[0].getAttribute('data-name');
    let talksByUser = _.filter(this.props.talks, (talk) => {
      return talk.userId == userId;
    });

    return (
      <div className="row">
        <div className="col-md-12">
          { talksByUser.length >= 5 ? (<div>Sorry, you cannot submit more than 5 talks</div>) : null }
          <SubmitTalkForm {...this.props} talksByUser={talksByUser}/>
        </div>
        <div className="col-md-12">
          <SubmittedTalksContainer {...this.props} talksByUser={talksByUser} />
        </div>
      </div>
    );
  }
});

export default SubmitTalk;
