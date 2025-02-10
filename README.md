# WorldWise
WorldWise is a geolocation-based React application that helps you track your adventures around the world. It allows you to record and display the cities you've visited, making it easy to showcase your travels and memories.

## Live View
### https://worldwise-frontend-eight.vercel.app/

## Features
- World Map Tracking: Visualize the cities you've visited on an interactive map.
- City Tracking: Record and save cities you've traveled to, including notes and location details.
- User Authentication: Secure login functionality to store and access personal travel data.
- Responsive Design: Currently in progress to ensure mobile compatibility and responsiveness across devices.

## Installation
To get started with WorldWise, follow these steps:

### 1. Clone the repository:
 ```bash
 https://github.com/BESUFKADMEKONNEN/WorldWise.git
```
### 2. Navigate to the project directory:
 ```bash
 cd worldwise
```
### 3. Install dependencies:
 Make sure you have Node.js installed. Then, run:
  ```bash
 npm install
```
### 4. Development
 To start a local development server with live reloading, use:
  ```bash
 npm run dev
```
 **This command will start the development server and open your project in the default web browser, allowing you to see changes in real-time.**

### 5. Building for Production
 To create a production build of the project, use:
  ```bash
 npm run build
```
 **This command will generate a production-ready build and place the output in the ./dist directory.**

### 6. Usage
 Open the application in your browser to start tracking your adventures. Use the login page to sign in, and start adding the cities you've visited along with your notes and location details.


## Notice  
### - You need **MongoDB** and **MongoDB Compass** installed to run the project locally.  
### - To use the embedded JSON file instead of MongoDB, run:

  ```bash
npm run server
```
### - If running locally, change the **base URL** in `src/context` files to:
http://localhost:9000

Author
Besufkad Mekonnen
