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