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

# Data Driven React

## JS inside JSX

In React, _JSX_ lets you write HTML-like syntax in JavaScript.
Inside JSX, you can embed _JavaScript expressions_ by wrapping them in _curly braces {}_.

✅ _Example 1: Basic JS inside JSX_

```jsx
function App() {
  const name = "Himanshu";
  return <h1>Hello, {name}!</h1>;
}
```

🔹 `{name}` is a JS variable embedded in JSX.

✅ _Example 2: Inline expressions_

```jsx
function App() {
  const x = 5,
    y = 10;
  return <p>Sum: {x + y}</p>;
}
```

🔹 `{x + y}` runs JavaScript inside JSX.

✅ _Example 3: Conditional rendering_

```jsx
function App() {
  const loggedIn = true;
  return (
    <div>{loggedIn ? <h2>Welcome back!</h2> : <h2>Please log in</h2>}</div>
  );
}
```

🔹 Ternary operator decides what JSX to show.

✅ _Example 4: Loops with .map()_

```jsx
function App() {
  const fruits = ["Apple", "Banana", "Mango"];
  return (
    <ul>
      {fruits.map((fruit) => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  );
}
```

🔹 `.map()` runs JavaScript inside JSX to generate a list.

👉 In short:

Use `{}` to run _JavaScript expressions_ inside JSX.

You cannot put full statements (like `if`, `for`) directly inside JSX, only expressions.

## Props

In React, _props (short for properties)_ are how you pass data from a _parent component_ to a _child component_.
They make components _reusable_ by allowing them to accept dynamic values.

💡 _What are props?_

Props in React are just _inputs to a component_.

Think of a component like a _function_.

Props are the _arguments_ you give to that function.

So:

We _send_ props from a _parent component_.

We _receive_ props in a _child component_.

💡 _Where do we send props from?_

From the _parent_, when we call (render) the child component.

```tsx
// Parent
export default function App() {
  return <Greeting name="Himanshu" age={22} />;
}
```

Here:

`name="Himanshu"` and `age={22}` are the props we send to the `Greeting` component.

💡 _Where and how do we receive or consume props?_

Inside the _child component_.
You receive them as a _parameter_ of the function.

```tsx
// Child
function Greeting({ name, age }: { name: string; age: number }) {
  return (
    <h2>
      Hello, {name}. You are {age} years old.
    </h2>
  );
}
```

Here:

`{ name, age }` are the props received from the parent.

They are just like variables passed into the component.

🔗 _Full Example (Parent → Child with props)_

```tsx
// Child Component
function Greeting({ name }: { name: string }) {
  return <h2>Hello, {name}!</h2>;
}

// Parent Component
export default function App() {
  return (
    <div>
      <Greeting name="Alice" />
      <Greeting name="Bob" />
    </div>
  );
}
```

👉 The parent `App` sends `name` as a prop.
👉 The child `Greeting` receives it and uses it inside JSX.

💡 _Special case: `props.children`_

Sometimes you don’t want to pass just data, but also _JSX itself_ as a prop.
React does this automatically through `children`.

```tsx
function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>;
}

export default function App() {
  return (
    <Card>
      <h3>This is inside the Card</h3>
      <p>Passed from parent as children</p>
    </Card>
  );
}
```

✅ Summary:

Props are like arguments to a component.

Sent from parent → received in child.

They make components reusable and dynamic.

👉 In short: _`props` let components talk to each other and make them dynamic + reusable_.

### Consuming Props in child component

💡 When we send multiple props

A parent component can send many props at once, just like giving multiple inputs to a function.

```tsx
// Parent
export default function App() {
  return <UserCard name="Alice" age={25} country="India" />;
}
```

Here we’re sending 3 props → `name`, `age`, `country`.

💡 How the child receives them

The child component receives all props as a _single object_.
That means inside the child, you have two main ways to use them:

✅ _1. Without destructuring (use props object directly)_

```tsx
function UserCard(props: { name: string; age: number; country: string }) {
  return (
    <div>
      <h3>{props.name}</h3>
      <p>Age: {props.age}</p>
      <p>Country: {props.country}</p>
    </div>
  );
}
```

Here, `props` is like a container object.
You always write `props.something` to access values.

✅ _2. With destructuring (modern & cleaner)_

```tsx
function UserCard({
  name,
  age,
  country,
}: {
  name: string;
  age: number;
  country: string;
}) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Age: {age}</p>
      <p>Country: {country}</p>
    </div>
  );
}
```

Here, we unpack values directly in the function’s parameter.
This is the most common way used in modern React.

✅ _3. Destructuring inside the function (alternative)_

```tsx
function UserCard(props: { name: string; age: number; country: string }) {
  const { name, age, country } = props; // destructuring here

  return (
    <div>
      <h3>{name}</h3>
      <p>Age: {age}</p>
      <p>Country: {country}</p>
    </div>
  );
}
```

This is useful when you want to first receive all props and then unpack them later.

💡 Can I pass a custom prop (e.g. `blahblahblah={true}`) to a native
DOM element? (e.g. `<div blahblahblah={true}>`) Why or why not?

No, because the JSX we use to describe native DOM elements will
be turned into REAL DOM elements by React. And real DOM elements
only have the properties/attributes specified in the HTML specification.
(Which doesn't include properties like `blahblahblah`)

### Non string props

Most people start thinking props are just strings (like `name="Alice"`), but actually, props can be any _JavaScript value_: numbers, booleans, arrays, objects, even functions or JSX itself.

Let’s go step by step 👇

💡 _1. Numbers_

You pass them inside `{}` (otherwise React treats them as strings).

```tsx
function AgeDisplay({ age }: { age: number }) {
  return <p>Age: {age}</p>;
}

export default function App() {
  return <AgeDisplay age={25} />; // ✅ number
}
```

If you wrote `age="25"`, it would be a string, not a number.

💡 _2. Booleans_

Useful for flags like `isActive`.

```tsx
function Button({ isActive }: { isActive: boolean }) {
  return <button>{isActive ? "Active" : "Inactive"}</button>;
}

export default function App() {
  return (
    <>
      <Button isActive={true} />
      <Button isActive={false} />
    </>
  );
}
```

Short form: writing just `isActive = true`.

```tsx
<Button isActive /> // same as isActive={true}
```

💡 _3. Arrays_

Send lists of values.

```tsx
function List({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function App() {
  return <List items={["Apple", "Banana", "Orange"]} />;
}
```

💡 _4. Objects_

Great for grouped data.

```tsx
type User = { name: string; age: number };

function UserCard({ user }: { user: User }) {
  return (
    <h3>
      {user.name} — {user.age}
    </h3>
  );
}

export default function App() {
  return <UserCard user={{ name: "Alice", age: 25 }} />;
}
```

💡 _5. Functions (callbacks)_

Often used for event handling.

```tsx
function Button({ onClick }: { onClick: () => void }) {
  return <button onClick={onClick}>Click Me</button>;
}

export default function App() {
  const sayHello = () => alert("Hello!");
  return <Button onClick={sayHello} />;
}
```

💡 _6. JSX as a prop_

You can even pass JSX itself.

```tsx
function Card({ content }: { content: React.ReactNode }) {
  return <div className="card">{content}</div>;
}

export default function App() {
  return <Card content={<h2>This is inside the card</h2>} />;
}
```

🔑 Handling non-string props:

Use curly braces `{}` when passing non-strings.

Use TypeScript types (number, boolean, string[], {}, () => void, ReactNode) to ensure correctness.

If they are optional → mark with ? and handle defaults/fallbacks.

### How react renders arrays

React can render arrays because arrays can be treated as a list of _React elements_.

Example:

```tsx
function App() {
  const fruits = ["Apple", "Banana", "Mango"];

  return (
    <ul>
      {fruits.map((fruit) => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  );
}
```

🔹 Here `fruits.map(...)` returns an _array of `<li>` elements_, and React knows how to render them one after another.
🔹 React basically loops through the array internally and renders each item in order.

💡 _Why React can’t render plain objects_

React doesn’t know how to display a raw object, because:

Rendering means producing _text, numbers, or React elements_ that go into the DOM.

A plain object (`{ name: "Alice" }`) is _not a valid React child_.

React would have no idea: Do you want the keys? The values? The whole JSON?

Example (this will break ❌):

```tsx
function App() {
  const user = { name: "Alice", age: 25 };
  return <div>{user}</div>; // ❌ Error: Objects are not valid as a React child
}
```

💡 How to render object data correctly

You need to convert the object into something React can render: a string or a number or JSX elements

1. _Render as JSON string_

```tsx
<div>{JSON.stringify(user)}</div>
```

👉 Output: `{"name":"Alice","age":25}`

2. _Render properties_

```tsx
<div>
  <p>Name: {user.name}</p>
  <p>Age: {user.age}</p>
</div>
```

3. Convert object into an array and render

```tsx
<ul>
  {Object.entries(user).map(([key, value]) => (
    <li key={key}>
      {key}: {value}
    </li>
  ))}
</ul>
```

🔑 Summary

✅ Arrays → React can render them because they can hold multiple React elements (like a list).

❌ Objects → React can’t render them directly, because they aren’t text or elements. You must convert them to something displayable.

### What is a "React child"?

In React, when you write:

```tsx
<div>{something}</div>
```

That `{something}` is called a _React child_.
A child must be one of these:

A string → `"Hello"`

A number → `123`

A React element → `<h1>Hi</h1>`

An array (of the above) →` ["One", "Two"]` or `[<p>One</p>, <p>Two</p>]`

`null` / `undefined` / `boolean` (they render nothing)

❌ Why a plain object doesn’t work

A plain object like `{ name: "Alice" }` is not renderable because:

React doesn’t know how to turn an object into DOM

Should it show the keys? (`name`)

The values? (`Alice`)

The whole JSON? (`{ name: "Alice" }`)
There’s no single obvious answer.

Objects are complex data structures
Unlike strings/numbers (which map directly to text nodes in HTML), an object is just a collection of key-value pairs. The browser has no direct way to display it.

React enforces clarity
If React allowed objects, everyone might expect different default behavior → messy, unpredictable UIs. So React throws an error instead.

#### Quiz

1. What does the `.map()` array method do?

   Returns a new array. Whatever gets returned from the callback
   function provided is placed at the same index in the new array.
   Usually we take the items from the original array and modify them
   in some way.

2. What do we usually use `.map()` for in React?

   Convert an array of raw data into an array of JSX elements
   that can be displayed on the page.

3. Critical thinking: why is using `.map()` better than just
   creating the components manually by typing them out?

   1. We often don't have the data ahead of time when we're building
      the app, so we simply can't manually type them out.
   2. It makes our code more "self-sustaining" - not requiring additional
      changes to the code whenever the data changes.

### Key prop

💡 What is the _key prop_?

The key prop is a special identifier you give to elements in a list.

It helps React keep track of which items have changed, been added, or removed when the UI re-renders.

✅ _Example without key (bad)_

```tsx
function App() {
  const fruits = ["Apple", "Banana", "Mango"];
  return (
    <ul>
      {fruits.map(fruit => (
        <li>{fruit}</li>   {/* ❌ No key */}
      ))}
    </ul>
  );
}
```

React will warn:

```zsh
Warning: Each child in a list should have a unique "key" prop
```

✅ Example with key (good)

```tsx
function App() {
const fruits = ["Apple", "Banana", "Mango"];
return (

<ul>
{fruits.map(fruit => (
<li key={fruit}>{fruit}</li> {/_ ✅ key added _/}
))}
</ul>
);
}
```

Now React knows how to uniquely identify each `<li>`.

💡 Why is `key` required?

React uses a virtual DOM to compare the old UI with the new one.

Without keys → React just compares list items by their position.

With keys → React can compare items by their identity.

👉 Example:

```tsx
const fruits = ["Apple", "Banana"];
// Later it becomes:
const fruits = ["Orange", "Banana"];
```

Without keys → React sees "Orange" in index 0, assumes it replaced "Apple", re-renders both items.

With keys → React sees "Banana" still exists (same key), only adds "Orange". Much more efficient ✅.

💡 Rules for keys

_Keys must be unique among siblings_

```tsx
<li key={id}>{name}</li>
```

(Not necessarily globally unique across the whole app.)

_Never use index as a key (if list can change)_

```tsx
key = { index }; // ❌ leads to bugs if items are reordered
```

Use stable IDs or unique values instead.

_Keys don’t appear inside props_
The `key` is used only by React internally, you can’t access it in `props`.

🔑 Summary

`key` = unique identifier for list items.

Helps React update UI efficiently instead of re-rendering everything.

Always use something stable and unique (like an ID).

Avoid using index unless the list never changes.
