import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // 1. Сначала мапим стили
    '^.+\\.(css|sass|scss)$': 'identity-obj-proxy',
    // 2. Алиасы
    '^@/(.*)$': '<rootDir>/src/$1',
    // 3. Прямая заглушка для модулей swiper, если они все еще мешают
    '^swiper/css.*$': 'identity-obj-proxy',
  },
  // Позволяем Jest транспилировать Swiper из ESM в CommonJS
  transformIgnorePatterns: [
    '/node_modules/(?!(swiper|ssr-window|dom7)/)',
  ],
};

export default createJestConfig(config);