import './App.css';
import HelloWorld from './components/HelloWorld'
import List from './components/List'
import { grpc } from "@improbable-eng/grpc-web";
import { GreeterClientImpl, GrpcWebImpl } from "./components/gen/helloworld/helloworld";
import { useState, useEffect } from 'react';

/* const avengers = [
  'Captain America',
  'Iron Man',
  'Black Widow',
  'Thor',
  'Hawkeye',
] */

const avengers = [
  { name: 'Captain America' },
  { name: 'Iron Man' },
  { name: 'Black Widow' },
  { name: 'Thor' },
  { name: 'Hawkeye' },
  { name: 'Vision' },
  { name: 'Hulk' },
]

function App() {

  let transport = grpc.CrossBrowserHttpTransport({});
  let grp_client = new GrpcWebImpl("http://127.0.0.1:8090", {
      transport })
  let greeterClient = new GreeterClientImpl(grp_client);

  const [message, setMessage] = useState('');

  useEffect(() => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    if (!message) {
        getMessage();
    }
  }, []);


  const getMessage = async () => {
    let response = await greeterClient.SayHello({name : "test-name"});
    setMessage(response.message);
  };

  return (
    <div className="App">
      <HelloWorld />
      <List data={avengers} />
    </div>
  );
}

export default App;
