import { useState, useEffect } from "react";
const useFetch = (url, initialData) => {
  const [emailDetails, setEmailDetails] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setEmailDetails(data);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [url]);
  return { emailDetails, loading, error };
};
export default useFetch;
