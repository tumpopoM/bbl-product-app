import {useEffect, useState} from 'react';

export const usePosts = () => {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
      );

      const data = await response.json();

      const formattedData = data.slice(0, 10).map((item: any) => ({
        id: item.id.toString(),
        title: item.title,
        description: item.body,
      }));

      setList(formattedData);
    } catch (err) {
      console.log(err);
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return {
    list,
    setList,
    loading,
    error,
    fetchData,
  };
};
