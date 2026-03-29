import { render, screen, fireEvent, act } from '@testing-library/react';
import { Projects }from '@/features'; // проверьте путь
import * as services from '@/service';
import '@testing-library/jest-dom';

// Мокаем сервисы
jest.mock('@/service', () => ({
  fetchProjectsService: jest.fn(),
  fetchСategoryService: jest.fn(),
}));

// Мокаем дочерний компонент ProjectCard, чтобы не тестировать его внутренности здесь
jest.mock('@/widgets', () => ({
  ProjectCard: ({ card }: any) => <div data-testid="project-card">{card.name}</div>,
}));

const mockCategories = [
  { id: 1, name: 'Frontend' },
  { id: 2, name: 'Backend' },
];

const mockProjects = [
  { id: 101, name: 'Project 1', category_id: 1 },
  { id: 102, name: 'Project 2', category_id: 2 },
];

describe('Projects Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (services.fetchСategoryService as jest.Mock).mockResolvedValue(mockCategories);
    (services.fetchProjectsService as jest.Mock).mockResolvedValue(mockProjects);
  });

  it('должен загружать категории и проекты при монтировании', async () => {
    await act(async () => {
      render(<Projects />);
    });

    expect(services.fetchСategoryService).toHaveBeenCalledTimes(1);
    expect(services.fetchProjectsService).toHaveBeenCalledWith(false, 0); // loadMore: false, category: 0 (все)
    
    // Проверяем наличие кнопок категорий
    expect(await screen.findByText(/frontend/i)).toBeInTheDocument();
    expect(screen.getByText(/backend/i)).toBeInTheDocument();
    
    // Проверяем наличие карточек проектов
    const cards = screen.getAllByTestId('project-card');
    expect(cards).toHaveLength(2);
  });

  it('должен менять категорию и сбрасывать loadMore при клике на фильтр', async () => {
    await act(async () => {
      render(<Projects />);
    });

    const backendBtn = await screen.findByText(/backend/i);
    
    await act(async () => {
      fireEvent.click(backendBtn);
    });

    // Проверяем, что сервис проектов вызван повторно с ID категории 2
    expect(services.fetchProjectsService).toHaveBeenLastCalledWith(false, 2);
    expect(backendBtn).toHaveClass('active'); // Проверка активного класса (из CSS-модулей)
  });

  it('должен устанавливать loadMore в true при клике на "загрузить ещё"', async () => {
    await act(async () => {
      render(<Projects />);
    });

    const loadMoreBtn = screen.getByText(/загрузить ещё/i);
    
    await act(async () => {
      fireEvent.click(loadMoreBtn);
    });

    expect(services.fetchProjectsService).toHaveBeenLastCalledWith(true, 0);
    // Кнопка должна исчезнуть после клика (согласно логике !loadMore)
    expect(screen.queryByText(/загрузить ещё/i)).not.toBeInTheDocument();
  });

  it('должен отображать сообщение, если проекты не найдены', async () => {
    (services.fetchProjectsService as jest.Mock).mockResolvedValue([]);

    await act(async () => {
      render(<Projects />);
    });

    expect(screen.getByText(/Проекты не найдены/i)).toBeInTheDocument();
  });
});