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


| Pros | Cons |
|------|-----|
|flexible||    
||verbose|    
||too close to the the real test syntax?|
||how to explain that the `it` will execute all test cases?|
||magic variable `testCase`: linting, editor complaining about it |


## Using an in-place executor

```javascript
describe('adding to a list', ()=>{
  var runs = [{description: 'to an empty list',
               input: [],
               parameter: 2,
               expected: [2]}]

  runs.forEach(testCase => {
    it(`${testCase.description}`, () => {
      const newArray = testCase.input.push(testCase.parameter)
      expect(newArray).to.deep.equal(testCase.expected)
    })
  }
})
```

| Pros | Cons |
|------|-----|
|flexible||    
||verbose|    

