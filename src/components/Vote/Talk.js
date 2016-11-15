'use strict';
import React from 'react';
import _ from 'underscore';
import $ from 'jquery';

const Talk = React.createClass({
  getInitialState() {
    return {delete: false}
  },

  onUpvoteTalk(e) {
    const talkId = $(e.target).closest('.talk').data('talk')
    const userId = $(e.target).closest('.talk').data('user')
    this.props.upvoteTalk(talkId, userId);
  },

  onDeleteTalk(e) {
    const talkId = $(e.target).closest('.talk').data('talk')
    const userId = $(e.target).closest('.talk').data('user')
    this.props.deleteTalk(talkId, userId)
  },
  
  _renderTags(tags) {
    if (tags) {
      return tags.map((tag, index) => {
        return (
          <li key={index}>{`#${tag}`}</li>
        );
      });
    }
  },
  
  showDeleteConfirm() {
    this.setState({
      delete: true
    })
  },
  hideDeleteConfirm() {
    this.setState({
      delete: false
    })
  },

  render() {
    let userId = document.getElementsByTagName('body')[0].getAttribute('data-name')
    return (
      <div className={`talk row${this.props.editable ? ' editable' : ''}`} data-user={userId} data-talk={this.props.uuid}>
        <div className={`upvote-container col-xs-2 col-sm-1${ _.contains(this.props.upvotes, userId) ? ' active' : ''}`}>
          <span className="upvote-talk" onClick={this.onUpvoteTalk}><img src={require('../../public/img/emoji/thumbsup.png')}/></span>
          <span className="upvotes">{this.props.upvotes.length}</span>
        </div>
        <div className="talk-info col-xs-10 col-sm-11">
          <h3 className="talk-title">{this.props.title}</h3>
          <p className="talk-desc">{this.props.description}</p>
          <ul className="talk-tags">
            {this._renderTags(this.props.tags)}
          </ul>
          {this.props.editable &&
            <i className="material-icons talk-icon" onClick={this.showDeleteConfirm}>delete</i>
          }
        </div>
        {this.props.editable && this.state.delete &&
          <div className="talk-delete-confirm">
            <span>Are you sure you want to delete this talk? This can't be undone.</span>
            <a className="app-button delete-yes" onClick={this.onDeleteTalk}>Yes, I'm sure</a>
            <a className="app-button delete-no" onClick={this.hideDeleteConfirm}>Never mind</a>
          </div>
        }
      </div>
    );
  }
});

export default Talk;
