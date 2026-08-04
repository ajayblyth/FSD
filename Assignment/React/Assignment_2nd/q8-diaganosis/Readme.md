Q8. Diagnosis, no coding required
You are given a component where a developer has wrapped everything in useMemo and useCallback, including a useMemo that adds two numbers, a useMemo that builds a two item array, and a useCallback for a function that is never passed to any child. Write a short paragraph. Identify which of these are pointless and explain why. Then explain, in general, why wrapping everything in useMemo and useCallback is a mistake rather than a free speed boost.


### Q8. Diagnosis

Using `useMemo` to add two numbers is pointless because adding two numbers is an extremely fast operation. The cost of memoizing the result is often greater than simply performing the addition again.

Using `useMemo` to create a small two-item array is also unnecessary. Creating such a small array is inexpensive, so memoizing it provides little or no performance benefit. `useMemo` is more useful for expensive calculations or when a stable reference is needed for a memoized child component.

Using `useCallback` for a function that is never passed to a child component or used as a dependency in another hook is unnecessary. The function's reference does not affect any component, so memoizing it has no practical benefit.

Wrapping everything in `useMemo` and `useCallback` is a mistake because these hooks are not free. React must store the memoized value or function and compare the dependency array on every render. Overusing them makes the code more complex, harder to read, and can sometimes reduce performance instead of improving it.

These hooks should only be used when they solve a real problem, such as preventing expensive calculations from running repeatedly or avoiding unnecessary re-renders of memoized child components. Before using them, it is important to identify a performance issue rather than adding them everywhere by default.
