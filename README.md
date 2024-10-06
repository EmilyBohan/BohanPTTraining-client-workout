# MERN Stack Template for Full Stack Apps

A template for building full-stack web applications using the MERN stack. 

Live site can be found here: [mern-template](https://mern-template-six.vercel.app/)

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup](#setup)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
5. [Environment Variables](#environment-variables)
6. [Running Locally](#running-locally)
7. [Deploying Live](#deploying-live)
   - [Hosting Server Side on Render](#hosting-server-side-on-render)
   - [Hosting Client Side on Vercel](#hosting-client-side-on-vercel)
8. [Contributing](#contributing)
9. [Contact](#contact)

## Introduction
This template provides a starting point for developing full-stack web applications with `React.js` & `TailwindCSS`.  Think of it as an empty canvas with all the tools built in for you to start your own project. It includes user authentication with `passport-local` and sets up a client-server architecture where React.js is used for the frontend, built with Vite, and `Node.js` with `Express` and `MongoDB` for the backend. The backend is inspired by the 100Devs [[binary-upload-boom](https://github.com/100devs/binary-upload-boom)] template, featuring enhanced error handling tailored for separate client and server folders, and a modern development workflow.

## Features
- User authentication
- Separate client and server setup
- Ready-to-use structure for building on top of

## Technologies Used
- MongoDB/Mongoose
- Express.js
- React.js
- Node.js
- TailwindCSS
- Cloudinary
- Passport-Local


## Setup

### Prerequisites
- Node.js installed
- MongoDB installed or a MongoDB Atlas account
- Vercel account
- Render.com account

### Installation
1. Clone the repository into your preferred folder:
    ```bash
    git clone https://github.com/ervinCodes/MERN-template.git
    ```
2. Navigate to the project folder:
    ```bash
    cd MERN-template
    ```
3. Split your terminal and navigate to the server folder on one panel:
    ```bash
    cd server
    ```
4. Install server dependencies:
    ```bash
    npm install
    ```
5. In the other terminal panel, navigate to the client folder:
    ```bash
    cd client
    ```
6. Install client dependencies:
    ```bash
    npm install
    ```

## Environment Variables
Create a `.env` file in the `/server/config` folder and add the following variables:

```

DB_STRING = [your database URI, no quotes needed]

PORT = 5050 [could be any]

CLOUD_NAME = [your Cloudinary cloud name]

API_KEY = [your Cloudinary API key]

API_SECRET = [your Cloudinary API secret]
```

## Running Locally

### Running
1. You should have the split terminal still open with one on the `/client` directory and the other in the `/server` directory.
2. In the client directory, start the frontend:
    ```bash
    npm run dev
    ```
3. In the server directory, start the backend:
    ```bash
    npm start
    ```

Open two tabs in your browser to access the client and server and ensure they are communicating properly.

## Deploying Live

For hosting live, I like to use [Vercel](https://vercel.com/) to host the client & [Render.com](https://render.com/) to host the server. If you wish to do the same with your project follow these steps:

### Hosting Server Side on Render

1. **Login to Render**: Got to [Render.com](https://render.com/) and log in or sign up.
2. **New Web Service**: Click on 'New' and then 'Web Service'.
3. **Select Repository**: Connect your GitHub repository and select your project.
4. **Root Directory**: Set the root directory to 'server'.
5. **Environment Variables**: Add your environment variables from your `.env` server file to the Render service settings.
6. **Build Command**: Use the build command: `npm install`
7. **Start Command**: Use the start command: `npm start`
8. **Deploy**: Click 'Create Web Service' to deploy your server side.

### Hosting Client Side on Vercel

1. **Login** to Vercel: Go to [Vercel](https://vercel.com/) and log in or sign up.
2. **New Project**: Click on 'New Project' and import your GitHub repository.
3. **Configure Project**: Select your repository and configure your project settings.
4. **Environment Variables**: Add your environment variables from `.env.production` to the Vercel project settings. (Make sure you add the URL to your Render site to this file so your client can listen properly in production)
5. **Deploy**: Click 'Deploy' to deploy your client side.


### Note

You'll noticed I have a `.env.development` & `.env.production` file.  This makes it easy for you to work on the development site while ensuring the production site works as well.  Vercel will automatically know to use the production URL instead of the development.  


## Contributing
Contributions are welcome! I'm not perfect, and this app is not perfect. There are a ton of ways to refactor the code and other ways to go about fetching information. If you catch any mistakes or if you'd like to make some changes to it let me know or you can help contribute to it! Follow these steps to contribute:

1. **Fork the repository** by clicking the "Fork" button on the repository page.
2. **Clone your fork**:
    ```bash
    git clone https://github.com/your-username/your-forked-repo.git
    ```
3. **Create a new branch**:
    ```bash
    git checkout -b feature-branch
    ```
4. **Make your changes and commit them**:
    ```bash
    git commit -m "Description of your changes"
    ```
5. **Push to your fork**:
    ```bash
    git push origin feature-branch
    ```
6. **Submit a pull request** from your forked repository to the original repository.

## Contact
For any inquiries, feel free to reach out:

- LinkedIn: [ervindev](https://www.linkedin.com/in/ervindev/)
- GitHub: [ervinCodes](https://github.com/ervinCodes)
- Twitter: [@ervin_dev](https://x.com/ervin_dev)
