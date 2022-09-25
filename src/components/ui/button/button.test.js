import { Button } from "./button";
import { fireEvent } from "@testing-library/react";
import { render, screen } from "@testing-library/react";

describe("Отрисовка кнопки", () => {
    it("Отрисовка кнопки с текстом", () => {
        render(<Button text={"Some text"} />);
        const button = screen.getByRole("button");
        expect(button).toMatchSnapshot();
    })
    it("Отрисовка кнопки без текста", () => {
        render(<Button />);
        const button = screen.getByRole("button");
        expect(button).toMatchSnapshot();
    })
    it("Отрисовка заблокированной кнопки", () => {
        render(<Button disabled={true} />);

        const button = screen.getByRole("button");
        expect(button).toMatchSnapshot();
    })
    it("Отрисовка кнопки с индикацией загрузки", () => {
        render(<Button isLoader={true} />);
        const button = screen.getByRole("button");
        expect(button).toMatchSnapshot();
    })
    it("Корректность вызова колбека при клике на кнопку", () => {
        const func = jest.fn();
        render(<Button onClick={func} />);
        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(func).toHaveBeenCalled();
    })
})
