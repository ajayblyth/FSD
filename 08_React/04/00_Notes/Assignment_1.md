==================================================
Why We Need Previous State (prev)
==================================================

React state updates are:
- asynchronous
- batched

Meaning:
React may delay/combine updates for performance.

So current state variable may become OLD/stale.

==================================================
Problem
==================================================

Example:

const [count, setCount] = useState(0);

--------------------------------------------------

Wrong:

setCount(count + 1);
setCount(count + 1);

--------------------------------------------------

Expected:
2

Actual:
1

==================================================
Why?
==================================================

Both lines use SAME old value of count.

Suppose:

count = 0

Then React sees:

setCount(0 + 1);
setCount(0 + 1);

--------------------------------------------------

Final value:
1

NOT 2

==================================================
Solution : Previous State
==================================================

Correct:

setCount(prev => prev + 1);
setCount(prev => prev + 1);

==================================================
What is prev?
==================================================

prev
= latest updated state value provided by React.

React guarantees:
prev is always fresh/latest.

==================================================
Execution Flow
==================================================

Initial:
count = 0

--------------------------------------------------

First update:

prev = 0
returns 1

--------------------------------------------------

Second update:

prev = 1
returns 2

--------------------------------------------------

Final:
count = 2

==================================================
Complete Example
==================================================

Counter.jsx

import { useState } from "react";

function Counter() {

    const [count, setCount] = useState(0);

    function increaseWrong() {

        setCount(count + 1);
        setCount(count + 1);

    }

    function increaseCorrect() {

        setCount(prev => prev + 1);
        setCount(prev => prev + 1);

    }

    return (

        <div>

            <h2>Count: {count}</h2>

            <button onClick={increaseWrong}>
                Wrong +2
            </button>

            <button onClick={increaseCorrect}>
                Correct +2
            </button>

        </div>

    );

}

export default Counter;

==================================================
App.jsx
==================================================

import Counter from "./Counter";

function App() {

    return <Counter />;

}

export default App;

==================================================
Result
==================================================

Wrong button:
0 → 1
1 → 2
(not increasing by 2)

--------------------------------------------------

Correct button:
0 → 2
2 → 4
(works properly)

==================================================
When Should We Use prev?
==================================================

Use prev whenever:

new state depends on old state.

Examples:
- counters
- toggles
- likes
- cart quantity
- timers

==================================================
Examples
==================================================

Counter:

setCount(prev => prev + 1);

--------------------------------------------------

Toggle:

setTheme(prev =>
    prev === "light" ? "dark" : "light"
);

--------------------------------------------------

Array update:

setItems(prev => [...prev, newItem]);

==================================================
Memory Line
==================================================

If new state depends on old state,
USE prev.