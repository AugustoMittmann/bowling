const { result } = require ('./functions')

it('q', () => {
    expect(result([[1], [2]])).toEqual([3])
})