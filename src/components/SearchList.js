import React from "react";
import PropTypes from "prop-types";
import SearchResult from "./SearchResult";

const SearchList = props => {
  console.log(props);
  const SearchList = props.resultList.map(result => {
    console.log(result);
    // need to pass owner link down to search result
    return (
      <SearchResult
        {...result}
        key={`result${result.id}`}
        addPlayDateCallback={props.addPlayDateCallback}
        isLoggedIn={props.isLoggedIn}
        currentUserObject={props.currentUserObject}
      />
    );
  });

  return <section className="container">{SearchList}</section>;
};

SearchList.propTypes = {
  resultList: PropTypes.array.isRequired
  //updateMoviesCallback: PropTypes.func
};

export default SearchList;
