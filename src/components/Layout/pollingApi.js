import { useState, useEffect, useCallback } from "react";
import api from "../../../utils/api";

const usePollingData = (apiUrl, interval = 60000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(apiUrl);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);  

  useEffect(() => {
    fetchData(); 

    const intervalId = setInterval(fetchData, interval); 

    return () => {
      clearInterval(intervalId); 
    };
  }, [fetchData, interval]); 

  return { data, loading, error };
};

export default usePollingData;