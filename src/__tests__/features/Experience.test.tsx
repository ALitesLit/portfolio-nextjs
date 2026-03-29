import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Experience } from "@/features";
import * as services from "@/service";
import useMediaQuery from "@/shared/useMediaQuery";

jest.mock("@/service", () => ({
    fetchSkillsService: jest.fn(),
}));

jest.mock("@/shared/useMediaQuery");

jest.mock("@/widgets", () => ({
    SkillCard: ({ name, list }: { name: string; list: any[] }) => (
        <div data-testid="skill-card">
            <h3>{name}</h3>
            {list.map(item => <span key={item.id}>{item.name}</span>)}
        </div>
    ),
}));

const mockData = [
    {
        category: "Front-end",
        experienceList: [
            { id: 4, name: "React", importance: 1 },
            { id: 3, name: "Redux", importance: 2 },
        ]
    },
    {
        category: "Back-end",
        experienceList: [
            { id: 7, name: "Django", importance: 1 },
        ]
    }
];

describe("Experience", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Должен отрисовывать карточки навыков на основе полученных данных", async () => {
        (services.fetchSkillsService as jest.Mock).mockResolvedValue(mockData);
        (useMediaQuery as jest.Mock).mockReturnValue(false);

        await act(async () => {
            render(<Experience />);
        });

        expect(screen.getAllByTestId("skill-card")).toHaveLength(2);
        expect(screen.getByText("Front-end")).toBeInTheDocument();
        expect(screen.getByText("React")).toBeInTheDocument();
        expect(screen.getByText("Django")).toBeInTheDocument();
    });

    it("Должен показывать сообщение о пустом списке, если данные не пришли", async () => {
        (services.fetchSkillsService as jest.Mock).mockResolvedValue([]);
        (useMediaQuery as jest.Mock).mockReturnValue(false);

        await act(async () => {
            render(<Experience />);
        });

        expect(screen.getByText(/Проекты не найдены/i)).toBeInTheDocument();
    });

    it("Должен скрывать или показывать декоративное изображение в зависимости от размера экрана", async () => {
        (services.fetchSkillsService as jest.Mock).mockResolvedValue(mockData);
        
        (useMediaQuery as jest.Mock).mockReturnValue(true);
        const { rerender, container } = render(<Experience />);
        await act(async () => {});
        expect(container.querySelector('img[src="/svg/group1.svg"]')).not.toBeInTheDocument();

        (useMediaQuery as jest.Mock).mockReturnValue(false);
        rerender(<Experience />);
        await act(async () => {});
        expect(container.querySelector('img[src="/svg/group1.svg"]')).toBeInTheDocument();
    });
});