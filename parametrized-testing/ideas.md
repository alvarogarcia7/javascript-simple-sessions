## Using a custom syntax

```javascript
describe('adding to a list', ()=>{
  newTestCase({description: 'to an empty list',
               input: [],
               parameter: 2,
               expected: [2]})
  newTestCase({description: 'to a non-empty list',
               input: [1],
               parameter: 2,
               expected: [1, 2]})

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
  const runs = [{description: 'to an empty list',
               input: [],
               parameter: 2,
               expected: [2]},
               {description: 'to a non-empty list',
               input: [1],
               parameter: 2,
               expected: [1, 2]}]

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
|flexible to use any `testCase` variable name (e.g., `testCase`, `tC`, `run`)||
||verbose|    
|using the real test syntax|
||duplicate the test runner in every case|
||test-related features mixed with business/domain tests|

## Using `it`, DAMP

```javascript
describe('adding to a list', ()=>{
  it('to an empty list', () => {
    const input= [];
    const parameter= 2;
    const expected= [2];
    const newArray = input.push(parameter);
    expect(newArray).to.deep.equal(expected);
  });

  it('to a non-empty list', () => {
    const input= [1];
    const parameter= 2;
    const expected= [1, 2];
    const newArray = input.push(parameter);
    expect(newArray).to.deep.equal(expected);
  });
});
```

## Using `it`, DRY

```javascript
describe('adding to a list', ()=>{
  it('to an empty list', () => {
    const input= [];
    const parameter= 2;
    const expected= [2];
    // use explaining variables
    pushingToMatches(input, parameter, expected);
  });

  it('to a non-empty list', () => {
    // not using explaining variables
    pushingToMatches([1], 2, [1, 2]);
  });

  function pushingToMatches(input, parameter, expected) {
    const newArray = input.push(parameter);
    expect(newArray).to.deep.equal(expected);
  }
});
```

## Using `it`, DRY+Fluent

```javascript
describe('adding to a list', ()=>{
  it('to an empty list', () => {
    const input= [];
    const parameter= 2;
    const expected= [2];
    // use explaining variables
    pushingTo(input, parameter).matches(expected);
  });

  it('to a non-empty list', () => {
    // not using explaining variables
    pushingToMatches([1], 2).matches([1, 2]);
  });

  function pushingToMatches(input, parameter) {
    const newArray = input.push(parameter);
    return {matches: expected => expect(newArray).to.deep.equal(expected)};
  }
});
```


## Sources

* https://rjzaworski.com/2013/01/parameterized-testing-in-javascript
* http://www.adequatelygood.com/Writing-Testable-JavaScript.html

