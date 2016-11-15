'use strict';
import React, { PropTypes } from 'react';
import _ from 'underscore';
import TalksList from './TalksList';

/* A Component that expects an array of talks, renders the talks,
 * and allows a user to search and sort between talks
*/ 
const TalksListContainer = React.createClass({
  // Ensures that the proper data is being passed into the component
  propTypes: {
    talks: PropTypes.array.isRequired
  },

  // Initialize the state of the component
  getInitialState() {
    return {
      query: '',
      searchedTalks: [],
      currentSort: 'popular'
    }
  },

  // When new data is being passed into this component, sort the incoming talks based on the current sort
  componentWillReceiveProps(nextProps) {
    this.applySortByType(this.state.currentSort, nextProps.talks);
  },

  // Sort talks by most upvotes
  sortByPopular(talks) {
    return _.sortBy(talks, (talk) => {
      return -talk.upvotes.length;
    });
  },

  // Sort talks based on the date it was submitted
  sortByRecent(talks) {
    return _.sortBy(talks, (talk) => {
      return talk.dateSubmitted;
    }).reverse();
  },

  // Applies a sort on an array of talks and sets the talks
  applySort(fn, talks) {
    let sortedTalks = fn(talks.concat());

    // If the user hasn't searched anything, set the newly sorted talks to be rendered
    if (!this.state.query.length) {
      this.setState({
        searchedTalks: sortedTalks
      });
    } else { 
      // Otherwise, apply the search on the newly sorted talks
      this.searchTalks(this.state.query, sortedTalks);
    }
  },

  // Given a string attribute, decide which sort to apply
  applySortByType(sortType, talks) {
    switch (sortType) {
      case 'recent':
        this.applySort(this.sortByRecent, talks);
        break;
      case 'popular':
        this.applySort(this.sortByPopular, talks);
        break;
      default:
        break;
    }
  },

  // When a sort filter is clicked on the DOM, retrieve its sort type
  // and apply the appropriate sort
  onSelectSort(e) {
    const currentNode = e.target;
    const sortType = currentNode.getAttribute('data-sort');
    this.setState({ currentSort: sortType });
    this.applySortByType(sortType, this.props.talks);
  },

  // Given an input element, get its query value and search for talks based
  // on that query
  onSearch(query, talks) {
    this.setState({ query });
    this.searchTalks(query, this.props.talks);
  },

  // Given a query and a list of talks, filter the talks for talks that match
  // the query
  searchTalks(query, talks) {
     const pattern = new RegExp(query.toLowerCase(), 'g');
     let filteredTalks = talks.concat();
     if (this.state.currentSort == 'popular') {
      filteredTalks = this.sortByPopular(filteredTalks);
     } else if (this.state.currentSort == 'recent') {
      filteredTalks = this.sortByRecent(filteredTalks);
     }
     let filteredSearches = _.filter(filteredTalks, (talk) => {
       const searchQuery = talk.title;
       return searchQuery.toLowerCase().match(pattern);
     });

     this.setState({
       searchedTalks: filteredSearches
     });
  },

  // Render talks in HTML
  render() {
    let searchedTalks = !this.state.searchedTalks.length && !this.state.query.length ? this.props.talks : this.state.searchedTalks;
    return (
      <div>
        <div className="search-talks">
          <input type="text" placeholder="Search talks" value={this.state.query}
            onChange={ (event) => { this.onSearch(event.target.value) } } />
        </div>
        <div className="sort-filters">
          Sort by:
          <ul>
            <li data-sort="popular" onClick={this.onSelectSort}>Most Popular</li>
            <li data-sort="recent" onClick={this.onSelectSort}>Most Recent</li>
          </ul>
        </div>
        <TalksList searchedTalks={searchedTalks} {...this.props} />
      </div>
    )
  }
});


export default TalksListContainer;
