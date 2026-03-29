import { render, screen, act } from '@testing-library/react';
import { MainSection } from "@/features"; // проверьте путь к компоненту
import '@testing-library/jest-dom';

jest.mock('swiper/react', () => ({
  Swiper: ({ children }: any) => <div>{children}</div>,
  SwiperSlide: ({ children }: any) => <div>{children}</div>,
}));

jest.mock('swiper/modules', () => ({
  Navigation: (props: any) => null,
  Pagination: (props: any) => null,
  Autoplay: (props: any) => null,
}));

// Имитируем работу таймеров Jest
jest.useFakeTimers();

describe('MainSection Component', () => {
    it('должен корректно рендерить начальные элементы', () => {
        render(<MainSection />);
        
        // Проверяем наличие статичного текста
        expect(screen.getByText(/Доброго времени суток!/i)).toBeInTheDocument();
        // Проверяем кнопку
        expect(screen.getByRole('button', { name: /Давайте начнём\?/i })).toBeInTheDocument();
        // Проверяем фото
        const img = screen.getByAltText(/Александр - Frontend Разработчик/i);
        expect(img).toBeInTheDocument();
    });

    it('должен посимвольно печатать заголовок "Веб-разработчик"', () => {
        render(<MainSection />);
        
        const titleElement = screen.getByRole('heading', { level: 1 });
        const finalTitle = "Веб-разработчик";

        // В начале заголовок пустой
        expect(titleElement.textContent?.trim()).toBe("");

        // Проматываем время вперед для каждой буквы
        for (let i = 0; i < finalTitle.length; i++) {
            act(() => {
                jest.advanceTimersByTime(500);
            });
            // Проверяем, что подстрока совпадает
            expect(titleElement.textContent).toContain(finalTitle.slice(0, i + 1));
        }

        // В конце текст должен быть полным
        expect(titleElement.textContent).toContain(finalTitle);
    });

    it('должен вызывать scrollIntoView при клике на кнопку', () => {
        // Создаем мок для функции scrollIntoView, так как в JSDOM ее нет
        const scrollMock = jest.fn();
        
        // Создаем фиктивный элемент в документе, куда будем скроллить
        const aboutSection = document.createElement('div');
        aboutSection.id = 'aboute';
        aboutSection.scrollIntoView = scrollMock;
        document.body.appendChild(aboutSection);

        render(<MainSection />);
        
        const button = screen.getByRole('button', { name: /Давайте начнём\?/i });
        button.click();

        expect(scrollMock).toHaveBeenCalledWith({ behavior: 'smooth' });
        
        // Очистка документа после теста
        document.body.removeChild(aboutSection);
    });
});