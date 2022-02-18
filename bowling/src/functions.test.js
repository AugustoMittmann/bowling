const { result } = require('./functions')

describe('test_1', () => {
  it('result_1', () => {
    expect(result([[1], [2]])).toEqual([[3]])
  })
})

