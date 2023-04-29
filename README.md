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

# Implementation

Thanks to the Firebase and MUI, the backend and frontend become easier to achieve. Here are high level steps I did:
- Set up a new Firebase project, just follow the guide
- Choose the region of the project is "asia"
- Create a new database, and setup Firebase Authentication, init Firebase hosting
- Follow the above plan

The time I spent for the whole process:
- Planning: around 2 hours
- Setup architecture: around 1 hour
- Implement: around 1 day
- Unit test, then integration test: around 1 day

So I finished this project in around 2.5 days

# Problems and solutions

Even with the simplest thing, if we think different, everything become problems.
First and foremost, why did I choose Firebase:
- Serverless
- Real-time
- Painless in setup the connection between frontend and the backend
- No need any complex state management like Redux, manage the Firebase real-time database is state management.
- Simple, till now I don't see any kind of problems that Firebase can not solve.

And for the Material UI:
- Flexibility
- Powerful, robust component system
- Can customize every pieces, can do everything in fact.

There are some disadvantages (maybe) of Firebase and MUI:
- Some people don't like Firebase
- Some people feel it's stupid when let the frontend view decide the data model, and manipulate the data directly. They think the right way to do is having a "backend" between.
- MUI based on "CSS-in-JS" approach may cause performance problem


Yeah but in fact, those are not problem to me. There is no perfect thing at all, the only suitable approach is using the right tool for the the right problem.

## Authentication

At the first look, the requirement is authenticate using "username" and "password". Firebase authentication does not support authentication by username.

Solution: using "email and password" approach.
Pros: simple, ready to go with Firebase Authentication, no additional steps
Cons: user can not forgot the password.

But in fact, in a real production application, we will never use username as the identity of an user.

## Firebase real-time database

In order to work with Firebase real-time database or Firestore, the first thing we need to do is changing the mindset, how to work with it. One of the best practices is having the security rules to protect the data from the client side because the client side can manipulate database directly.

Here is the Firebase security rules

```
{
  /* Visit https://firebase.google.com/docs/database/security to learn more about security rules. */
  "rules": {
    ".read": false,
    ".write": false,
    
    "test": {
			".read": true
    },
    
    "movies": {
      ".read": true,
      ".write": "auth !== null"
    }
  }
}
```

The `movies` collection is the place where I store all Youtube video urls, the data structure is just simple a single `url` field in each object.

## Testing

I am not much experienced with testing since I wrote tests in the past just acceptable.
Why do I choose "react-testing-library"?
Because it's philosophy, testing as the real end user, not by the implementation.

# Live site

https://interview-test-share-videos.web.app/
