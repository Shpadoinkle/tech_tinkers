import { useState } from "react";
import Results from "./Results";

import { gql, useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroller";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int) {
    characters(page: $page) {
      info {
        count
        pages
        next
      }
      results {
        id
        name
        image
        status
        type
      }
    }
  }
`;

const SearchParams = () => {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page },
  });
  const characters = data?.characters?.results || [];
  const next = data?.characters?.info?.next;

  return (
    <InfiniteScroll
      loadMore={() => {
        if (loading) {
          return;
        }
        setPage(page + 1);
      }}
      hasMore={!loading && next && page < 10}
      initialLoad
      threshold={100}
    >
      <Results cards={characters} />
    </InfiniteScroll>
  );
};

export default SearchParams;
