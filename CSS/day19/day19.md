CSS OVERFLOW (SHORT NOTES)
--------------------------------------------------------------------------------
Overflow controls what happens when content becomes bigger than its container.
--------------------------------------------------------------------------------


CSS OVERFLOW VALUES
--------------------------------------------------------------------------------
Value     | Meaning
--------------------------------------------------------------------------------
visible   | Default → Content spills outside the box.

hidden    | Extra content is cut off.
          | Not visible, no scrollbars shown.

clip      | Content is clipped like hidden,
          | BUT scrolling is NOT allowed at all.
          | No scrollbars, no scroll container is created.

scroll    | Content is clipped AND scrollbars are ALWAYS visible
          | (even when content fits).

auto      | Scrollbars appear ONLY when content overflows.
--------------------------------------------------------------------------------


KEY DIFFERENCE: hidden vs clip
--------------------------------------------------------------------------------
hidden → content is cut, scrolling can be forced using JavaScript
clip   → content is cut, scrolling is NOT possible in any way
--------------------------------------------------------------------------------


WHEN TO USE `clip`
--------------------------------------------------------------------------------
• When strict clipping is needed
• When you want to avoid accidental scrolling
--------------------------------------------------------------------------------


EXAMPLE
--------------------------------------------------------------------------------
.box {
  width: 200px;
  height: 100px;
  overflow: auto;
}
--------------------------------------------------------------------------------


OVERFLOW-X & OVERFLOW-Y
--------------------------------------------------------------------------------
Property    | Controls
--------------------------------------------------------------------------------
overflow-x  | Horizontal overflow (left ↔ right)
overflow-y  | Vertical overflow (top ↕ bottom)
--------------------------------------------------------------------------------


COMMON USE CASES
--------------------------------------------------------------------------------
hidden  → Hide extra text or images
scroll  → Fixed-size box with scrolling content
auto    → Best choice for responsive layouts
--------------------------------------------------------------------------------


IMPORTANT POINTS
--------------------------------------------------------------------------------
• overflow works only when width and/or height is set
• Mostly used with block-level elements
• Inline elements ignore overflow
--------------------------------------------------------------------------------


INTERVIEW ONE-LINER
--------------------------------------------------------------------------------
CSS overflow controls how extra content is handled when it exceeds container size.
--------------------------------------------------------------------------------

-===============================
assignment , add music playbar at the bottom of spotify and use media query so cards wont get crushed when reducing screen size 