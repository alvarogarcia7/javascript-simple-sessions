## Using a custom syntax

```javascript
describe('adding to a list', ()=>{
  newTestCase({description: 'to an empty list',
               input: [],
               parameter: 2,
               expected: [2]})

  it(`${testCase.description}`, () => {
    const newArray = testCase.input.push(testCase.parameter)
    expect(newArray).to.deep.equal(testCase.expected)
  })
})
```


