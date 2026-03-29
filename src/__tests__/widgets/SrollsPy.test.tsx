import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";

import { ScrollsPy } from "@/widgets";

const setupMockElements = () => {
    const sections = ["main", "aboute", "skills", "project", "sertefies"];
    sections.forEach((id) => {
        const el = document.createElement("div");
        el.id = id;
        el.getBoundingClientRect = jest.fn(() => ({
            top: 500,
            bottom: 1500,
            height: 1000,
            left: 0,
            right: 0,
            width: 0,
            x: 0,
            y: 0,
            toJSON: () => {},
        }));
        document.body.appendChild(el);
    });

    document.body.getBoundingClientRect = jest.fn(() => ({
        top: 0,
        bottom: 5000,
        height: 5000,
        left: 0,
        right: 0,
        width: 0,
        x: 0,
        y: 0,
        toJSON: () => {},
    }));
};

describe("ScrollsPy", () => {
    beforeEach(() => {
        document.body.innerHTML = "";
        setupMockElements();
        window.scrollTo = jest.fn();
    });

    it("Должен корректно вычислять позицию с учетом отступа 80px", () => {
        render(<ScrollsPy />);
        const link = screen.getByText("Мои навыки");

        fireEvent.click(link);

        expect(window.scrollTo).toHaveBeenCalledWith({
            top: 420,
            behavior: "smooth",
        });
    });

    it("Должен переключать активный класс при скролле", async () => {
        render(<ScrollsPy />);
        
        const aboutSection = document.getElementById("aboute");
        if (aboutSection) {
            aboutSection.getBoundingClientRect = jest.fn(() => ({
                top: 150,
                bottom: 1150,
                height: 1000,
                left: 0,
                right: 0,
                width: 0,
                x: 0,
                y: 0,
                toJSON: () => {},
            }));
        }

        await act(async () => {
            fireEvent.scroll(window);
        });

        const aboutLink = screen.getByText("Обо мне");
        expect(aboutLink).toHaveClass("active");
    });

    it("Должен удалять слушатель событий при размонтировании", () => {
        const removeSpy = jest.spyOn(window, "removeEventListener");
        const { unmount } = render(<ScrollsPy />);
        
        unmount();
        
        expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
    });
});