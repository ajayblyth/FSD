import { useMemo, useState } from "react";

const items = Array.from(
  { length: 5000 },
  (_, index) => `Item ${index + 1}`
);

function FilterList() {
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Without useMemo
  // Every re-render filters the list again,
  // even when only darkMode changes.
  /*
  const filteredItems = items.filter((item) => {
    console.log("Filtering List...");
    return item.toLowerCase().includes(search.toLowerCase());
  });
  */

  // With useMemo
  // The filtered list is cached.
  // Filtering runs again only when 'search' changes.
  const filteredItems = useMemo(() => {
    console.log("Filtering List...");

    return items.filter((item) =>
      item.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div>
      <h2>Filter Large List (With useMemo)</h2>

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={() => setDarkMode(!darkMode)}>
        Toggle Dark Mode
      </button>

      <p>Total Results: {filteredItems.length}</p>

      <ul>
        {filteredItems.slice(0, 20).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default FilterList;