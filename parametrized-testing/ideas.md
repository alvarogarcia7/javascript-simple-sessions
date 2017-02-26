# Comparing options for parametrized testing in javascript

Note: the example used below (adding to an array) is simple enough to be understood by everybody, without having to explain the domain. The real tests can have a more complicated environment or domain. This is just an example.

In this session, we explore how to use parametrized tests ([example in java][example-java], [example in c#][example-csharp])

The tests are written using `mocha` syntax: `describe`, `it`. Using `chai` for expectations: `assert`.

## Using a custom syntax

This is just an example of some possible syntax, not using any (currently) existing framework.

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
    testCase.input.push(testCase.parameter)
    expect(testCase.input).to.deep.equal(testCase.expected)
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
      testCase.input.push(testCase.parameter)
      expect(testCase.input).to.deep.equal(testCase.expected)
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
    input.push(parameter);
    expect(input).to.deep.equal(expected);
  });

  it('to a non-empty list', () => {
    const input= [1];
    const parameter= 2;
    const expected= [1, 2];
    input.push(parameter);
    expect(input).to.deep.equal(expected);
  });
});
```

|Pros|Cons|
|----|----|
||one test per case|
|the test is self-contained (DAMP)||


## Using `it`, DRY

```javascript
describe('adding to a list', ()=>{
  it('to an empty list', () => {
    const input= [];
    const parameter= 2;
    const expected= [2];
    // use explaining variables
    pushingToMatches(parameter, input, expected);
  });

  it('to a non-empty list', () => {
    // not using explaining variables
    pushingToMatches(2, [1], [1, 2]);
  });

  function pushingToMatches(parameter, input, expected) {
    input.push(parameter);
    expect(input).to.deep.equal(expected);
  }
});
```

|Pros|Cons|
|----|----|
|no repeated code||
||the testing method `pushingToMatches` requires access to all test inputs and outputs|
||the testing method `pushingToMatches` breaks the SRP: act and assert| 

## Using `it`, DRY+Fluent

```javascript
describe('adding to a list', ()=>{
  it('to an empty list', () => {
    const input= [];
    const parameter= 2;
    const expected= [2];
    // use explaining variables
    pushingTo(parameter, input).matches(expected);
  });

  it('to a non-empty list', () => {
    // not using explaining variables
    pushingTo(2, [1]).matches([1, 2]);
  });

  function pushingTo(parameter, input) {
    input.push(parameter);
    return {matches: expected => expect(input).to.deep.equal(expected)};
  }
});
```

|Pros|Cons|
|----|----|
|no repeated code||
|readable||
||verbose, one test per case, when this could be expressed in some other way|
||the testing method `pushingTo` creates space for the difference in act and assert|


## Sources

* https://rjzaworski.com/2013/01/parameterized-testing-in-javascript
* http://www.adequatelygood.com/Writing-Testable-JavaScript.html
* Example in java: [here][example-java]
* Example in C#: [here][example-csharp]


[example-java]: https://github.com/junit-team/junit4/wiki/Parameterized-tests
[example-csharp]: https://jeremybytes.blogspot.co.uk/2014/10/parameterized-tests-with-nunit.html

