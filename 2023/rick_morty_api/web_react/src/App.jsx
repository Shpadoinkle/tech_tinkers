import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SavedCardsContext from "./SavedCardsContext";
import SearchParams from "./SearchParams";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { useState } from "react";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  const cart = useState(null);
  return (
    <div>
      <BrowserRouter>
        <SavedCardsContext.Provider value={cart}>
          <ApolloProvider client={client}>
            <header>
              <Link to="/" />
            </header>
            <Routes>
              {/* <Route path="/details/:id" element={<Details />} /> */}
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </ApolloProvider>
        </SavedCardsContext.Provider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
