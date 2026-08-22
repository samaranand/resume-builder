import { describe, expect, it } from 'vitest';
import { elementExceedsA4 } from './useA4Overflow';

describe('A4 overflow detection', () => {
  it('reports when content exceeds the page client height', () => {
    const element = document.createElement('div');
    Object.defineProperty(element, 'scrollHeight', { configurable: true, value: 1200 });
    Object.defineProperty(element, 'clientHeight', { configurable: true, value: 1000 });

    expect(elementExceedsA4(element)).toBe(true);
  });

  it('allows a one-pixel measurement tolerance', () => {
    const element = document.createElement('div');
    Object.defineProperty(element, 'scrollHeight', { configurable: true, value: 1001 });
    Object.defineProperty(element, 'clientHeight', { configurable: true, value: 1000 });

    expect(elementExceedsA4(element)).toBe(false);
  });
});
