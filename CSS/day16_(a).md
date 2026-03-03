================================================================================
UI DESIGN – COMPACT & COMPLETE NOTES (COLOR + TYPOGRAPHY + ICONS)
================================================================================

COLORING (UI BASICS)
--------------------------------------------------------------------------------
• Colors must have meaning, not decoration
• Limit palette to 2–4 colors
• Same color = same action

UI COLOR MEANING:
Blue   → Primary action, Trust (Banking apps)
Green → Success, Confirmation
Red   → Error, Danger
Grey  → Disabled, Secondary

RULES:
• High contrast (text vs background)
• Avoid neon / very bright colors
• Do not rely only on color

--------------------------------------------------------------------------------

RYB COLOR WHEEL (BASICS)
--------------------------------------------------------------------------------
PRIMARY   : Red, Yellow, Blue

SECONDARY : Orange (R+Y) | Green (Y+B) | Purple (B+R)

TERTIARY  : Red-Orange | Yellow-Orange | Yellow-Green
            Blue-Green | Blue-Purple   | Red-Purple

COMPLEMENTARY:
Red ↔ Green | Blue ↔ Orange | Yellow ↔ Purple

--------------------------------------------------------------------------------

COLOR COMBINATIONS
--------------------------------------------------------------------------------
Monochromatic    : One color + shades
Analogous        : Adjacent colors
Complementary    : Opposite colors
Split-Complement : Base + near complements
Triadic          : 3 evenly spaced
Neutral + Accent : Grey/White + 1 bright (BEST for UI)

--------------------------------------------------------------------------------

TYPOGRAPHY (TEXT DESIGN)
--------------------------------------------------------------------------------
Typography = Style & appearance of text

Purpose  : Readability | Emotion | Hierarchy
Key terms: Font-family | Size | Weight | Line-height | Letter-spacing

--------------------------------------------------------------------------------

FONT FAMILIES + EMOTION
--------------------------------------------------------------------------------
Serif       → Formal, Traditional
Sans-serif  → Modern, Clean, Trust (BEST for UI)
Monospace   → Technical, Code
Script      → Elegant (Decorative)
Display     → Bold, Attention (Headings only)

--------------------------------------------------------------------------------

FONT PAIRING (SAFE)
--------------------------------------------------------------------------------
Poppins + Roboto      → Modern UI
Montserrat + OpenSans→ Corporate
Playfair + Lato      → Blogs
Inter + Inter        → System UI

RULE:
• Max 2 fonts
• Decorative font only for headings
• Body font must be readable

--------------------------------------------------------------------------------

TYPOGRAPHY + COLOR RULES
--------------------------------------------------------------------------------
• Dark text + light background (best)
• Light text + dark background (dark mode)
• Thin font + light color = BAD

Hierarchy:
Heading → Bigger + brand/dark color
Subhead → Medium + muted color
Body    → Normal + neutral
Action  → Bold + primary color

--------------------------------------------------------------------------------

GOOGLE FONTS (IMPORT + APPLY)
--------------------------------------------------------------------------------
IMPORT (HTML <head>):
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
      rel="stylesheet">

APPLY (CSS):
body {
    font-family: 'Roboto', sans-serif;
}

Note:fontawesome website also provide these. so you can copy from there also.
--------------------------------------------------------------------------------

ICONS (UI SYMBOLS)
--------------------------------------------------------------------------------
Icons = Visual cues for actions
Common: Search | Edit | Delete | Menu | User

RULES:
• Support text, don’t replace it
• Consistent size
• Avoid overload

--------------------------------------------------------------------------------

GOOGLE ICONS (IMPORT + APPLY)
--------------------------------------------------------------------------------
IMPORT (HTML <head>):
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
      rel="stylesheet">

USE (HTML):
<span class="material-symbols-outlined">search</span>

STYLE (CSS):
.material-symbols-outlined {
    font-size: 24px;
    color: #1976d2;
}

Note:fontawesome website also provide these. so you can copy from there also.

--------------------------------------------------------------------------------

GOLDEN UI RULE
--------------------------------------------------------------------------------
Clear + Consistent + Simple = Good UI
Cluttered + Low Contrast + Inconsistent = Bad UI

================================================================================

SUMMARY:
First, we understood z-index, which controls the stacking order of elements — basically which element appears on top of another.
We learned that z-index only works when positioning is applied (relative, absolute, fixed, sticky) or when the element is part of a flex or grid layout.
We also saw that stacking context matters more than the z-index value itself, and many z-index issues happen because of parent elements creating their own stacking context.
So the key takeaway was: z-index is about depth, but context decides the rules.

After that, we moved into UI design basics, starting with color usage.
We learned that colors in UI are not for decoration — they communicate meaning.
Blue usually represents trust and primary actions, green means success, red signals errors or danger, and grey is used for disabled or secondary elements.
We also learned to limit color palettes, maintain high contrast, and never rely only on color to convey information.

Then we covered color theory, including the RYB color wheel, complementary and analogous colors, and different color combinations.
For UI specifically, the best approach is usually neutral colors with one accent color, because it keeps the interface clean and readable.

Next, we discussed typography, which controls how text looks and feels.
Typography is important for readability, emotion, and hierarchy.
We learned about different font families — serif, sans-serif, monospace, and decorative fonts — and why sans-serif fonts are best for modern UI.
We also learned font pairing rules, like using a maximum of two fonts and keeping body text simple and readable.

We also understood how typography and color work together, especially for hierarchy — headings should stand out, body text should be neutral, and action text should be bold and clear.

After that, we looked at icons, which act as visual shortcuts for actions.
Icons should support text, not replace it, stay consistent in size, and never be overused.
We learned how to use Google Material Icons and style them properly using CSS.

Finally, the golden UI rule we learned today was:
Clear, consistent, and simple UI is good UI.
Clutter, low contrast, and inconsistency make a bad user experience.