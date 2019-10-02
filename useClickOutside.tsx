import { useEffect, useRef, RefObject } from 'react';

const useClickOutside = (onClick: Function): RefObject<HTMLDivElement> => {
  const node: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const handleClick = (e: MouseEvent): void => {
    const { current } = node;
    if (!current || current.contains(e.target as Node)) {
      return;
    }
    onClick();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return (): void => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return node;
};

export default useClickOutside;
