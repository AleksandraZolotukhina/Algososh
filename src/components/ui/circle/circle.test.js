import { render, screen } from "@testing-library/react"
import { Circle } from "./circle"
import { ElementStates } from "../../../types/element-states";

describe("Отрисовка Circle", () => {
    it("Отрисовка без буквы", () => {
        const circle = render(<Circle />);
        expect(circle).toMatchSnapshot();
    })
    it("Отрисовка с буквами", () => {
        const circle = render(<Circle letter={"123"} />);
        expect(circle).toMatchSnapshot();
    })
    it("Отрисовка с head", () => {
        const circle = render(<Circle head={"head"} />);
        expect(circle).toMatchSnapshot();
    })
    it("Отрисовка с react-элементом в head", () => {
        const circle = render(<Circle head={<div></div>} />);
        expect(circle).toMatchSnapshot();
    })
    it("Отрисовка с tail", () => {
        const circle = render(<Circle tail={"tail"} />);
        expect(circle).toMatchSnapshot();
    })
    it("Отрисовка с react-элементом в tail", () => {
        const circle = render(<Circle tail={<div></div>} />);
        expect(circle).toMatchSnapshot();
    })
    it("Отрисовка с index", () => {
        const circle = render(<Circle index={0} />);
        expect(circle).toMatchSnapshot();
    })
    it("Отрисовка с пропсом isSmall ===  true", () => {
        const circle = render(<Circle isSmall={true} />);
        expect(circle).toMatchSnapshot();
    })
    it("Отрисовка в состоянии default", () => {
        const circle = render(<Circle state={ElementStates.Default} />);
        expect(circle).toMatchSnapshot();
    })
    it("Отрисовка в состоянии changing", () => {
        const circle = render(<Circle state={ElementStates.Changing} />);
        expect(circle).toMatchSnapshot();
    })
    it("Отрисовка в состоянии modified", () => {
        const circle = render(<Circle state={ElementStates.Modified} />);
        expect(circle).toMatchSnapshot();
    })
})