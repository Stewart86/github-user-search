This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

A demo of this project can be found [here](http://oddle-github-user-search-stewart.s3-website-ap-southeast-1.amazonaws.com/).

Below you will find some information on how to perform common tasks.<br>
For more infomation on create-react-app, you can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Table of Contents

- [Setting up](#setting-up)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
  - [npm run eject](#npm-run-eject)
- [How it works](#how-it-works)
  - [Login to your GitHub account](#login-to-your-github-account)
  - [Privacy concern with your login credential](#privacy-concern-wtih-your-login-credential)
  - [User Search](#user-search)
  - [User Profile](#user-profile)


## Setting up

To set up this project make sure that you have node.js installed. clone this repository 

    $ git clone https://github.com/Stewart86/github-user-search.git

and install the dependencies with

    $ npm install

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## How it works

you can find a demo of this app [here](http://oddle-github-user-search-stewart.s3-website-ap-southeast-1.amazonaws.com/).

### Login to your GitHub account

Without logging in to your GitHub account, the API requests that is allowed are significantly lower. So for better experience, please login.

### Privacy concern with your login credential

This page login to GitHub via basic authentication by encoding your userid and password with base64, which can be easily decoded. To safe guard your credentials, please make sure your are logged out after use.

your encoded credentials is saved in the session storage of your local machine. By logging out, this varible will be removed from your session storage.

### User Search

Typing in the search box will dynamically search GitHub user as you type. 

To reload the search, simple delete one character and entering back.

### User Profile

By clicking on the user you will be directed to the profile page of the user. 

2 similar lists like the user search will be shown except it is reflecting the user's followers and following. Clicking on the list will again direct you to that user's profile.

Clicking on the user's name will direct you to their profile on GitHub, as well as their repositories will direct to their repositories on GitHub.

