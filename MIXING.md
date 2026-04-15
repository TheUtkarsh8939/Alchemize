## Mixing System
Here are 3 example currencies:

- X = 4$/hr
- Y = 4.5$/hr
- Z = 5$/hr

Base conversion:

- 1 point of X = 4$ Potion Mix
- 1 point of Y = 4.5$ Potion Mix
- 1 point of Z = 5$ Potion Mix

### How the bonus works
When you convert lower-value currency together with higher-value currency, part of the lower-value amount is upgraded to the higher rate.

The number of upgraded points is limited by the amount of higher-value currency in that conversion.

Example:

- Converting 2 points of X + 1 point of Y:
	- Separate conversion value: 2 x 4 + 1 x 4.5 = 12.5$
	- Mixed conversion value: 1 x 4 + 1 x 4.5 + 1 x 4.5 = 13$
	- Bonus: 0.5$

Why this cap exists:

- If X is mixed with Y, X can be valued at 4.5$/hr instead of 4$/hr.
- But only up to the number of Y points in that conversion can receive that upgrade.
- This prevents using 1 point of Y to boost all X points.

Example:

- Converting 5 points of X + 2 points of Y:
	- 3 points of X at normal rate (4)
	- 2 points of X at upgraded rate (4.5)
	- 2 points of Y at normal rate (4.5)
	- Total: 3 x 4 + 2 x 4.5 + 2 x 4.5 = 30$
	- Separate conversion value: 5 x 4 + 2 x 4.5 = 29$
	- Bonus: 1$

### Bonus chart

- X can receive a bonus when mixed with Y or Z. With Y, X is upgraded to 4.5$/hr. With Z, X is upgraded to 5$/hr.
- Y can receive a bonus when mixed with Z. Y is upgraded to 5$/hr.
- Z cannot receive a bonus because it is already the highest-value currency.

### More examples

- Converting 3 points of Y + 2 points of Z:
	- 1 point of Y at normal rate (4.5)
	- 2 points of Y at upgraded rate (5)
	- 2 points of Z at normal rate (5)
	- Total: 1 x 4.5 + 2 x 5 + 2 x 5 = 24.5$
	- Separate conversion value: 3 x 4.5 + 2 x 5 = 23.5$
	- Bonus: 1$

- Converting 4 points of X + 3 points of Z:
	- 1 point of X at normal rate (4)
	- 3 points of X at upgraded rate (5)
	- 3 points of Z at normal rate (5)
	- Total: 1 x 4 + 3 x 5 + 3 x 5 = 34$
	- Separate conversion value: 4 x 4 + 3 x 5 = 31$
	- Bonus: 3$