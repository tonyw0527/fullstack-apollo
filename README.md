Fullstack apollo Example

React-Apollo(graphQL)-MongoDB

Basic
0 $mkdir fullstack && cd fullstack

client setting
1 $npx create-react-app client
2 $npm install graphql apollo-boost @apollo/react-hooks -S
3 replace App.js in fullstack/client/src/ by repo's one.

server setting
0 $mkdir server     # ex) /fullstack/server
1 $npm init -y
2 $npm install graphql apollo-server apollo-datasource-mongodb mongoose -S
3 add server.js and data-sources folder.

Used Packages
client - graphql, apollo-boost, @apollo/react-hooks
server - graphql, apollo-server, apollo-datasource-mongodb, mongoose
