const { result } = require ('./functions')

it('1 number', () => {
    expect(result([[1]])).toEqual([1])
})

it('2 numbers', () => {
    expect(result([[1, 2]])).toEqual([3])
})

it('3 numbers', () => {
    expect(result([[1, 2], [4]])).toEqual([3, 7])
})

it('4 numbers', () => {
    expect(result([[1, 2], [3, 4]])).toEqual([3, 10])
})

it('spare', () => {
    expect(result([[5, 5], [2, 3]])).toEqual([12, 17])
})

it('strike', () => {
    expect(result([[10], [10], [2, 2]])).toEqual([22, 36, 40])
})
