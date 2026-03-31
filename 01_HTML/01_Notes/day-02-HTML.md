
================================================================================
DAY 1–2 : HTML (HYPERTEXT MARKUP LANGUAGE)
================================================================================

HTML INTRODUCTION
--------------------------------------------------------------------------------
“HTML (HyperText Markup Language) is the standard markup language used to create and structure web pages and their content.”

-- Web Page
 "A web page is a single document written in HTML that is displayed in a web browser and can contain text, images, links, 
and other media."

WHAT HTML DOES
--------------------------------------------------------------------------------
• Structures plain text into meaningful content      • Creates headings, paragraphs, images, links
• Buttons, forms, lists                              • Acts as the skeleton (building blocks) of a web page
--------------------------------------------------------------------------------

WHAT IS MARKUP?
--------------------------------------------------------------------------------
A markup language uses TAGS to define structure, add meaning to text, and control how content is displayed.
HTML is called a markup language because it "marks up" content using tags.
--------------------------------------------------------------------------------

HTML ELEMENT
--------------------------------------------------------------------------------
An HTML element is a COMPLETE unit of a web page. It consists of:
• Opening tag    • Content    • Closing tag

Example:   <p>Hello</p>

IMPORTANT HTML ELEMENTS (ONE-LINE EXPLANATION)
--------------------------------------------------------------------------------
<html>     → Root element that tells browser this is an HTML document

<head>     → Stores metadata and configuration (not visible on page)
<title>    → Sets the browser tab name
<meta>     → Provides metadata (charset, viewport, SEO info)
<link>     → Links external resources like CSS or favicon
<style>    → Writes internal CSS inside HTML
<script>   → Adds JavaScript functionality

<body>     → Contains all visible content shown to the user

<header>   → Intro or top section of a page or section
<nav>      → Contains navigation links
<main>     → Holds the primary, unique content of the page (only one)
<section>  → Groups related content under a theme
<article>  → Independent, reusable content block
<aside>    → Side or additional related information
<footer>   → Bottom section with copyright or extra links
--------------------------------------------------------------------------------
<h1>–<h6>  → Headings from most important to least
<p>        → Paragraph of text
<a>        → Creates a hyperlink
<img>      → Displays an image
<ul>       → Unordered (bullet) list
<ol>       → Ordered (numbered) list
<li>       → Item inside a list
--------------------------------------------------------------------------------
<form>     → Container for user input data
<input>    → Takes user input (text, email, password, etc.)
<textarea> → Multi-line text input
<select>   → Dropdown list
<option>   → Option inside a dropdown
<button>   → Clickable action button
--------------------------------------------------------------------------------
<div>      → Non-semantic block container (no meaning)
Purpose:
• Used to GROUP multiple elements together
• Helps apply CSS styling or layout to a group
<span>     → Non-semantic inline container (no meaning)
<br>       → Line break
<hr>       → Horizontal line separator

--------------------------------------------------------------------------------
HTML TAG
--------------------------------------------------------------------------------
HTML tags are keywords written inside angle brackets < >. 
They tell the browser how to handle or display content.

Examples:   <p>   </p>     <img>     <input>
--------------------------------------------------------------------------------


HTML TAG vs HTML ELEMENT
--------------------------------------------------------------------------------
Aspect        | HTML Tag (only keyword)        | HTML Element (complete unit)
--------------------------------------------------------------------------------
Meaning       | Keyword only                   | Tag + content
Includes text | ❌ No                          | ✅ Yes
Structure     | Marks boundaries               | Represents content
Example       | <p> </p>                      | <p>Hello</p>
--------------------------------------------------------------------------------

TYPES OF HTML TAGS
--------------------------------------------------------------------------------
1) Paired Tags (Opening + Closing)
   <p>Text</p>        <h1>Heading</h1>        <a>Link</a>

2) Self-Closing Tags
   <img>   <input>   <br>   <hr>   <meta>   <link>
--------------------------------------------------------------------------------


HTML DOCUMENT STRUCTURE
--------------------------------------------------------------------------------
Every HTML page follows this basic structure:

<!DOCTYPE html>   → Declares HTML5 document
<html>            → Root element
  <head>          → Page info (NOT visible)
  <body>          → Visible page content
</html>
--------------------------------------------------------------------------------

<!DOCTYPE html>
<!-- Declares HTML5 document (ALWAYS first line) -->

NOTE: <!DOCTYPE html> = “Use modern rules”
No DOCTYPE = “Use old buggy rules”

<html lang="en">
<!-- Root element + page language (English) -->

<head>
    <!-- PAGE INFORMATION (NOT visible) -->

    <meta charset="UTF-8">
    <!-- utf-8 is Character encoding (supports all languages & symbols) -->

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Enables responsive design on mobile devices -->

    <meta name="description" content="Sample HTML structure page">
    <!-- SEO description -->

    <meta name="author" content="Ajay Sharma">
    <!-- Author information -->

    <title>HTML Complete Structure</title>
    <!-- Browser tab title -->

    <link rel="icon" href="favicon.ico">
    <!-- Website icon -->

    <link rel="stylesheet" href="style.css">
    <!-- External CSS -->

    <style>
        /* Internal CSS (optional) */
    </style>

    <script src="app.js" defer></script>
    <!-- JavaScript (defer = load after HTML parsing) -->

</head>


<body>
    <!-- VISIBLE PAGE CONTENT -->

    <header>
        <!-- Top section of page -->
        <h1>My Website</h1>

        <nav>
            <!-- Navigation links -->
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
        </nav>
    </header>


    <main>
        <!-- Main unique content (ONLY ONE per page) -->

        <section>
            <!-- Grouped related content -->
            <h2>About Us</h2>
            <p>This is a paragraph.</p>
        </section>

        <article>
            <!-- Independent reusable content -->
            <h3>Article Title</h3>
            <p>Article content here.</p>
        </article>

        <section>
            <h2>Form Example</h2>

            <form>
                <input type="text" name="username" placeholder="Enter name">
                <input type="email" name="email" placeholder="Enter email">
                <button type="submit">Submit</button>
            </form>
        </section>

    </main>


    <aside>
        <!-- Side / extra information -->
        <p>Related links</p>
    </aside>


    <footer>
        <!-- Bottom of page -->
        <p>© 2026 My Website</p>
    </footer>

</body>
</html>

----------------------------
---------------------------------------------------------------
Feature            | <section>                  | <article>
---------------------------------------------------------------
Purpose            | Groups related content     | Independent content
Independence       | Not standalone             | Standalone
Meaning            | Part of a page             | Complete piece
Reusability        | Usually not reusable       | Reusable/shareable
Content type       | Topics, categories         | Blog, news, posts
Requires heading   | Usually yes                | Usually yes
SEO importance     | Medium                     | High
---------------------------------------------------------------
<section>
  <h2>Sports News</h2>
  <p>Latest updates about sports...</p>
</section>

<article>
  <h2>India wins match</h2>
  <p>Full news article here...</p>
</article>


METADATA (WHAT DOES IT MEAN?)
--------------------------------------------------------------------------------

In HTML:
Metadata is information ABOUT the web page, not the page content itself.
It tells the browser HOW to interpret, display, and handle the page.

Examples of metadata:
• Page title
• Character encoding
• Viewport (screen scaling)
• SEO information
• Author, description, keywords

Metadata is written inside the <head> tag using <meta>, <title>, <link>, etc.
--------------------------------------------------------------------------------


<meta charset="UTF-8"> — WHAT IS CHARSET?
--------------------------------------------------------------------------------
Charset (Character Set) defines HOW characters are encoded and displayed.

UTF-8 means:
• Universal character encoding
• Supports ALL characters:
  - English letters
  - Numbers
  - Symbols
  - Emojis 😀
  - Hindi, Arabic, Chinese, etc.

Why charset is important:
• Without it, text may appear broken or as ????
• Prevents encoding bugs
• Ensures consistent text display across browsers

Best practice:
<meta charset="UTF-8"> should be the FIRST line inside <head>
--------------------------------------------------------------------------------


<meta name="viewport"> — WHY IT IS CRITICAL
--------------------------------------------------------------------------------
Viewport controls HOW a webpage fits and scales on different screen sizes.

Typical viewport tag:
<meta name="viewport" content="width=device-width, initial-scale=1.0">

What it does:
• width=device-width → Page width = device screen width
• initial-scale=1.0  → No zoom by default

Without viewport:
• Mobile shows desktop-sized page
• Page looks zoomed out
• Layout breaks

With viewport:
• Page adapts to mobile screens
• Responsive CSS works correctly
--------------------------------------------------------------------------------


METADATA vs BODY CONTENT
--------------------------------------------------------------------------------
Metadata (<head>) → Information ABOUT the page (not visible)
Body content      → Actual page content (visible to user)
--------------------------------------------------------------------------------


INTERVIEW ONE-LINERS
--------------------------------------------------------------------------------
• Metadata is data about the web page used by the browser and search engines.
• UTF-8 ensures correct display of all characters and languages.
• Viewport meta tag enables responsive design on mobile devices.
--------------------------------------------------------------------------------

<head> TAG — COMPLETE OVERVIEW + INTERVIEW Q&A
================================================================================
Purpose:
The <head> tag stores PAGE INFORMATION and SETTINGS for the browser.
It does NOT display anything on the webpage. The browser reads <head> BEFORE body.

What <head> contains (one by one):
• <title>   → Text shown on browser tab
• <meta>    → Charset, viewport(screen scaling), SEO information
• <link>    → External CSS files, favicon
• <style>   → Internal CSS
• <script>  → JavaScript files (analytics, config, optional)

Why <head> is important:
• Controls page behavior, responsiveness, encoding
• Helps SEO and accessibility
• Loaded BEFORE body content to configure the page


<head> vs <body>
--------------------------------------------------------------------------------
<head> → Information ABOUT the page (metadata, settings)   → ❌ Not visible
<body> → Actual page CONTENT shown to the user             → ✅ Visible
--------------------------------------------------------------------------------



INTERVIEW Q&A (EXACT)
================================================================================

Q1) What is the purpose of the <head> tag in HTML?
--------------------------------------------------------------------------------
The <head> tag contains METADATA and SETTINGS about the web page.
It tells the browser HOW to handle the page, not WHAT to display.
Nothing inside <head> is directly visible to the user.
--------------------------------------------------------------------------------


Q2) What happens if the <head> tag is missing?
--------------------------------------------------------------------------------
• Browser automatically creates a <head> internally
• Page still loads and works
• Metadata, SEO, charset, responsiveness may break
• Best practice: ALWAYS include <head>
--------------------------------------------------------------------------------


Q3) Why is <meta name="viewport"> critical?
--------------------------------------------------------------------------------
It controls how the page scales on mobile devices.

Without viewport meta:
• Page looks zoomed out
• Layout breaks on small screens

With viewport meta:
• Responsive layouts work correctly
• Page adapts to device width
--------------------------------------------------------------------------------


Q4) Best placement of <script>: <head> or <body>?
--------------------------------------------------------------------------------
• <head>        → For critical scripts (analytics, config)
• End of <body> → BEST for performance (DOM loads first)

Best practice:
<script src="app.js" defer></script>  → Safe in <head>
--------------------------------------------------------------------------------


Q5) One-line interview answer for <head>?
--------------------------------------------------------------------------------
The <head> tag contains metadata and configuration that tells the browser
how to process the page, while the <body> contains visible content.
================================================================================



<body> TAG
--------------------------------------------------------------------------------
Purpose: Contains all visible content. Everything user sees goes here.

Examples:
• Text, images, buttons      • Forms, links, videos      • Header, footer, sections
--------------------------------------------------------------------------------

MANDATORY vs OPTIONAL TAGS INSIDE <head>
================================================================================

MANDATORY HEAD TAGS
--------------------------------------------------------------------------------
1) <title>
• REQUIRED in every HTML document
• Sets the browser tab title
• Used by search engines (SEO)
• If missing → page still loads, but bad practice

2) <meta charset="UTF-8">
• Not strictly mandatory, but considered ESSENTIAL
• Defines character encoding
• Prevents broken text (�, ???)
• Best practice: ALWAYS include and place it first
--------------------------------------------------------------------------------


OPTIONAL (BUT IMPORTANT) HEAD TAGS
--------------------------------------------------------------------------------
<meta name="viewport">
• Required for responsive design
• Critical for mobile devices

<meta name="description">
• Helps SEO
• Shown in search engine results

<link>
• Used for external CSS, favicon
• Optional but very common

<style>
• Internal CSS
• Optional (used when not using external CSS)

<script>
• JavaScript files
• Optional (depends on page needs)
--------------------------------------------------------------------------------


INTERVIEW ONE-LINER (MANDATORY VS OPTIONAL)
--------------------------------------------------------------------------------
Only <title> is mandatory in the <head>, but <meta charset> and viewport are
strongly recommended best practices for correct rendering and responsiveness.
================================================================================



WHY ONLY ONE <main> IS ALLOWED
================================================================================
Rule:
• An HTML document must have ONLY ONE <main> element

Reason:
• <main> represents the PRIMARY content of the page
• Screen readers rely on <main> to jump directly to main content
• Multiple <main> tags confuse accessibility tools

What <main> should contain:
• Content unique to the page
• Excludes header, footer, nav, aside

What <main> should NOT contain:
• <header> (page-level)
• <footer>
• <nav>
• Another <main>
--------------------------------------------------------------------------------


INTERVIEW EXPLANATION (VERY IMPORTANT)
--------------------------------------------------------------------------------
<header> / <nav> / <footer> → Reusable layout sections
<main>                     → ONE unique content area per page
--------------------------------------------------------------------------------


INTERVIEW ONE-LINER (MAIN TAG)
--------------------------------------------------------------------------------
Only one <main> is allowed because it represents the single primary content
area of the page and is required for accessibility and semantic clarity.
================================================================================



<head> vs <header>
--------------------------------------------------------------------------------
Tag       | Purpose                        | Visible
--------------------------------------------------------------------------------
<head>    | Page metadata & settings       | ❌ No
<header>  | Page or section heading area   | ✅ Yes
--------------------------------------------------------------------------------


SEMANTIC HTML (BEST PRACTICE)
--------------------------------------------------------------------------------
Semantic HTML uses meaningful tags that describe their purpose clearly.
This helps browsers, search engines (SEO), and screen readers (accessibility).
--------------------------------------------------------------------------------


COMMON SEMANTIC ELEMENTS
--------------------------------------------------------------------------------
These tags clearly describe WHAT the content is.

<header>   → Intro / top area of page or section
<nav>      → Navigation links
<main>     → Primary content of the page (ONLY ONE)
<section>  → Thematic grouping of related content
<article>  → Independent, reusable content
<aside>    → Side / extra related content
<footer>   → Bottom info (copyright, links)

<h1>–<h6>  → Headings (importance levels)
<p>        → Paragraph of text
<ul> / <ol>→ Lists
<li>       → List item
<form>     → Form container
<button>   → Clickable action

-Using <figcaption> inside <figure> (Semantic).

<figure>
  <img src="tim.png" alt="Tim Berners-Lee">
  <figcaption>Born: 1955</figcaption>
</figure>


<figure> → groups image and caption

<figcaption> → text associated with the image


One-line summary:
Semantic elements explain content meaning; non-semantic only wrap content.

--------------------------------------------------------------------------------


SEMANTIC vs NON-SEMANTIC
--------------------------------------------------------------------------------
Non-semantic:   <div>Profile</div>
Semantic:       <header>Profile</header>

Key Point:
All semantic elements are HTML elements, but NOT all HTML elements are semantic.
--------------------------------------------------------------------------------


FORM CONCEPT (EASY ANALOGY)
--------------------------------------------------------------------------------
Think of form data like a Java Map:

Map<String, String> formData;
formData.put("email", "ajay@gmail.com");

HTML equivalent:
<input name="email" value="ajay@gmail.com">

"name" → key          "user input" → value
--------------------------------------------------------------------------------


RADIO BUTTON RULE
--------------------------------------------------------------------------------
• Radio buttons with SAME name belong to one group
• Only one option can be selected
• "value" is what gets sent to the server
• Without value, browser sends "on"
--------------------------------------------------------------------------------


ONE-LINE INTERVIEW DEFINITION
--------------------------------------------------------------------------------
HTML is a markup language used to define the structure and content of web pages using elements and tags.
================================================================================
