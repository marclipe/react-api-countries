import { useState, useEffect } from 'react'

// 4 - Custom hook
export const useFetch = (url) => {
  const [data, setData] = useState(null);

  // 5 d-Refactoring the POST
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false); 

  const httpConfig = function(data, method) {
    if(method === "POST") {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json"
        }, 
        body: JSON.stringify(data)
      })

      // changing my method
      setMethod(method)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        const json = await response.json();

        setData(json);
      } catch (error) {
        console.error("ERROR BRO!", error);
      }
    };

    fetchData();
  }, [url, callFetch]);

  // 5 - Refactoring the Post - new Post
  useEffect(() => {
    const httpRequest = async () => {
      if (method === "POST") {
        let fetchOptions = [url, config]; 

        const response = await fetch(...fetchOptions) 

        const json = await response.json()
        setCallFetch(json)
      }   
    };

    httpRequest()
  }, [config, method, url])

  return { data, httpConfig };
}