import '@testing-library/jest-dom';

// Глобальный мок для Swiper
jest.mock('swiper/react', () => ({
  Swiper: ({ children }: any) => <div data-testid="swiper-mock">{children}</div>,
  SwiperSlide: ({ children }: any) => <div data-testid="swiper-slide-mock">{children}</div>,
}));

jest.mock('swiper/modules', () => ({
  Navigation: () => null,
  Pagination: () => null,
  Autoplay: () => null,
  Scrollbar: () => null,
}));

// Заглушки для CSS импортов, на которых падает Jest
jest.mock('swiper/css', () => ({}));
jest.mock('swiper/css/navigation', () => ({}));
jest.mock('swiper/css/pagination', () => ({}));
jest.mock('swiper/css/autoplay', () => ({}));