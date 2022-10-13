import { sortArrayBubbleMethod, sortArraySelectMethod, compareLower, compareGreater } from "./utils"

describe("Тестирование алгоритмов сортировки выбором и пузырьком", () => {

    function testA(testName, value, method, compare){
        it(`Корректно сортирует ${testName}`, () => {
                expect(method(value, compare)).toEqual(value.sort(compare))
        });
    }

    testA("пустой масив сортировкой выбором", [], sortArraySelectMethod, compareLower)
    testA("пустой масив сортировкой пузырьком", [], sortArrayBubbleMethod, compareLower)
    testA("массив из одного элемента сортировкой пузырьком", [1], sortArrayBubbleMethod, compareGreater)
    testA("массив из одного элемента сортировкой выбором", [22], sortArraySelectMethod, compareLower)
    testA("массив массив из нескольких элементов сортировкой пузырьком", [100,34,2330,0,-4], sortArrayBubbleMethod, compareGreater)
    testA("массив массив из нескольких элементов сортировкой выбором", [22, 20,2, 1, 1000, 293,0], sortArraySelectMethod, compareGreater)
})

