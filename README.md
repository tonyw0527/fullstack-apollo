# Fullstack apollo Example

- React-Apollo(graphQL)-MongoDB

## Basic
```sh
$ mkdir fullstack && cd fullstack
```

## Client setting
```sh
$ npx create-react-app client
$ npm install graphql apollo-boost @apollo/react-hooks -S
```
replace App.js in fullstack/client/src/ by repo's one.


## Server setting
```sh
$ mkdir server     ex) /fullstack/server
$ npm init -y
$ npm install graphql apollo-server apollo-datasource-mongodb mongoose -S
```
add server.js and data-sources folder.


## Used Packages
- Client - graphql, apollo-boost, @apollo/react-hooks
- Server - graphql, apollo-server, apollo-datasource-mongodb, mongoose
