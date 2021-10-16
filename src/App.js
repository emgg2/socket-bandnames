import React , { useState } from "react";
import { BandAdd } from "./components/BandAdd";
import { BandList } from "./components/BandList";
import io from 'socket.io-client';


const connectSocketServer = () => {
    const socket = io.connect ("http://localhost:8080", {  
       withCredentials: true,  
       extraHeaders: {    "my-custom-header": "abcd"  
     }});
  //  const socket = io.connect ("http://localhost:8080", { 
  //    transport: ['websocket']
  //  });
   return socket;
}

function App() {
 


  const [socket] = useState(connectSocketServer() )
   const [online, setonline] = useState(false);

  return (
    <div className="container">
        <div className="alert">
          <p>
            Service status:
            <span className="text-success">Online</span>
            <span className="text-danger">Offline</span>
          </p>
        </div>


        <h1>BandNames</h1>
        <hr />

        <div className="row">
          <div className="col-8">
            <BandList />
          </div>
          <div className="col-4">
            <BandAdd />
          </div>
        </div>
    </div>
  );
}

export default App;
