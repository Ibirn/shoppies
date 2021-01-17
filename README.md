# The Shoppies

A simple mock-up single-page application that searches the OMDB API and allows you to choose up to five movies to nominate for the Shoppies awards.

## Setup

Install dependencies with `npm install`.

Dependencies include:

- axios: ^0.21.1
- node-sass: ^4.14.1
- react: ^17.0.1
- react-cookie: ^4.0.3
- react-dom: ^17.0.1
- react-scripts: 4.0.1

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Technical Requirements

- Searches the OMDB API for results via title.
- Up to five films can be nominated with the plus-button on each list item.
- New searches create new lists of nominatable films.
- Movies can be removed from the nominations with the minus button on each list item.
- A banner displays thanking users for their choices at 5 nominations.
- Simple use of cookies to save lists of nominations.
- Error handling for empty or unacceptable strings.

## Screenshots

!["Empty Splash"](https://github.com/Ibirn/shoppies/blob/main/docs/splash.png)
!["Nominations"](https://github.com/Ibirn/shoppies/blob/main/docs/nominations.png)
!["Error"](https://github.com/Ibirn/shoppies/blob/main/docs/error.png)
!["Completed"](https://github.com/Ibirn/shoppies/blob/main/docs/complete.png)
