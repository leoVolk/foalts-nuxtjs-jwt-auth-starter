# foalts-nuxtjs-jwt-auth-starter

A starter project with basic jwt authentication using [FoalTS](https://foalts.org/) as backend and [Nuxt.js](https://nuxtjs.org/) as frontend.


## Install

```bash
# install dependencies
$ cd /frontend 
$ npm i

$cd /backend
$npm i
$npm run migrations
$foal createsecret
```

Put the secret token under JWT_SECRET="YOUR_SECRET_KEY_HERE" insde a .env file, based in the /backend folder.

## Run
Will open development server on port 3001.
```bash
# install dependencies
$ cd /backend
$ npm run develop

```

## Build

TODO


## Flow

Login Page can be found under /login


Register Page can be found under /register

There is also a /me Page, that does not show anything but can only be accessed when logged in.

## Authors

- **Leonhard Volkmann** - _Initial work & developement_
