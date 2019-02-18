# JavaScript Text Transform Plugin

![Author](https://img.shields.io/badge/Author-Timo_Fischer-red.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/Version-1.0.0-green.svg)

## Getting Started
1. download text-transform.js from repository
2. include this file to your project
3. make sure your HTML-syntax looks like this
````html
<p id="to_replace" tt-text="JavaScript to encode and decode text" tt-chars="0011 "></p>
````
4. initialize text-transform with
````javascript
new Text_Transform('#to_replace');
````
5. text-transform gets triggered either if element is in view or after DOM was loaded

## How To Use
#### Option 1
Take a look at the example above.
- use `tt-text` in your html element and specify the text you want to encode.
- use `tt-chars` in your html element to specify the characters your text will be transformed to in random order.
- if no `tt-chars` is set, default will be used: `@!§$%&\/()=?+*#-_<>{}[]`

#### Option 2 with extra options
- define your html element
````html
<p id="to_replace"></p>
````
- set your JavaScript options
````javascript
new Text_Transform('#to_replace', {
    text: "Option 2 with extra options",
    chars: "0011 ",
    loop: true,
    encode_delay: 10000,
    decode_delay: 4000
});
````
##### Options:
| Option | Description |
|---|---|
| text | Text that will be decoded |
| chars | Characters your text will be transformed to in random order |
| loop | Run text transform in loop |
| encode_delay | if loop is `true` time to wait until text-transform will be executed again |
| decode_delay | time to wait until encoded text will be decoded again |
