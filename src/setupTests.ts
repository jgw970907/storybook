// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import 'jest-styled-components';
import 'jest-canvas-mock';

const mockSecureStorage = {
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// react-secure-storage 모의 처리
jest.mock('react-secure-storage', () => mockSecureStorage);
// 타임아웃 설정 (선택사항)
jest.setTimeout(10000);

// Testing Library 설정
configure({ testIdAttribute: 'data-testid' });

// 전역 모의(mock) 설정
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

// 콘솔 에러 억제 (선택사항)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
