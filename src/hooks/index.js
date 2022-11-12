import React from "react";

export const useFetch = (cb, skip = false, args) => {
  const [response, setResponse] = React.useState(null);
  const [retry, setRetry] = React.useState(new Date());

  const retryCall = React.useCallback(() => {
    setRetry(new Date());
  }, [setRetry]);

  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const res = args? await cb(args): await cb();
        setResponse(res);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (!skip) {
      fetchData();
    }
  }, [skip, retry, cb, args]);

  return { response, error, loading, retryCall };
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());

  React.useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}