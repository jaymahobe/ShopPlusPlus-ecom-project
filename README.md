# ShopPlusPlus-Ecom-project

# Full Stack MERN E-commerce Application

Welcome to the Full Stack MERN E-commerce ShopPlus+ Application. This application is designed to provide a comprehensive e-commerce experience with user and admin functionalities, authentication using JWT, product selection, payment with stripe, and more. Below, you'll find a detailed guide on how to set up, use, and customize this powerful application.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Application Structure](#application-structure)
- [Configuration](#configuration)
- [Authentication](#authentication)
- [User Guide](#user-guide)
- [Admin Guide](#admin-guide)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Full Stack MERN E-commerce ShopPlus+ Application is a feature-rich platform that allows users to browse products, add them to their cart, make payments, and track their orders. Admins have access to an intuitive interface for managing products and categories. The application is built with a MERN stack, utilizing React for the front end, Express for the backend, and MongoDB for data storage.

## Features

- **User Authentication:** Secure user and admin authentication using JWT.
- **Product Management:** Admins can create and manage product listings.
- **Category Creation:** Admins can create and manage product categories.
- **Product Filtering:** Users can filter products based on category and price.
- **Order Tracking:** Users can track the status of their orders.
- **Payment Processing:** Seamless integration for secure payment transactions.

## Technologies Used

- **Front End:** React
- **Back End:** Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Payment:** Payment Gateway of Stripe

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install` or `npm i` in both the app
   and server directories.
3. Configure the application (see (#common in server/)).
4. Run the server using `npm start` in the server directory.
5. Run the app
   using `npm start` in the app
   directory.
6. Run the app
   using `npm run dev` in the root directory to run the application.
7. Access the application at [http://localhost:3000](http://localhost:3000).

## Application Structure

- **app:** React application for the front end.
- **Server:** Express.js server for the back end.
- **Database:** MongoDB for data storage.

## Configuration

- **Server:** Configure the MongoDB connection string and JWT secret in the server's `.env` file.
  PORT = Any
  MONGODB_URL =
  SECRET_ENV_KEY =
  STRIPE_KEY =
  STRIPE_SECRET_KEY

markdown
Copy code

- **app:** Configure Any(based on server) PORT API endpoints in the front-end for access back-end and Database
  markdown
  Copy code

## Authentication

User and admin authentication is handled using JWT. Tokens are generated upon successful login and used for subsequent requests.

## User Guide

- **Login/Signup:** Users can create an account or log in.
- **Product Selection:** Browse products, filter by category or price, and add to the cart.
- **Payment:** Proceed to checkout, enter payment details, and complete the transaction.
- **Order Tracking:** Users can track their orders in the user's order dashboard.

## Admin Guide

- **Login:** Admins can log in using their credentials.
- **Product Management:** Add, edit, and delete products.
- **Order Management:** View and manage customer orders.

## Dependencies

This application utilizes various NPM packages, including but not limited to:

- express
- mongoose
- react
- jsonwebtoken

## Contributing

Feel free to contribute to the development of this project! Fork the repository, make your changes, and submit a pull request.
