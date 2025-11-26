# Wallet App (Expo)

This application is a simple personal wallet built with **React Native
(Expo)**. Users can add their transactions, categorize them, and view
monthly and yearly reports. The backend is deployed on Liara and
communicates through a REST API.

## Features

-   Add income and expense transactions
-   Categorize transactions
-   View monthly and yearly financial reports
-   Sync with backend API
-   Simple and clean UI built with Expo

## Tech Stack

-   React Native (Expo)
-   React Navigation
-   Axios
-   Backend: Node.js + MongoDB
-   Backend URL: https://walletapi.liara.run/

## Installation

    git clone https://github.com/ate-na/wallet
    cd wallet-frontend
    npm install
    npm start

## Environment Variables

Create a `.env` file:

    API_BASE_URL=https://walletapi.liara.run


## Project Structure

    /src
      /components
      /screens
      /navigation
      /services
      /context
      /utils
    App.js

## Build Files (APK / AAB)

Add your production build link here:

https://github.com/ate-na/wallet/releases/tag/v1.0.0

## Running on Device

Install **Expo Go** and scan the QR code after running the development
server.

## Building Release

Classic build:

    expo build:android
    expo build:ios

Using EAS:

    eas build -p android
    eas build -p ios

## Backend Repository

https://github.com/ate-na/wallet-backend.git

## License

MIT
