# Planning

Requirements are test focused: unit test and integration test.

## Sign in

User action: enter credentials and submit

### Unit test:

- `onChange` event on two inputs, get the expected input result

### Integration test

- on submit, mock the result for testing, depends on the responded data, show the error/process sign in

## Share movie

For signed in users only

### Unit test:

- Share button render correctly
- Onclick showing the dialog
- Dialog render correctly
- Dialog content render correctly, inlcuding input and submit button

### Integration test

- Click on share button to show dialog
- on submit url inside the dialog

## See movie list

### Unit test

- Render item correctly

### Integration test

- Render items correctly

# High level steps

The tech stack I will use for this:

- Firebase
- ReactJS + MUI + react-testing-library
- Github Actions

We will follow these steps:

- Data modeling. For this simple test, client-side and server-side has the same data model, no conversion.
- Init Firebase project
- Write test cases
- Implement coding and tests
