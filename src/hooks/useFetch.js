import { useState, useEffect } from 'react'

// 4 - Custom hook
export const useFetch = (url) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await fetch(url); 

        const json = await response.json()

        setData(json)
      } catch(error) {
        console.error("ERROR BRO!", error)
      }
    };

    fetchData();
  }, [url])

  return { data };
}