# myLibrary
This is a simple learning project created for [The Odin Project](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript/lessons/library).


## Learning objective
- Prototypes, inheritance, and constructors

## Other things I learned
- JSON stringify and parse.
    - The functions are really simple. One problem I had was with circular reference. I was able to eliminate the circular reference in my code, but if that would not have been possible I don't know what I'd have done.
    - Passing a strigified object and parsing it will give you your object back, but you lose prototype and all the methods and properties that go with it. That's a bummer. I had to re-recreate the object with the constructor, using the properties of the JSON object. It worked.
- Localstorage. It's actually super simple. It's limited to strings, but with JavaScript's built-in JSON handling, that's pretty easy to accomidate.

## License
Licensed under the MIT License.