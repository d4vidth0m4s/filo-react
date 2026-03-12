import '@testing-library/jest-dom';
import { vi } from 'vitest';

export const mockGeolocation = {
  getCurrentPosition: vi.fn(),
  watchPosition: vi.fn(),
};

Object.defineProperty(window.navigator, 'geolocation', {
  value: mockGeolocation,
  configurable: true,
});
