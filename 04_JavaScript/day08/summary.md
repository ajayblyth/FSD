----------------------------------------------------------------------------------------------------
FUNCTIONS IN JAVASCRIPT (SUMMARY)
----------------------------------------------------------------------------------------------------

What is a Function?

• A reusable block of code that performs a specific task.
• Runs only when it is called (invoked).
• Helps reduce repetition and organize code.
• Improves readability and modularity.

----------------------------------------------------------------------------------------------------
Function Definition & Calling

• Defined using: function functionName() { }
• Calling means executing it using: functionName()
• Definition creates the function.
• Calling runs the code inside it.

----------------------------------------------------------------------------------------------------
Functions with Arguments

• Arguments are values passed into a function.
• They act as inputs.
• Syntax: function name(arg1, arg2) { }
• Allows dynamic and reusable logic.

----------------------------------------------------------------------------------------------------
Return Keyword

• return sends a value back from the function.
• It acts as the output.
• Stops function execution after it runs.
• Makes function results usable elsewhere.

----------------------------------------------------------------------------------------------------
SCOPE IN JAVASCRIPT (SUMMARY)
----------------------------------------------------------------------------------------------------

Definition of Scope

• Scope determines variable accessibility.
• Controls where variables can be used.
• Prevents unwanted access or conflicts.
• Depends on where variables are declared.

----------------------------------------------------------------------------------------------------
1️⃣ Global Scope

• Declared outside all functions/blocks.
• Accessible everywhere in the program.
• Can be used inside functions.
• Risk of conflicts if overused.

----------------------------------------------------------------------------------------------------
2️⃣ Function Scope

• Declared inside a function.
• Accessible only inside that function.
• Cannot be accessed outside.
• Helps in data privacy.

----------------------------------------------------------------------------------------------------
3️⃣ Block Scope

• Declared with let or const inside { }.
• Accessible only inside that block.
• Applies to if, for, while, etc.
• var does NOT follow block scope.

----------------------------------------------------------------------------------------------------
4️⃣ Lexical Scope

• Inner functions can access outer variables.
• Scope is determined by where function is defined.
• Variable lookup flows outward (Parent → Global).
• Outer cannot access inner variables.

----------------------------------------------------------------------------------------------------