import {useEffect, useRef} from 'react';

/**
 * Dan Abramov's useInterval hook with some minnor adjustments
 * Source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
export function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef(() => {});

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => {
        savedCallback.current();
      }, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
