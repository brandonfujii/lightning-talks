'use strict';
import React from 'react';
import _ from 'underscore';
import Talk from './Talk';

const loadingIcon = ( <div id="loading-talks"><svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"/>
                          <path d="M0 0h24v24H0z" fill="none"/>
                      </svg></div> );

const TalksList = React.createClass({
  _renderTalks(talks) {
    if (!talks.length) {
      return (
        <div className="null-state">
          <img src={require('../../public/img/emoji/blackmoon.png')}/>
          <p>No talks yet!</p>
        </div>
      );
    } else {
      return talks.map((talk) => {
        return (
          <Talk key={talk._id}
                uuid={talk._id}
                title={talk.title}
                description={talk.description}
                tags={talk.tags}
                upvotes={talk.upvotes}
                editable={talk.editable}
                {...this.props} />
        );
      });
    }
  },

  render() {
    return (
      <div id="talk-list container">
        { this.props.isFetching ? loadingIcon :
          this._renderTalks(this.props.searchedTalks) }
      </div>
    );
  }
});

export default TalksList;
