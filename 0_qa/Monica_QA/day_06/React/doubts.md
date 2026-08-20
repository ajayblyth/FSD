# State Updates with Previous State (`prev`)

This is an important `useState` concept, especially when the new state depends on the previous state.

### The problem

When we update state, the state variable does not immediately change inside the current render.

For example:

const [count, setCount] = useState(0);

function handleClick() {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
}

We might expect:

0 → 1 → 2 → 3

But the result will be:

0 → 1

### Why?

Suppose the current value of `count` is `0`.

All three statements use the same `count` value from the current render:

setCount(count + 1); // setCount(1)
setCount(count + 1); // setCount(1)
setCount(count + 1); // setCount(1)

So React receives three updates that are effectively saying:

Set count to 1.

React then processes the updates and re-renders the component.

This happens because the `count` variable belongs to the current render. Calling `setCount()` does not immediately change that variable.

---

# Functional Updater / Previous State

When the new state depends on the previous state, we should use the functional updater form:

setCount(prevCount => prevCount + 1);

Now we can do:

function handleClick() {
  setCount(prevCount => prevCount + 1);
  setCount(prevCount => prevCount + 1);
  setCount(prevCount => prevCount + 1);
}

React processes them using the latest previous value:

0
↓
prevCount = 0 → 1
↓
prevCount = 1 → 2
↓
prevCount = 2 → 3

Result:

3

### Why does `prevCount` work?

`prevCount` represents the previous/latest state value provided by React for that update.

So instead of saying:

setCount(count + 1);

we say:

setCount(prevCount => prevCount + 1);

Meaning:

> "Take whatever the previous state value is and increase it by 1."

---

# When should we use the `prev` pattern?

Use the functional updater whenever the new state depends on the previous state.

Examples:

### Counter

setCount(prev => prev + 1);

### Decrement

setCount(prev => prev - 1);

### Boolean toggle

setIsOpen(prev => !prev);

### Updating an array

setUsers(prev => [...prev, newUser]);

### Updating an object

setUser(prev => ({
  ...prev,
  age: prev.age + 1
}));

---

# Easy Interview Explanation

> "When the new state depends on the previous state, I use the functional updater form. For example, instead of `setCount(count + 1)`, I use `setCount(prev => prev + 1)`. This is important because state updates are scheduled, and the state variable from the current render doesn't immediately change after calling the setter."

### Easy rule to remember

If the new value does NOT depend on the previous value:

setName("Ajay");

If the new value DOES depend on the previous value:

setCount(prev => prev + 1);

Think:

New state depends on old state?
        ↓
      YES
        ↓
Use prev
        ↓
setState(prev => ...)