import { StringComponent } from "./string"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

describe("Тестирование алгоритма разворота строки", () => {
    function testA(testName, value, result) {
        it(`Корректно разворачивает строку  ${testName}`, async () => {
            jest.useFakeTimers();
            render(<BrowserRouter><StringComponent /></BrowserRouter>);
            const input = screen.getByRole("textbox");
            const button = screen.queryByText("Рассчитать");
            fireEvent.change(input, { target: { value: value } });
            fireEvent.click(button);
            jest.runAllTimers();
       
            await waitFor(() =>
                expect(screen.queryAllByTestId("letter").map(el => el.textContent).join("")).toBe(result)
            );
        })
    }
    testA("с чётным количеством символов", "1234", "4321");
    testA("с нечетным количеством символов", "123", "321");
    testA("с одним символом", "1", "1");
    testA("пустую строку", "", "");
})