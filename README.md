<h1 align="center">
  <br>
  <a href="https://github.com/42SwiftyCompanion/swifty-companion"><img src="https://user-images.githubusercontent.com/52678976/234002991-b6c6fd26-441a-4c52-b15c-2d34cc617a78.png" alt="42 Swifty Companion" width="300"></a>
  <br>

  42 Swifty Companion
  <br>
</h1>

<h4 align="center">A mobile app that retrieves student data from 42's API.</h4>

<p align="center">
  <a href="#introduction">Introduction</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#license">License</a>
</p>

<!-- ![screenshot](https://raw.githubusercontent.com/amitmerchant1990/electron-markdownify/master/app/img/markdownify.gif) -->

## Introduction

Welcome to my app, developed using React Native! This is a cross-platform mobile application that can be run on both iOS and Android devices. The app provides users with a seamless and convenient way to connect to 42's intra and manage their account information.

With my app, users can securely authenticate with their 42 intra credentials using OAuth2.0 protocol, and access their personal information, such as their profile picture, campus location, and academic progress.

I've implemented several features to enhance the user experience, including a bottom navigation bar for easy navigation between different sections of the app, a loading spinner to indicate when data is being fetched from the API, and form validation using React Hook Form and Yup to ensure that user input is accurate and complete.

My app also leverages the power of the Expo framework, which allows for easy deployment of the app to both iOS and Android devices. To get started, simply follow the instructions provided in the "How To Use" section to clone and run the app on your local machine.

I hope you enjoy using my app and find it to be a useful tool for managing your 42 intra account!

## Key Features

  <img align="right"  width="220" height="300" src="https://user-images.githubusercontent.com/52678976/233999765-a99b4a42-c62f-468b-94f9-ecbb4ebc0ab9.png" alt="Swifty Companion"/>
 
  - User authentication with 42's intra (42 API OAuth)
  - AuthContext and Refresh Token for handling authentication
  - Stack Navigator and Bottom Navigation for navigation
  - Loading component for better user experience
  - Form validation using React Hook Form and Yup
  - Display user profile, including picture, level, and skills
  - Display user's projects, with links to their git repos
  - Display user's campus location
  - Search for other users and display their profiles

  
## How To Use

To run this app on your local machine, follow these steps:

1. Clone this repository
2. Install dependencies by running `npm install`
3. Create an `.env` file at the root of the project with the following contents:
```AUTH_ENDPOINT=https://api.intra.42.fr/oauth/authorize
CLIENT_ID=<your_client_id>
CLIENT_SECRET=<your_secret_id>
TOKEN_URL=https://api.intra.42.fr/oauth/token
SCOPES=public%20projects%20profile
```
4. Replace `YOUR_CLIENT_ID` and `YOUR_CLIENT_SECRET` with your own 42 API OAuth credentials, which can be obtained from the [42 API website](https://api.intra.42.fr/apidoc/guides/web_application_flow).
5. Run the App  
  - Run the app for iOS `npm run ios`
  - Run the app for Android `npm run android`
  - If using Expo `npx expo start`
6. Follow the instructions in the console to launch the app on your device or simulator


## License

MIT
