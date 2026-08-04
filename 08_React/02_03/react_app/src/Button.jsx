function handleClick() {
    console.log('Hello!')
}
function Button() {

    return (
        <div>
            <button onClick={handleClick}>
                Click Me
            </button>
        </div>
    )
}

export default Button;

/* why two functions?

Button Component
        │
        ├── Creates the button
        │
        └── Says:
             "If someone clicks this button,
              call handleClick()."
              

              When React renders the page:

<Button />

React executes only:

Button();

which returns:

<button onClick={handleClick}>
    Click Me
</button>

Notice that handleClick is not executed yet.

Only when the user clicks the button does React call:

handleClick();

which prints:

Hello!
              */