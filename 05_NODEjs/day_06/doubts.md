====================================================================
DOUBT 1 : Number(req.params.id) vs parseInt(req.params.id)
====================================================================

Q. Which one should I use for route parameters and why?

Number()
--------------------------------------------------------------------
• Converts the entire string into a number.
• Returns NaN if any invalid character exists.

Examples:
Number("10")      → 10
Number("10.5")    → 10.5
Number("10abc")   → NaN
Number("abc")     → NaN

parseInt()
--------------------------------------------------------------------
• Reads the string until it encounters a non-digit character.
• Ignores everything after that.

Examples:
parseInt("10")      → 10
parseInt("10.5")    → 10
parseInt("10abc")   → 10
parseInt("abc")     → NaN

Which is preferred?
--------------------------------------------------------------------
For route parameters (/:id), prefer:

const id = Number(req.params.id);

Reason:
• Route IDs should be completely numeric.
• Number() rejects invalid values like "10abc" by returning NaN.
• parseInt() would incorrectly accept "10abc" as 10.

Interview Answer
--------------------------------------------------------------------
Use Number(req.params.id) for route IDs because it validates the
entire value. If the parameter contains any invalid characters,
it returns NaN instead of partially converting the value.



====================================================================
DOUBT 3 : Why does res.json({ employee }) work?
====================================================================

Q. JSON requires key-value pairs. Why can I write only employee?

Normal way
--------------------------------------------------------------------
res.json({
    employee: employee
});

ES6 Object Property Shorthand
--------------------------------------------------------------------
If the property name and variable name are the same, JavaScript
allows a shorter syntax.

res.json({
    employee
});

Both statements are exactly the same.

Example
--------------------------------------------------------------------
const name = "Ajay";
const city = "Jammu";

const obj = {
    name,
    city
};

Equivalent to:

const obj = {
    name: name,
    city: city
};

When shorthand cannot be used
--------------------------------------------------------------------
If the property name is different from the variable name:

const employee = {...};

res.json({
    data: employee
});

You must write "data: employee" because the names differ.

Interview Answer
--------------------------------------------------------------------
{ employee } is ES6 object property shorthand. It is equivalent to
{ employee: employee } and can be used only when the property name
and variable name are identical.