import { useState, useEffect } from 'react';


interface FetchResult<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

function useFetch<T>(url: string): FetchResult<T> {

    const [data, setData] = useState<T | null>(null);

    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const post: T = await response.json();
            setData(post);
            setLoading(false);
        } catch (error) {
            setError(error as Error);
            setLoading(false);
        }
    };
    fetchPosts();
}, []);
    return { data, loading, error };
}

export default useFetch;