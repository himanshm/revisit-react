# Libraries v/s Frameworks

A Library is just a collection of reusable code. The point of library usually is to reduce the need to write repetitive/complex things from scratch. Because its just a collection of reusable code, we are in the control of how/when it's used. There really aren't any boundaries that we're expected to stay within. It's main purpose is just to simplify the task that we were already going to be doing.

A Frameword is a predetermined architecture - it expects us to follow a specified pattern of development. We are expected to work within the boundaries that are set by the framework - there's a kind of a 'right' way and a 'wrong' way to use the framework itself.

"React is a library for web and native user interfaces" - having said that - React has been built out as a whole ecosystem these days to point where one of the most common ways to use react is to do it using a framework like Next.js

When React was first introduced, there was short amount of time when JSX syntax didn't exist at all. Intead, react exported a function that was called 'createElement'

# `React.createElement`

In React, `React.createElement` is the fundamental function that creates a React element (a lightweight object that describes what you want to render).

JSX (what we usually write) is just syntactic sugar for `React.createElement`.

Syntax:

```js
React.createElement(type, props, ...children);
```

type → tag name (`'div'`) or component (MyComponent)

props → attributes/props object (`{ className: "box" }`)

children → nested elements or text

Example:

```js
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
const reactElement = createElement('h1', null, 'Hello from React!');
console.log({ reactElement });
root.render(reactElement);
```

Same thing with JSX:

```jsx
const reactElement = <h1>Hello from React!</h1>;
console.log({ reactElement });
```

👉 So JSX is compiled into `React.createElement` calls under the hood.

if we `console.log` `reactElement`:

```js
{
    "reactElement": {
        "type": "h1",
        "key": null,
        "props": {
            "children": "Hello from React!"
        },
        "_owner": null,
        "_store": {}
    }
}
```

What `createElement` returns is an object that has some information about the DOM node that is going to get inserted by React into our actual DOM. This object is just a regular object in JavaScript.

# Why React?

## It's Composable!

This means that we have the tools available that allow us to easily create reusable and interchangeable "pieces of the web" that can be combined in various ways to create complex systems.

In React, composability means you can build small, reusable components and combine them to create more complex UIs—just like functions compose together in programming.

Example:

```jsx
function Button(label) {
  return <button>{label}</button>;
}

function Toolbar() {
  return (
    <div>
      <Button label="Save" />
      <Button label="Cancel" />
    </div>
  );
}

export default function App() {
  return <Toolbar />;
}


🔹 Here, `Button` is a small reusable component.
🔹 `Toolbar` composes multiple `Button`s together.
🔹 `App` composes `Toolbar` → building UI like Lego blocks.
```

## It's Declarative!

Declarative simply means that we can lean on the library to handle the manual, tedious tasks that we otherwise would have to worry about ourselves.

Declarative -> What should be done?

It's like the computer saying, "Just tell me what needs to happen, and I'll worry about how to do it."

Imperative -> How should it be done?

This is like the computer saying, "I need you to describe to me every step on how to do something, and I'll do it."

In React, declarative means you describe what the UI should look like for a given state, not how to update it step by step.
React takes care of updating the DOM when the state changes.

Example

✅ Declarative (React):

```jsx
function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

You just declare: “When `count` changes, show it in `<p>`.” React handles the DOM updates automatically.

❌ Imperative (plain JS):

```js
let count = 0;
const p = document.createElement('p');
p.textContent = `Count: ${count}`;
document.body.appendChild(p);

const button = document.createElement('button');
button.textContent = 'Increment';
button.onclick = () => {
  count++;
  p.textContent = `Count: ${count}`;
};
document.body.appendChild(button);
```

Here you explicitly instruct how to update the DOM each time.

👉 React’s declarative style makes UIs easier to read, reason about, and maintain.

You can only ever render a single JSX element at a time and that element can have as many children as needed. But there must be one parent element that encapsulates all of the other elements being rendered on a page.
