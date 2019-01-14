import React from "react";
import PropTypes from "prop-types";
import SearchResult from "./SearchResult";
import Dog from "./Dog";

const SearchList = props => {
  console.log(props);
  const SearchList = props.resultList.map(result => {
    return (
      <SearchResult
        {...result}
        {...props}
        key={`result${result.id}`}
        addPlayDateCallback={props.addPlayDateCallback}
      />
    );
  });

  return <section>{SearchList};</section>;
};

SearchList.propTypes = {
  resultList: PropTypes.array.isRequired
  //updateMoviesCallback: PropTypes.func
};

export default SearchList;
