import { useEffect, useState } from "react";

const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fn();
      setData(response);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, refetch };
};

export default useAppwrite;
