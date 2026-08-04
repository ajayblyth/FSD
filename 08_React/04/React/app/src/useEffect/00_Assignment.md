Assignment: useEffect and Data Fetching

API: https://rickandmortyapi.com/api/character
Search: https://rickandmortyapi.com/api/character/?name=<term>

Open both URLs in your browser first and look at the shape of the response.


Build two components. Both must use useEffect.


Task 1. Character table
Fetch the character list when the component loads. Display the results in a table with these columns: image, name, status, species, gender, origin.

Task 2. Search
An input box. As the user types a name, fetch the matching characters and display them as cards. Each card shows the image, name, status, species, gender, and last known location.


Requirements for both
Show a loading indicator while the request is running.

Show an error message if the request fails. Test this by breaking the URL on purpose and confirm your error message appears.

Show a "no results" message when the search finds nothing. The API returns 404 for no matches, so handle it.

Every item in a list needs a key.

No fetch calls in the component body. Only inside useEffect.
Task 1 must fetch exactly once, no matter how many times the component re-renders. Prove it with a console log.
Task 2 must re-fetch when the search term changes, and must not send a request on every keystroke. Add a delay and clean it up properly.
Do not fetch when the search box is empty.
Plain fetch only. No axios, no data-fetching libraries.
