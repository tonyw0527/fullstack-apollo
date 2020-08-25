import React from 'react'; // react

// apollo-client
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider, useQuery, useMutation } from '@apollo/react-hooks';

// client initiating
const client = new ApolloClient({ uri: 'http://localhost:4000'});

// query ex
const GET_DATA = gql`
  query {
    users {
      id
      name
    }
  }
`;
// const GET_DATA = gql`
//     query {
//         user(id: "1") {
//           id
//           name
//         }
//     }
// `;

function QueryApp() {
  const { loading, error, data } = useQuery(GET_DATA);
  if (loading) return <p>Loading...</p>;
  if (error) { console.log(error); return <p>Error! :(</p>; }
  
  const { users } = data;

  return (
    <>
      <ul>
        {users.map((user) => (<li key={user.id}>ID는 {user.id}이고 이름은 {user.name}입니다.</li>))}
      </ul>
    </>
  );
}


// Mutation ex
const DELETE_USER = gql`
  mutation($id: ID!) {
     deleteUser(id: $id) {
       id
       name
     }
  }
`;

function MutationApp() {
  const [deleteUser, { loading, error }] = useMutation(DELETE_USER,{
    update(cache, { data: { deleteUser }}){
      console.log(cache);
      //const { users } = cache.readQuery({ GET_DATA });
      cache.writeQuery({
        query: GET_DATA,
        data: { users: deleteUser }
      });
    },
    onCompleted({deleteUser}){
      console.log(`버튼 실행후 users: ${deleteUser}`);
    }
  });

  const handleClick = () => {
    deleteUser({ variables: {id: "1"}  });
  }

  return (
    <>
    <button type="button" onClick={handleClick} disabled={loading}>삭제!</button>
    {error && <strong>Error :(</strong>}
    </>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <QueryApp />
        <hr />
        <MutationApp />
      </div>
    </ApolloProvider>
  );
}

export default App;
