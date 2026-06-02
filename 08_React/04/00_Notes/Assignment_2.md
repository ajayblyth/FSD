==================================================
Assignment : Create Global User Context
==================================================

Tutor Goal:
Create another context:
UserContext.jsx

Then:
1. Wrap Provider in main.jsx
2. Create custom hook
3. Use context inside GlobalContext.jsx

==================================================
Why We Did This?
==================================================

Problem:
Passing props through many components
(Prop Drilling)

Solution:
Context API

Context allows:
Any component to directly access shared data.

==================================================
What We Created
==================================================

1. UserContext.jsx
   → creates global user context

2. main.jsx
   → wraps whole app using UserProvider

3. GlobalContext.jsx
   → accesses global user data

==================================================
FLOW
==================================================

UserContext.jsx
   ↓
creates context + provider + custom hook
   ↓
main.jsx wraps App using UserProvider
   ↓
All components get access
   ↓
GlobalContext.jsx uses useUser()

==================================================
STEP 1 : UserContext.jsx
==================================================

File:
src/context/UserContext.jsx

--------------------------------------------------

import {
  createContext,
  useContext,
  useState
} from "react";

--------------------------------------------------

Meaning:

createContext
→ creates communication channel

useContext
→ reads context data

useState
→ stores global state

==================================================

const UserContext = createContext(null);

--------------------------------------------------

Meaning:

Creates Context object.

null
= default value before Provider supplies data.

==================================================

export function UserProvider({ children })

--------------------------------------------------

Meaning:

Provider component.

children
= everything wrapped inside Provider.

Example:

<UserProvider>
   <App />
</UserProvider>

Here:
App becomes children.

==================================================

const [username, setUsername] =
useState("Ajay");

--------------------------------------------------

Meaning:

Global state.

username
= current value

setUsername
= updates value

==================================================

<UserContext.Provider
   value={{ username, setUsername }}
>

--------------------------------------------------

Meaning:

Provider shares data globally.

value={{
   username,
   setUsername
}}

means:
Any child component can access:
- username
- setUsername

==================================================

{children}

--------------------------------------------------

Meaning:

Render wrapped components.

==================================================

export function useUser()

--------------------------------------------------

Custom Hook.

Instead of writing:

const context =
useContext(UserContext);

everywhere,

we write:

const { username } = useUser();

Cleaner and reusable.

==================================================
STEP 2 : main.jsx
==================================================

Added:

import { UserProvider }
from "./context/UserContext.jsx";

--------------------------------------------------

Wrapped App:

<UserProvider>
   <App />
</UserProvider>

--------------------------------------------------

Meaning:

Entire app now gets access to UserContext.

==================================================
FLOW NOW
==================================================

main.jsx
   ↓
UserProvider wraps App
   ↓
App + all child components
can access user context

==================================================
STEP 3 : GlobalContext.jsx
==================================================

Added:

import { useUser }
from "../context/UserContext";

--------------------------------------------------

Used:

const { username } = useUser();

--------------------------------------------------

Meaning:

Reads global user data directly from context.

==================================================
FINAL GlobalContext Flow
==================================================

GlobalContext.jsx
   ↓
calls useUser()
   ↓
useUser internally uses:
useContext(UserContext)
   ↓
gets data from Provider
   ↓
shows username in UI

==================================================
VERY IMPORTANT CONCEPT
==================================================

Provider does NOT create HTML.

It is a React wrapper for sharing data.

Example:

<UserProvider>
   <App />
</UserProvider>

means:

"Give App and all children access to shared data."

==================================================
FINAL RESULT
==================================================

Now your app has:

+----------------------+---------------------------+
| File                 | Purpose                   |
+----------------------+---------------------------+
| ThemeContext.jsx     | Theme global state        |
| UserContext.jsx      | User global state         |
| ThemeProvider        | Shares theme globally     |
| UserProvider         | Shares user globally      |
| useTheme()           | Reads theme context       |
| useUser()            | Reads user context        |
+----------------------+---------------------------+

==================================================
REAL INDUSTRY PATTERN
==================================================

Large apps usually create:

- AuthContext
- ThemeContext
- UserContext
- CartContext
- LanguageContext

inside:
src/context/


========
npm run dev
