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

# React State

## Event Listeners

💡 _What is an Event Listener?_

An event is something the user does in the browser → like clicking a button, typing in an input, or hovering over an element.

An event listener is the function you attach to an element to "listen" for that event and run code when it happens.

In plain HTML/JS:

```html
<button onclick="alert('Clicked!')">Click Me</button>
```

In React, we handle this in a cleaner and modern way.

✅ _Event Listeners in React_

In React, event names are written in camelCase (`onClick`, `onChange`, `onSubmit`, etc.).

You pass a function (not a string of code) as the event handler.

_Example: Button Click_

```tsx
function App() {
  function handleClick() {
    alert("Button was clicked!");
  }

  return <button onClick={handleClick}>Click Me</button>;
}
```

Here:

`onClick` is the event listener.

`handleClick` is the function that runs when the button is clicked.

✅ _Passing Inline Functions_

Instead of defining separately, you can write inline:

```jsx
<button onClick={() => alert("Clicked!")}>Click Me</button>
```

✅ _Handling Input Events_

```tsx
function App() {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log("Value:", event.target.value);
  }

  return <input type="text" onChange={handleChange} />;
}
```

`event.target.value` gives the latest text typed in the input.

✅ `Common Events in React`

`onClick` → when element is clicked.

`onChange` → when input value changes.

`onSubmit` → when form is submitted.

`onMouseEnter`, `onMouseLeave` → hover events.

`onKeyDown`, `onKeyUp` → keyboard events.

💡 How React Events Are Different from Vanilla JS

_Synthetic Events_:

React wraps browser events into something called a `SyntheticEvent` (cross-browser friendly).

This means your event handlers work the same in Chrome, Firefox, Safari, etc.

_CamelCase naming_:

React uses `onClick`, not `onclick`.

React uses `onChange`, not `onchange`.

_Functions only_:

In React, you pass a function.

In plain HTML, you could pass a string (`onclick="doSomething()"`) but React doesn’t allow that.

🔑 Summary

Event listeners in React let your app react to user actions.

Written in camelCase and expect a function.

Events come wrapped as _SyntheticEvent_ (cross-browser safe).

Used for clicks, typing, submitting forms, mouse/keyboard actions, etc.

❓ _Why don’t we call event handlers in React?_

When you attach an event handler in React, like this:

```jsx
<button onClick={handleClick}>Click Me</button>
```

Notice you’re writing `handleClick` without parentheses.

If you wrote `onClick={handleClick()}`, that would immediately run the function when React renders the component (before the user even clicks).

But we don’t want it to run right away — we want it to run later, only when the event happens.

So instead, we pass the function reference (`handleClick`) to React.
React will then call it for us when the event actually occurs (like when the user clicks).

✅ _Example_

```tsx
function App() {
  function sayHello() {
    alert("Hello!");
  }

  return <button onClick={sayHello}>Say Hello</button>;
}
```

✅ `onClick={sayHello}` → React saves this function to call when the button is clicked.

❌ `onClick={sayHello()}` → React calls it immediately during rendering, so the alert pops up before you even touch the button.

## Props vs State

### Props

Props refer to the properties being passed _into a component_ in order for it to work correctly, similar to how a function receives parameters: "from above." A component receiving props is not allowed to modify those props (i.e. they are "immutable").

### State

State refers to the values that are _managed by the component_, similar to the variables declared inside a function. Any time you have changing values that should be saved/displayed, you'll likely be using state.

_View_ or rather the user interface, the actual page that you get to see as a user _is a function of the state of the component_.

render -> react runs your function and displays whatever gets returned. The function will only be run again if

1. if it receives new props from above, or
2. its internal state values change

Our react component are simply just functions and we have to return some sort of JSX or user interface from that component, when react runs into an instance of our components, it runs that function and displays the view which the function returns.

`setState` -> changing a local non-state variable doesn't cause react to re-render the component. Changing state with built-in `setState` function does.

view = function(state) -> thus, when state changes and react re-runs(re-renders) your component, something new gets returned and replaces what used to be on that page.

_Props vs State — The Intuition_

Props = inputs you send into a component from outside (like giving instructions).

State = memory that a component keeps inside itself to remember things over time.

✅ _Props_

Passed from parent to child.

Read-only → the child component can use them but cannot change them.

Makes a component reusable and configurable.

Example:

```tsx
function Greeting({ name }: { name: string }) {
  return <h1>Hello, {name}!</h1>;
}

export default function App() {
  return (
    <>
      <Greeting name="Alice" />
      <Greeting name="Bob" />
    </>
  );
}
```

Here, `name` is a prop.

`Greeting` doesn’t decide the `name` → the parent (App) decides and passes it down.

✅ _State_

Belongs inside a component.

Can change over time (component re-renders when state updates).

Used for data that changes because of user interaction or internal logic.

Example:

```tsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0); // state

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}
```

`count` is state.

It starts at 0, and changes whenever you click the button.

The component remembers its own value, independent of parent components.

🎯 Summary

Props = external inputs, passed into components, unchangeable by the component.

State = internal memory, managed within the component, changeable over time.

Together, they make React components both configurable (props) and dynamic (state).

## `useState`

🧠 What is useState?

`useState` is a _React Hook_ (special function).

It lets a component remember values (state) between renders.

Without it, components would always “forget” everything whenever they re-render.

Think of `useState` as giving your component a tiny piece of memory it can hold onto.

✅ Syntax

```jsx
const [value, setValue] = useState(initialValue);
```

`value` → the current state (the memory slot).

`setValue` → the function you call to update that state.

`initialValue` → the default value when the component first runs.

🖼 _Example 1: Counter_

```tsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0); // state starts at 0

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}
```

`count` starts at 0.

Every click calls `setCount(count + 1)`.

React remembers the new value and re-renders the UI.

🖼 _Example 2: Text Input_

```tsx
function NameInput() {
  const [name, setName] = useState("");

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <p>Hello, {name}!</p>
    </div>
  );
}
```

Here, the state (name) updates whenever you type.

The component re-renders instantly to show “Hello, X!”.

🔑 Key Rules of `useState`

Only call Hooks (like `useState`) at the top level of your component, not inside loops/conditions.

State updates are async-ish → React may batch multiple updates together.

Updating state triggers a re-render of the component.

🎯 Summary

`useState` = gives your component a “memory slot.”

You read the value with the variable (e.g., `count`).

You change it with the setter function (e.g., `setCount`).

Whenever state changes, React re-renders the component with the new data.

🛑 _Why not just do `count = count + 1`?_

If you just reassign a variable, React won’t know that something changed.

JavaScript variables change in memory,

but React’s UI won’t magically update — because React renders based on state, not plain variables.

Example:

```tsx
function Counter() {
  let count = 0;

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => (count = count + 1)}>Increase</button>
    </div>
  );
}
```

👉 Here, clicking the button does change count in memory…
❌ But React won’t re-render the component → the UI is stuck showing 0.

✅ _Why `setState` (`setCount`) works_

When you use `setCount(newValue)`:

React updates its internal memory for that state.

React marks the component for re-render.

On the next render, React uses the new state value and updates the UI.

So `setState` is like telling React:

“Hey, my memory changed, please refresh the UI.”

🖼 _Example Side by Side_

```tsx
// ❌ Wrong way (UI won’t update)
let count = 0;
<button onClick={() => (count = count + 1)}>Increase</button>;

// ✅ Correct way (UI updates)
const [count, setCount] = useState(0);
<button onClick={() => setCount(count + 1)}>Increase</button>;
```

🔑 The Core Idea

React doesn’t track plain variables, it tracks state.

Plain variable changes = invisible to React.

setState = React-aware update + automatic re-render.

🎯 Summary:
You must use `setState` (`setCount`) because React needs a way to know when to re-render the UI. Just reassigning variables won’t trigger re-rendering.

Note: if you ever need the old value of state to help you determine the new value of state, you should pass a callback function to your state setter function instead of using state directly. This callback function will receive the old value of state as its parameter, which you can then use to determine your new value of state.

🧠 The Problem

React doesn’t update state immediately.

State updates are asynchronous-ish → React may batch multiple updates together for performance.

If you write `setCount(count + 1)` twice in a row, both updates may “see” the same old value of count.

Example:

```tsx
const [count, setCount] = useState(0);

<button
  onClick={() => {
    setCount(count + 1);
    setCount(count + 1);
  }}
>
  Increase Twice
</button>;
```

👉 You might expect the result to be 2,
❌ but you’ll actually get 1.
Both calls used the stale value of count (0).

✅ _The Solution: Callback Form_

Instead of passing the new value directly, you pass a function that receives the previous state:

```tsx
setCount((prevCount) => prevCount + 1);
```

Now React guarantees:

Each update uses the latest state, not the stale one.

Works correctly even if React batches updates together.

🖼 _Fixed Example_

```tsx
const [count, setCount] = useState(0);

<button
  onClick={() => {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  }}
>
  Increase Twice
</button>;
```

👉 Now the final result is 2 (correct ✅).

🔑 Rule of Thumb

If your new state does not depend on the old one → direct form is fine.

```tsx
setUser("Alice"); // just replace value
```

If your new state depends on the old one → always use the callback form.

```tsx
setCount((prev) => prev + 1);
```

🎯 Summary:
The callback form ensures you always update from the most recent state, avoiding bugs caused by React’s async/batched updates.

You have 2 options for what you can pass in to a
state setter function (e.g. `setCount`). What are they?

1.  Pass the new version of state that we want to use as the
    replacement for the old version of state.
2.  Pass a callback function. Must return what we want the new
    value of state to be. Will receive the old version of state
    as a parameter so we can use it to help determine what we want
    the new value of state to be.

🛑 _Why not directly modify state?_

When you do something like this:

```tsx
const [count, setCount] = useState(0);

// ❌ Directly modifying state
count = count + 1;
```

or with objects:

```tsx
const [user, setUser] = useState({ name: "Alice" });

// ❌ Direct mutation
user.name = "Bob";
```

👉 The variable in memory does change, BUT React doesn’t notice.
React decides whether to re-render only when you call the setter function (`setCount`, `setUser`).
If you skip it, the component won’t re-render, and the UI stays out of sync with memory.

✅ _Why the setter (setState) works_

When you call `setState`:

React schedules an update (it doesn’t instantly change the value).

React marks the component dirty, meaning: “this needs to re-render next time.”

React re-runs your component function → reads the new state → updates the UI.

So the setter is like telling React about the change, instead of just changing memory silently.

🔑 Key Point

React’s _state is immutable_ in practice.

Instead of editing it, you _replace it with a new value_ using the setter.

That’s how React knows: “aha, something changed, let me refresh the UI.”

🖼 _Example: Direct vs Correct_

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  // ❌ Wrong: UI won’t re-render
  const badIncrease = () => {
    count = count + 1;
    console.log(count); // logs 1, but UI still shows 0
  };

  // ✅ Right: UI updates correctly
  const goodIncrease = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={badIncrease}>Bad Increase</button>
      <button onClick={goodIncrease}>Good Increase</button>
    </div>
  );
}
```

🎯 Summary

Direct modification: React doesn’t see it → no re-render.

Setter function: Notifies React → React re-renders with new state.

# Forms

## Modern vs Classical Approach

🌱 _Before React 19 — Classic Form Handling_

In older React versions (before React 19), forms were handled manually:

_Controlled inputs:_
You store form values in state using `useState`.
Every input needs an `onChange` handler to update state.

_Submit handler_:
On form submit, you prevent the default browser reload (`event.preventDefault()`) and run some function to process the form.

👉 _Example (classic way)_:

```tsx
import { useState } from "react";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    console.log("Submitting:", { formData });
    // usually you'd call an API here
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Send</button>
    </form>
  );
}
```

Downsides:

Lots of boilerplate (`useState` for every field).

Manual error/loading handling.

Harder to sync with server state.

🚀 _React 19 — New Form Features_

React 19 makes forms much simpler and more powerful with new APIs:

1️⃣ _action API_

Instead of writing `onSubmit` and `preventDefault`, React 19 lets you attach a function directly with the `action` prop. React automatically handles submission for you.

You can now pass a function directly to the `action` attribute of `<form>`, `<input>`, or `<button>`. React uses this function to handle form submission natively—no `onSubmit` or `preventDefault`() needed.

After successful submission, React resets the form automatically for uncontrolled fields.
If needed, there's also a `requestFormReset` API to manually reset the form.

👉 Example:

```tsx
function ContactForm() {
  async function handleAction(formData: FormData) {
    const name = formData.get("name");
    const email = formData.get("email");
    console.log("Submitted:", { name, email });
    // send to backend here
  }

  return (
    <form action={handleAction}>
      <input name="name" placeholder="Name" />
      <input name="email" type="email" placeholder="Email" />
      <button type="submit">Send</button>
    </form>
  );
}
```

✨ _Benefits_:

No `useState` for every field.

Directly reads values from `<input name="...">`.

2️⃣ _`useActionState`_

This hook lets you store the state returned by the `action` function.
It’s like combining form submission with automatic state handling.

👉 Example:

```tsx
import { useActionState } from "react";

function SignupForm() {
  async function signup(prevState: string | null, formData: FormData) {
    const username = formData.get("username");
    // simulate async check
    if (username === "taken") {
      return "Username already taken";
    }
    return "Signup successful!";
  }

  const [message, action] = useActionState(signup, null);

  return (
    <form action={action}>
      <input name="username" placeholder="Username" />
      <button type="submit">Sign up</button>
      {message && <p>{message}</p>}
    </form>
  );
}
```

✨ _Benefits_:

Keeps track of server responses/errors directly.

`action` is auto-linked to form.

Makes forms stateful without `useState`.

3️⃣ _useFormStatus_

This hook tells you about the current status of a form submission — for example, if it’s `pending` (`loading`).

👉 Example:

```tsx
import { useFormStatus } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

function FeedbackForm() {
  async function sendFeedback(formData: FormData) {
    await new Promise((r) => setTimeout(r, 1000)); // simulate delay
    console.log("Feedback:", formData.get("feedback"));
  }

  return (
    <form action={sendFeedback}>
      <textarea name="feedback" />
      <SubmitButton />
    </form>
  );
}
```

✨ _Benefits_:

No need to manually set `isLoading`.

You can disable buttons or show spinners automatically.

4️⃣ _`useOptimistic`_

This hook allows optimistic updates → showing instant UI changes before the server response comes back.
If the server fails, React can roll back.

👉 Example:

```tsx
import { useOptimistic } from "react";

function Comments() {
  const [comments, setComments] = useState<string[]>([]);
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (state, newComment: string) => [...state, newComment]
  );

  async function postComment(formData: FormData) {
    const comment = formData.get("comment") as string;
    addOptimisticComment(comment); // show instantly
    await new Promise((r) => setTimeout(r, 1000)); // simulate API
    setComments((c) => [...c, comment]); // confirm server state
  }

  return (
    <>
      <form action={postComment}>
        <input name="comment" placeholder="Write a comment..." />
        <button type="submit">Post</button>
      </form>
      <ul>
        {optimisticComments.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </>
  );
}
```

✨ Benefits:

User sees instant feedback (no lag).

Server state syncs in background.

Better UX for chat apps, comments, likes, etc.
