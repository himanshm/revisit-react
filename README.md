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
import { createElement } from "react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));
const reactElement = createElement("h1", null, "Hello from React!");
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
const p = document.createElement("p");
p.textContent = `Count: ${count}`;
document.body.appendChild(p);

const button = document.createElement("button");
button.textContent = "Increment";
button.onclick = () => {
  count++;
  p.textContent = `Count: ${count}`;
};
document.body.appendChild(button);
```

Here you explicitly instruct how to update the DOM each time.

👉 React’s declarative style makes UIs easier to read, reason about, and maintain.

You can only ever render a single JSX element at a time and that element can have as many children as needed. But there must be one parent element that encapsulates all of the other elements being rendered on a page.

1. Where does React put all of the elements I create in JSX when I
   call `root.render()`?

All the elements I render get put inside the div with the id of "root"
(or whatever other element I might select when calling createRoot)

2. What would show up in my console if I were to run this line of code:

```js
console.log(<h1>Hello world!</h1>);
```

An object! Unlike creating an HTML element in vanilla DOM JS, what
gets created from the JSX we have in our React code is a plain JS object
that React will use to fill in the view.

3. What does it mean for something to be "declarative" instead of "imperative"?

_Imperative_ means we need to give specific step-by-step instructions on how to
accomplish a task.
_Declarative_ means we can write our code to simply "describe" _what_ should show up
on the page and allow the rool (React, e.g.) to handle the details on _how_ to
put those things on the page.

# Custom Componenet

A custom component in React is just a JavaScript/TypeScript function (or class) that returns JSX. It lets you create reusable UI pieces.
The function name should always follow PascalCase.

Example:

```tsx
// Custom component
function Greeting({ name }: { name: string }) {
  return <h1>Hello, {name}!</h1>;
}

// Using the custom component
export default function App() {
  return (
    <div>
      <Greeting name="Himanshu" />
      <Greeting name="React" />
    </div>
  );
}
```

🔹 `Greeting` is a custom component.
🔹 Props (`name`) make it reusable with different data.

## React Fragments

In React, a Fragment lets you group multiple elements without adding an extra DOM node (like a `<div>`).

Normally, components must return a single element. Fragments solve this when you don’t want an unnecessary wrapper.

Example:

```jsx
import React from "react";

function List() {
  return (
    <>
      <li>Apple</li>
      <li>Banana</li>
      <li>Orange</li>
    </>
  );
}

export default function App() {
  return (
    <ul>
      <List />
    </ul>
  );
}
```

🔹 `<>...</>` is shorthand for `React.Fragment`.
🔹 Without a Fragment, you’d need to wrap `<li>`s in a `<div>`, which would break the `<ul>` structure.

👉 Use Fragments when you want multiple siblings but no extra DOM wrapper.

A _keyed fragment_ is just a React.Fragment with a key prop.
It’s useful when you return multiple fragments in a list (because React requires a key to identify each item).

Example:

```jsx
import React from "react";

const items = [
  { id: 1, fruit: "Apple", color: "Red" },
  { id: 2, fruit: "Banana", color: "Yellow" },
];

function App() {
  return (
    <ul>
      {items.map((item) => (
        <React.Fragment key={item.id}>
          <li>{item.fruit}</li>
          <li>{item.color}</li>
        </React.Fragment>
      ))}
    </ul>
  );
}

export default App;
```

🔹 Here each `React.Fragment` gets a `key` (`item.id`).
🔹 This avoids wrapping with extra `<div>` while still satisfying React’s list key requirement.

👉 Shorthand `<>...</>` cannot take a key, so in lists you must use `<React.Fragment key={...}>`.

## Parent/Child Components

In React, components can be organized into parent and child relationships:

Parent component → owns and renders one or more child components.

Child component → receives data/behavior from the parent via props.

Example:

```tsx
// Child Component
function Greeting({ name }: { name: string }) {
  return <h2>Hello, {name}!</h2>;
}

// Parent Component
function App() {
  return (
    <div>
      <h1>Welcome</h1>
      <Greeting name="Himanshu" /> {/* Child */}
      <Greeting name="React" /> {/* Child */}
    </div>
  );
}

export default App;
```

🔹 `App` is the parent.
🔹 `Greeting` is the child.
🔹 Parent passes `name` as `props`, and child displays it.

👉 This parent–child pattern is the core of React’s component hierarchy.

## Styling with Classes

In React, you style components with classes using the `className` attribute (not `class`, since `class` is a reserved keyword in JavaScript).

Example:

```jsx
import "./App.css"; // import CSS file

function Button() {
  return <button className="primary-btn">Click Me</button>;
}

export default function App() {
  return <Button />;
}
```

App.css

```css
.primary-btn {
  background-color: blue;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
}
```

🔹 `className="primary-btn"` applies the CSS class.
🔹 You can also use _dynamic classes_ with template literals:

```tsx
function Button({ active }: { active: boolean }) {
  return (
    <button className={active ? "active-btn" : "inactive-btn"}>Status</button>
  );
}
```

👉 So, styling with classes in React works just like in HTML, but always use `className`.

In _React (JSX)_, we use `className` instead of `class`. The reason is not just that `class` is a reserved word in JavaScript — JSX isn’t plain HTML, it’s _JavaScript that transpiles into_ `React.createElement` calls.

In JSX, every HTML attribute maps to a _JavaScript property_ of a DOM element.

In the DOM API, the property for CSS classes is `element.className`, not `element.class`.

So React aligns with the DOM property (`className`) instead of the HTML attribute (`class`).

Example:

```tsx
<div className="box"></div>
```

When compiled, React essentially does:

```js
React.createElement("div", { className: "box" });
```

And under the hood, that sets:

```js
div.className = "box";
```

👉 So:

`className` matches the DOM property name.

It avoids confusion with the reserved keyword `class`.
