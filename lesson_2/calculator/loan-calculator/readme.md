# Mortgage / Car Loan Calculator

Take everything that you've learned so far and build a mortgage calculator (or car payment calculator -- it's the same thing).

You'll need three pieces of information:

- the loan amount
- the Annual Percentage Rate (APR)
- the loan duration

From the above, you'll need to calculate the following two things:

- monthly interest rate
- loan duration in months
- You can use the following formula:

Mortgage Calculator Formula

Translated to JavaScript, the formula looks like this:

```javascript
let m = p * (j / (1 - Math.pow(1 + j, -n)));
```

m = monthly payment
p = loan amount
j = monthly interest rate
n = loan duration in months

When you write your program, don't use the single-letter variables m, p, j, and n; use explicit names. For instance, you may want to use loanAmount instead of p.

Try to print the payment amount as a dollar and cents amount, e.g., $123.45 or $371.00.

Finally, don't forget to run your code through ESLint. Also, consider asking for a code review after you've reviewed your code against the possible solution, and made any adjustments that you need to make.

## Mental Model

Given a loan amount, Annual Percentage Rate (APR), and loan duration return the monthly interest rate and loan duration in months.

The formula for calculating loans is

```javascript
let monthlyPayment =
  loanAmount *
  (monthlyRate / (1 - Math.pow(1 + monthlyRate, -loanDurationMonths)));
```

To calculate monthly interest rate from APR

```javascript
let monthlyRate = annual100Rate / loanDurationMonths / 100;
```

## Expected Input and Output

### Input:

loanAmount = 100
annualPer100Rate = 5
loanDuration = 12

### Output:

monthlyRate = 0.0041
monthlyPayment = $8.56

## Data Structure

- I need a variable to hold monthlyRate after computing from APR / duration / 100
- I can run the computation for monthly payments after that
- use `Number.prototype.toFixed()` to limit decimal places for the monthly payment and interest rate before returning/displaying

## Algorithm

START

// Given a number called loanAmount, a number called annualRate, and a number called loanDurationMonths

SET monthlyRate = annualRate / loanDurationMonths / 100

SET monthlyPayment = loanAmount \* (monthlyRate / (1 - Math.pow((1 + monthlyRate), (-loanDurationMonths))));

PRINT 'Your monthly payment is $' + monthlyPayment.toFixed(2), the monthly interest rate is monthlyRate.toFixed(4)

END
