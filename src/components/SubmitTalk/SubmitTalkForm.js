import React from 'react';
import $ from 'jquery';
import _ from 'underscore';

const SubmitTalkForm = React.createClass({
  getInitialState() {
    return {
      title: '',
      description: '',
      tag: '',
      tagsArray: []
    };
  },

  onSubmitTalk(e) {
    e.preventDefault();
    let submittedForm = e.target;
    let newTalk = {
      userId : document.getElementsByTagName('body')[0].getAttribute('data-name'),
      title: this.state.title,
      description: this.state.description,
      tags: this.state.tagsArray
    };

    if (newTalk.title == "" || newTalk.description == "") {
      return;
    } else {
      this.props.postTalk(newTalk);

      this.setState({
        title: '',
        description: '',
        tags: '',
        tagsArray: []
      });
    }
  },

  onTitleChange(e) {
    if (e.target.value.length <= 60) {
      this.setState({
        title: e.target.value
      });
    }
  },

  onDescriptionChange(e) {
    if (e.target.value.length <= 200) {
      this.setState({
        description: e.target.value
      });
    }
  },

  onTagsKeyDown(e) {
    if (this.state.tagsArray.length >= 5) {
      return
    }
    if (e.keyCode === 13 || e.keyCode === 9) {
      e.preventDefault();
      if (this.state.tag !== "" && this.state.tag !== ",") {
        const newTagsArray = this.state.tagsArray.slice()
        newTagsArray.push(this.state.tag)
        this.setState({
          tag: "",
          tagsArray: newTagsArray
        })
      }
    }
  },

  onTagsChange(e) {
    if (e.target.value !== "," && e.target.value.length <= 20) {
      this.setState({
        tag: e.target.value
      });
    }
  },

  onDeleteTag(e) {
    const tag = $(e.target).closest('li')
    this.state.tagsArray.splice(tag.data('index'), 1)
    this.setState({
      tagsArray: this.state.tagsArray
    })
  },

  _renderTags(tags) {
    return tags.map((tag, index) => {
      return (
        <li key={index} data-index={index}><i className="material-icons" onClick={this.onDeleteTag}>close </i>{`#${tag}`}</li>
      );
    });
  },

  isEnabled() {
    if (this.props.talksByUser.length >= 5) {
      return '';
    } else {
      if (this.state.title && this.state.description) {
        return 'enabled';
      } else {
        return '';
      }
    }
  },

  render() {
    let userId = document.getElementsByTagName('body')[0].getAttribute('data-name');
    let talksByUser = _.reduce(this.props.talks, (memo, talk) => {
      if (talk.userId == userId) return ++memo
    }, 0);

    return (
      <div id="submit-talk-form" className={talksByUser > 2 ? "disabled" : ""}>
        <h3>Submit a Talk</h3>
        <form onSubmit={this.onSubmitTalk}>
          <div className="form-title">
            <input type="text" name="title" placeholder="Title" onChange={this.onTitleChange} value={this.state.title}/>
            <span>{60 - this.state.title.length}</span>
          </div>
          <div className="form-desc">
            <input type="text" name="description" placeholder="Description" onChange={this.onDescriptionChange} value={this.state.description} />
            <span>{200 - this.state.description.length}</span>
          </div>
          <div className="form-tags">
            <input className={`tags-input${(this.state.tagsArray.length < 5) ? ' enabled' : '' }`} type="text" name="tags" placeholder="Tags (5 max)" onKeyDown={this.onTagsKeyDown} onChange={this.onTagsChange}
            value={this.state.tag}/>
            <span>{20 - this.state.tag.length}</span>
            <span className="submit-instruction">Press Enter or Tab to Submit</span>
          </div>
          <input className={`app-button ${this.isEnabled()}`} type="submit" value="Submit" />
          <ul className="submit-tags">
            {this._renderTags(this.state.tagsArray)}
          </ul>
        </form>
      </div>
    )
  }
});

export default SubmitTalkForm;
