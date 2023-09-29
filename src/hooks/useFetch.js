import { useState, useEffect } from 'react'

// 4 - Custom hook
export const useFetch = (url) => {
  const [data, setData] = useState(null);

  // 5 d-Refactoring the POST
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);

  // 6 - Loading
  const [loading, setLoading] = useState(false);

  // 7 - Handling errors
  const [error, setError] = useState(null)

  const httpConfig = function (data, method) {
    if (method === "POST") {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // changing my method
      setMethod(method);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // 6 - Loading
      setLoading(true);

      try {
        const response = await fetch(url);

        const json = await response.json();

        setData(json);
      } catch (error) {
        console.log(error.message);

        setError(":( OOPS! - There was an error when loading data.", error);
      }

      // 6 - Loading
      setLoading(false);
    };

    fetchData();
  }, [url, callFetch]);

  // 5 - Refactoring the Post - new Post
  useEffect(() => {
    const httpRequest = async () => {
      if (method === "POST") {
        let fetchOptions = [url, config];

        const response = await fetch(...fetchOptions);

        const json = await response.json();
        setCallFetch(json);
      }
    };

    httpRequest();
  }, [config, method, url]);

  // 6 - Loading
  return { data, httpConfig, loading, error };
}