---
title: "Dynamic templates"
meta_title: ""
description: ""
date: 2025-04-04T05:00:00Z
layout: templates
weight: 4
draft: false
---

## Why we need dynamic templates

This section will introduce you to EUmails template logic that you can use both with EUmails build-in template editor and with your HTML templates. The main idea is that you have a template with your email design and within that template you can put some substitution tags that EUmail can replace with the merge data you provide.

You provide this information from your system when you call the EUmail API and EUmail will merge it into your template before sending the email. For development purposes you can also define merge data within the editor.

EUmail implements a modified set of “instructions” based on the Handlebars library.

By this we mean that most of the instructions defined in the Handlebars library will work as in other applications using the same library, while we have chosen to improve others in EUmail.

Usually this means that the standard Handlebar instruction will work, but we have added an improved version also.

## How it works

You will need two things to use EUmail for production purposes:

- A template with your email design
- Merge data in JSON format

The template can reside in EUmail or you can provide it in the call to the EUmail API. The JSON merge data is optional, but most transactional emails have some kind of variable fields so it rarely makes sense to send a transactional email without some merge data like a name, username or email.

**merge data + template = final email**

Example of some merge data in JSON format:

```json
{

	"mergedata": 

	{

		"vehicle_variant": "Convertible",

		"is_fourwheel": true

	}

}
```

Example of a template with the above fields

```html
<table>

  <thead>

    <th>Parameter</th>

    <th>Value</th>

  </thead>

  <tr>

    <td>Variant:</td>

    <td>{{vehicle_variant}}</td>

  </tr>

  <tr>

    <td>Four wheel drive:</td>

    <td>{{#if is_fourwheel}}YES {{else}}NO {{/if}}</td>

  </tr>

</table>
```

Result HTML:

| Parameter           |  Value          |
| ------------------- | :-----------:   | 
| Variant:            |  Audi R8 Spider | 
| Four wheel drive:   |  YES            |  

### Variable substitution

Simple substitution is the most basic form of substitution – or the use of variables.

Example template:
```text
Hello {{firstname}}
```

Example data:
```json
{

	"firstname":"Jane Doe"

}

```

Result output:
```text
Hello Jane Doe
```

### Statements

#### IF condition

The IF statement is a fundamental concept in programming and is widely used. It allows you to make decisions and control the flow of your code based on certain conditions. By evaluating a specific condition, the IF statement determines whether to execute a block of code or not. If the condition is true, the code within the IF statement is executed; otherwise, it is skipped. This enables you to create dynamic and responsive web templates that display content or perform actions based on specific criteria or user input.

##### Simple IF statement

```html
{{#if is_raining}}

Show this paragraph when variable 'is_raining' is true

{{/if}}
```



##### IF statement - comparison

```html
{{#if weather=="raining"}}

Show this paragraph if variable "weather" equals "raining"

{{/if}}
```

##### IF - ELSE statement
```html
{{#if weather=="raining"}}

Show this paragraph if variable "weather" equals "raining"

{{else}}

Show this if variable "weather" is not "raining"

{{/if}}
```

### UNLESS Conditions

The UNLESS statement is a conditional construct that allows you to execute a block of code only if a specific condition is false. It provides an alternative way to handle situations where you want to perform an action or display content when a condition is not met. It’s like saying “do this unless that condition is true.” The “unless” statement offers flexibility in controlling the flow of your template based on the negation of a condition.

```html
{{#unless is_raining}}

Show this paragraph when 'is_raining' is false

{{/unless}}
```

### EACH loop

The EACH statement is a construct that allows you to iterate over a collection or array of data and generate dynamic content based on each item in the collection. It provides a way to loop through elements and repeat a block of code for each item in the collection. This is particularly useful for generating lists, tables, or other repetitive structures in your HTML output. The EACH statement simplifies the process of displaying multiple items by automatically handling the iteration logic for you.


##### Template

```html
<ul>

{{#each cheeses}}

<li>{{this}}</li>

{{/each}}

</ul>
```

##### Merge data

```json
{

"cheeses":["Havarti","Emmentaler"]

}
```

##### Output

```html
<ul>

    <li>Havarti</li>

    <li>Emmentaler</li>

</ul>
```
You can use the optional else tag to handle the situation where there is no elements in the list.

```html
{{#each sections}}

<p>{{this}}</p>

{{else}}

<p>The sections list is empty</p>

{{/each}}
```

### Boolean operators

Boolean operators are used in combination with other statements - often the IF og UNLESS statements.

Boolean operators are used in programming and logic to combine or modify conditions. They help evaluate the truthiness or falsiness of expressions and make decisions based on them. The two boolean supported by EUmail are “AND” and “OR”.

Boolean operators are used to create complex conditions and control the flow of code execution in programming. They enable you to make decisions based on the combined truth or falsity of multiple conditions.

### OR operator


The OR logic operator allows you to combine multiple conditions and evaluates to true if at least one of the conditions is true. In other words, it provides an “either/or” scenario.

Let’s consider a simple example:

1. Condition 1: It’s raining outside.
2. Condition 2: It’s sunny outside.

Using the OR operator, we can create the following logical statement:

Condition 1 OR Condition 2

If either Condition 1 (raining) or Condition 2 (sunny) is true, the entire statement will evaluate to true. It means that as long as one of the conditions is met, the overall result will be true.

For instance:

- If it’s raining outside (Condition 1 is true), the statement evaluates to true.
- If it’s sunny outside (Condition 2 is true), the statement evaluates to true.
- If it’s both raining and sunny outside, the statement still evaluates to true because at least one of the conditions is true.

The OR operator is useful when you want to perform an action or make a decision based on multiple possibilities, and you only need one of those possibilities to be true.

With the OR operator you can evaulate a statement with two (and only two) parameters. If one of the two operators are true then the statement itself is true.

**Example 1**
```html
{{#if (OR is_raining is_sunny)}}

Display this if the variable 'is_raining' or the variable 'is_sunny' are true

{{/if}}
```

**Example 2**

```html
{{#if (OR weather=="raining" weather="sunny")}}

Display this if the variable weather is "raining" or "sunny".

{{/if}}
```

### AND operator

The AND logic operator allows you to combine multiple conditions and evaluates to true only if all the conditions are true. It provides a “both/and” scenario.


Let’s consider a simple example:

1. Condition 1: It’s raining outside.
2. Condition 2: I have an umbrella.


Using the AND operator, we can create the following logical statement:

Condition 1 AND Condition 2

For the entire statement to evaluate to true, both Condition 1 (raining) and Condition 2 (having an umbrella) must be true. If either one of the conditions is false, the overall result will be false.

For instance:

If it’s raining outside (Condition 1 is true) and you have an umbrella (Condition 2 is true), the statement evaluates to true.

If it’s not raining outside (Condition 1 is false), regardless of whether you have an umbrella or not, the statement evaluates to false.

If it’s raining but you don’t have an umbrella (Condition 2 is false), the statement also evaluates to false. The AND operator is useful when you want to ensure that all specified conditions are met before taking an action or making a decision. It requires all conditions to be true for the overall result to be true.

**Example 1**
```html
{{#if (AND is_raining has_umbrella)}}

Display this if the variable 'is_raining' AND the variable 'has_umbrella' are both true

{{/if}}
```

**Example 2**

```html
{{#if (AND weather=="raining" equipment="umbrella")}}

Display this if the value of variable "weather" is "raining" 

and the value of the variable "equipment" is "umbrella". 

{{/if}}

```

### Nested OR and AND operators

The AND and OR operators can only take two arguments each. If you need more arguments you will need “nested” operators.

Nested operators allow you to combine multiple conditions together to make decisions. You can use “AND” to require multiple conditions to be true, and “OR” to consider at least one condition to be true. By nesting these operators, you can create complex conditions that consider different combinations of statements.

**Example of nested OR**

```html
{{#if (OR is_raining (OR is_snowing is_thunder)}}

Display this if the value of "is_raining", "is_showing" or "is_thunder" are true.

{{/if}}
```

**Example of nested AND**
```html
{{#if (AND is_raining (AND is_snowing is_thunder)}}

Display this if the value of all three variables "is_raining", 

"is_showing" and "is_thunder" are true.

{{/if}}
```

### Combining operators


When using logic operators like OR and AND in combination, parentheses must be used to group conditions and control the order of evaluation. By using parentheses, you can create more complex and precise logic expressions. For example, you can prioritize certain conditions over others or specify the relationship between different groups of conditions. It ensures that the logical operations are performed in the intended order and helps clarify the logic of your statements.

```html
{{#if (OR (AND is_raining has_umbrella) (AND is_snowing has_wintercoat))}}

Display this if the value if it is safe to go out. 

This because it is raning, but you have an umbrella or is it showing, 

but you have a winter coat.

{{/if}}
```

{{< notice "warning" >}}
The OR and the AND operators are case-sensitive and MUST be writtern in uppercas
{{< /notice >}}

### HTML Escaping

HTML escaping in web templates is a technique used to ensure that user input or dynamic data is displayed as intended without causing issues or security vulnerabilities. It involves converting special characters in the data into their corresponding HTML entities, which prevents them from being interpreted as code and potentially disrupting the structure or functionality of the webpage.

Use triple handlebars to escape parsing of the merge-data. You can use this to include any HTML without it being interpreted.

```html
{{{body}}}
```