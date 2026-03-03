
1. OVERVIEW
-----------
- Front-end framework for responsive web design, it comes with readymade styling.
- Uses HTML, CSS, JS.
- Mobile-first, responsive grid system.

2. SETUP
--------
- Include via CDN:
  CSS: <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  JS:  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
- Or install via npm: npm install bootstrap
- We can still override CDN with our own CSS file because of cascading rule.

CDN (Content Delivery Network)
------------------------------
- Network of servers worldwide that deliver web content from nearest server.
- Makes websites faster and more reliable.
- They are used to store static contents like images, videos, links for faster access.
- In Bootstrap, CDN links allow use of CSS/JS without downloading files.

4. LAYOUT CONTAINERS & COMPONENTS
---------------------------------
- Containers are fundamental building blocks in Bootstrap.
- They provide **padding, alignment, and responsive width** to your content.
- Apply class="container" (or other variants) to get predefined CSS styles for layout.

CONTAINER TYPES & BEHAVIOR
--------------------------
Type                     | Breakpoint      | Description & Width Behavior
-------------------------|----------------|--------------------------------------------------------
.container               | xs (<576px)    | Fixed width, responsive. Width changes at breakpoints.
.container-sm            | sm (≥576px)    | Fixed width starting at small devices.
.container-md            | md (≥768px)    | Fixed width starting at medium devices.
.container-lg            | lg (≥992px)    | Fixed width starting at large devices.
.container-xl            | xl (≥1200px)   | Fixed width starting at extra large devices.
.container-xxl           | xxl (≥1400px)  | Fixed width starting at extra extra large devices.
.container-fluid         | all            | Always 100% width, spans entire viewport, fully fluid.
.container-{breakpoint}-fluid | sm/md/lg/xl/xxl | Full width until specified breakpoint, then fixed.

EXTRA INFO
-----------
- Breakpoints define **minimum width for container behavior**.
- xs → Extra small devices (phones)  
- sm → Small devices (tablets)  
- md → Medium devices (small laptops)  
- lg → Large devices (desktops)  
- xl → Extra large devices (large desktops)  
- xxl → Extra extra large (very large screens)  
- Use **.container-fluid** for headers, footers, or full-width layouts.
- Use **container-{breakpoint}** to control responsiveness based on screen size.

KEY POINTS
-----------
- Default .container has padding on left/right to align content.
- Breakpoint-specific containers let you control responsiveness.
- Containers are required for **Bootstrap grid rows and columns** to work correctly.

COMPONENTS INSIDE CONTAINERS
----------------------------
1) BUTTONS - BASE CLASS & VARIANTS
----------------------------------
- .btn : Base class for all buttons. Provides padding, border, font, cursor, hover, and focus effects.
- Combine with a variant (color) class: 
  .btn-primary, .btn-secondary, .btn-success, .btn-danger, .btn-warning, .btn-info, .btn-light, .btn-dark, .btn-link
- Optional classes: 
  Size → .btn-sm (small), .btn-lg (large)
  State → .active, .disabled
- Outline buttons: use .btn-outline-{color} for colored border & transparent background
- Toggle buttons: use data-bs-toggle="button" for click toggle effect; add .active to make initially pressed
- Disabled button: add .disabled class or disabled attribute

VARIANTS (COLOR CLASSES)
------------------------
- .btn-primary   : Blue button, main actions
- .btn-secondary : Grey button, secondary actions
- .btn-success   : Green button, success/confirmation
- .btn-danger    : Red button, warning/destructive
- .btn-warning   : Yellow/orange button, caution
- .btn-info      : Light blue button, informational
- .btn-light     : White/light grey, subtle
- .btn-dark      : Dark grey/black, emphasis
- .btn-link      : Looks like text link, no background/border
- .btn-outline-{color} : Outline version of any color variant

EXAMPLES
--------
1) Normal large button:
<button class="btn btn-success btn-lg">Submit</button>

2) Outline button:
<button class="btn btn-outline-danger btn-sm">Delete</button>

3) Disabled button:
<button class="btn btn-primary disabled" disabled>Click Me</button>

4) Active button:
<button class="btn btn-primary active">Click Me</button>

5) Toggle button:
<button class="btn btn-primary" data-bs-toggle="button" aria-pressed="false">Toggle Me</button>
2) BADGES
----------
- .badge : Base class for badges. Small count or label indicators, often used to show notifications, counts, or status.
- Types of badges:
  1) Simple badge: <span class="badge bg-success">New</span>
  2) Pill badge: <span class="badge bg-info rounded-pill">99+</span>
  3) Floating badge (positioned): 
     <div class="position-relative">
       <button class="btn btn-primary">Inbox</button>
       <span class="badge bg-danger position-absolute top-0 start-100 translate-middle">9</span>
     </div>
  4) Badges inside buttons: 
     <button class="btn btn-primary">Messages <span class="badge bg-light text-dark">5</span></button>
- Color variants: .bg-primary, .bg-secondary, .bg-success, .bg-danger, .bg-warning, .bg-info, .bg-light, .bg-dark
- Rounded pill: .rounded-pill → makes badge oval for emphasis
- Positioning (optional):
  • Combine with position utilities: .position-absolute, .top-0, .start-100, translate-middle
- Notes:
  • Badges are **inline elements**, don’t disrupt layout unless using position utilities
  • Use **text color** with light badges: .bg-light → .text-dark
  • Can combine with buttons, nav links, list items, or any inline content

  3) ALERTS
----------
- .alert : Base class for alerts.
- Variants: .alert-primary, .alert-secondary, .alert-success, .alert-danger, .alert-warning, .alert-info, .alert-light, .alert-dark
- Dismissible: add .alert-dismissible and a close button 
  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
- Example:
<div class="alert alert-warning alert-dismissible fade show" role="alert">
  Warning! This is an alert.
  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>
- Notes:
  • Can be placed inside containers, modals, cards, or standalone
  • .fade and .show add smooth appearance/disappearance
  • Use appropriate variant to indicate alert type (success, danger, info, warning)





================================
4) BUTTON GROUP
---------------
- Definition: Group a series of buttons together on a single line or stack them vertically.
- Use: Provides better alignment and spacing for related actions.
- Syntax (horizontal group):
<div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-primary">Left</button>
  <button type="button" class="btn btn-primary">Middle</button>
  <button type="button" class="btn btn-primary">Right</button>
</div>
- Syntax (vertical group):
<div class="btn-group-vertical" role="group" aria-label="Vertical example">
  <button type="button" class="btn btn-secondary">Top</button>
  <button type="button" class="btn btn-secondary">Middle</button>
  <button type="button" class="btn btn-secondary">Bottom</button>
</div>
- Notes:
  • Can combine with **size classes** (.btn-sm, .btn-lg)
  • Supports **outline buttons**, **toggle buttons**, and **active/disabled states**

5) NAVBAR - FULL DETAILS
------------------------
- Definition: A responsive navigation header that can include branding, links, dropdowns, forms, text, buttons, and badges.
- How it works:
  • Uses **flexbox** for horizontal alignment.
  • `.navbar-expand-lg` → expands on large screens, collapses below large devices.
  • `.navbar-toggler` → button to toggle collapse on small screens.
  • `.collapse.navbar-collapse` → hides/shows links and content when toggler is clicked.
  • Supports brand, nav links, dropdowns, text, forms, buttons, badges inside.
  • Background and color themes: `.navbar-light`, `.navbar-dark`, `.bg-light`, `.bg-dark`.

- Structure & Supported Content:
  • **.navbar-brand** → branding/logo
  • **.navbar-nav** → container for nav links
  • **.nav-item** → individual link container
  • **.nav-link** → actual link
  • **.nav-link.active** → active link highlighting
  • **.nav-link.disabled** → disabled link
  • **.dropdown** + **.dropdown-menu** + **.dropdown-item** → dropdown menu items
  • **.navbar-text** → inline text (like slogan)
  • **Forms/Buttons** → can include search forms or buttons
  • **Badges** → can be added inside links or buttons
  • **.collapse.navbar-collapse** → container for collapsible content
  • **.navbar-toggler** → toggler button, linked with `data-bs-target` to collapse container

- Full Example (Bootstrap 5 syntax):
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <!-- Brand/logo -->
    <a class="navbar-brand" href="#">Brand</a>

    <!-- Toggler button -->
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
            aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Collapsible content -->
    <div class="collapse navbar-collapse" id="navbarContent">

      <!-- Nav links -->
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
             data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#">Disabled</a>
        </li>
      </ul>

      <!-- Navbar text -->
      <span class="navbar-text me-3">Navbar text</span>

      <!-- Search form -->
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>

    </div>
  </div>
</nav>

💡 Notes:
- `.navbar-expand-lg` → collapses below large devices.
- `.me-auto` → pushes content (like form) to the right.
- `.dropdown-menu` → contains dropdown items; `.dropdown-divider` adds separator.
- Use `data-bs-toggle` and `data-bs-target` for toggler and dropdowns (Bootstrap 5 syntax).
- All nav links, forms, buttons, badges, text are inside `.collapse.navbar-collapse` for responsive behavior.

=======================================

------------------------------------------------------------------------
BOOTSTRAP SPACING CLASSES
-------------------------
Prefix | Direction | Meaning                            | Example
-------|-----------|------------------------------------|---------------------------
m      | all       | margin on all sides                | .m-3
mt     | top       | margin-top                         | .mt-2
mb     | bottom    | margin-bottom                      | .mb-4
ms     | start     | margin-left (LTR)                  | .ms-1
me     | end       | margin-right (LTR)                 | .me-3
mx     | x-axis    | margin-left & margin-right         | .mx-2
my     | y-axis    | margin-top & margin-bottom         | .my-4
p      | all       | padding on all sides               | .p-3
pt     | top       | padding-top                        | .pt-2
pb     | bottom    | padding-bottom                     | .pb-4
ps     | start     | padding-left (LTR)                 | .ps-1
pe     | end       | padding-right (LTR)                | .pe-3
px     | x-axis    | padding-left & padding-right       | .px-2
py     | y-axis    | padding-top & padding-bottom       | .py-4

# Size scale
0     → 0
1     → 0.25rem
2     → 0.5rem
3     → 1rem
4     → 1.5rem
5     → 3rem
auto  → auto margin

💡 Notes:
- m = margin, p = padding  
- t = top, b = bottom, s = start (left in LTR), e = end (right in LTR), x = horizontal, y = vertical  
- Can combine with breakpoints:  
  • .mt-md-3 → margin-top 1rem on medium and larger screens  
  • .px-lg-4 → horizontal padding 1.5rem on large and larger screens


6) CARDS
---------
- Definition: Flexible content containers with multiple elements (text, images, links, buttons, headers, footers).  
- Used for displaying **related information** in a boxed layout with padding and border.

- Base class: .card

CARD STRUCTURE
--------------
1) Card container
   <div class="card"> ... </div>
   - Provides border, padding, and background.

2) Card body
   <div class="card-body"> ... </div>
   - Main content area for text, links, or buttons.

3) Card header
   <div class="card-header">Header</div>
   - Optional, placed at the top, usually for titles.

4) Card footer
   <div class="card-footer">Footer</div>
   - Optional, placed at the bottom for extra info or actions.

5) Card title & text
   - .card-title → for headings
   - .card-text  → for paragraph text

6) Images
   - .card-img-top → image on top of card
   - .card-img-bottom → image at bottom
   - .img-fluid can also be used inside

7) Links and buttons
   - <a class="card-link"> → link inside card
   - <button class="btn btn-primary"> → button inside card

CARD SIZES & VARIANTS
---------------------
- Background colors: .bg-primary, .bg-secondary, .bg-success, .bg-danger, .bg-warning, .bg-info, .bg-light, .bg-dark
- Text color: .text-white, .text-dark, etc.
- Width: can use inline style or Bootstrap grid classes like .col-md-4

EXAMPLES
--------
1) Simple Card
<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Card Title</h5>
    <p class="card-text">Some example text.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>

2) Card with Header & Footer
<div class="card" style="width: 18rem;">
  <div class="card-header">Featured</div>
  <div class="card-body">
    <h5 class="card-title">Card Title</h5>
    <p class="card-text">Some text inside card body.</p>
    <a href="#" class="btn btn-success">Action</a>
  </div>
  <div class="card-footer text-muted">2 days ago</div>
</div>

3) Card with Image
<div class="card" style="width: 18rem;">
  <img src="image.jpg" class="card-img-top" alt="Image">
  <div class="card-body">
    <h5 class="card-title">Card with Image</h5>
    <p class="card-text">Description goes here.</p>
  </div>
</div>

💡 Notes:
- Cards are **flexible** and can contain almost any content (lists, tables, forms, buttons).  
- Use **grid or flex classes** to place multiple cards side by side.  
- Can combine with utilities (spacing, text, colors) for customization.