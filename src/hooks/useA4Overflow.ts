import { RefObject, useEffect, useState } from 'react';

export function elementExceedsA4(element: HTMLElement): boolean {
  return element.scrollHeight > element.clientHeight + 1;
}

export function useA4Overflow(ref: RefObject<HTMLElement | null>, dependency: unknown) {
  const [exceedsPage, setExceedsPage] = useState(false);

  useEffect(() => {
    const measure = () => {
      if (ref.current) {
        setExceedsPage(elementExceedsA4(ref.current));
      }
    };

    measure();
    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ref.current && resizeObserver) {
      resizeObserver.observe(ref.current);
    }
    window.addEventListener('resize', measure);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [dependency, ref]);

  return exceedsPage;
}
