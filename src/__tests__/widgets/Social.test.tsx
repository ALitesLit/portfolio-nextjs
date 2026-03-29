import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Social } from "@/widgets";
import * as services from "../../service/service";

jest.mock("../../service/service", () => ({
    fetchSocialService: jest.fn(),
}));

const mockSocialData = [
    { id: 1, site: "https://github.com", photo: "/gh.png" },
    { id: 2, site: "https://t.me", photo: "/tg.png" },
];

describe("Social", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Должен загружать и отображать список социальных сетей", async () => {
        (services.fetchSocialService as jest.Mock).mockResolvedValue(mockSocialData);

        await act(async () => {
            render(<Social />);
        });

        const links = screen.getAllByRole("link");
        expect(links).toHaveLength(2);
        expect(links[0]).toHaveAttribute("href", "https://github.com");
        expect(links[1]).toHaveAttribute("href", "https://t.me");
    });

    it("Не должен ничего отрисовывать при пустом массиве данных", async () => {
        (services.fetchSocialService as jest.Mock).mockResolvedValue([]);

        const { container } = render(<Social />);
        
        await act(async () => {});

        const listItems = container.querySelectorAll("li");
        expect(listItems).toHaveLength(0);
    });

    it("Должен корректно формировать пути к изображениям", async () => {
        (services.fetchSocialService as jest.Mock).mockResolvedValue([mockSocialData[0]]);

        const { container } = render(<Social />);
        
        await act(async () => {});

        const li = container.querySelector("li");
        expect(li?.style.backgroundImage).toContain("/gh.png");
    });
});