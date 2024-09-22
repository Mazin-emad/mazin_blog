import React, { createContext, useCallback } from "react";
import useFetchCol from "../Hooks/useFitchCol";

export const PostsContext = createContext();

const PostsProvider = ({ children }) => {
  const { data, loading, error, fetching, getData, getNextData, lastDoc } =
    useFetchCol("posts");

  const fetch = useCallback(async () => {
    if (!data) {
      await getData();
    }
  }, [data, getData]);

  const fetchNext = useCallback(async () => {
    if (data && lastDoc && !fetching && !loading) {
      await getNextData(lastDoc);
    }
  }, [data, getNextData, loading, fetching, lastDoc]);

  const refetch = getData;

  return (
    <PostsContext.Provider
      value={{
        fetch,
        refetch,
        fetchNext,
        data,
        error,
        loading,
        fetching,
        lastDoc,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export default PostsProvider;
