import React , { useState, useEffect } from "react";
import { BandAdd } from "./components/BandAdd";
import { BandList } from "./components/BandList";
import { io } from 'socket.io-client';


const connectSocketServer = () => {
    const socket = io.connect ("http://localhost:8080");
  //  const socket = io.connect ("http://localhost:8080", { 
  //    transport: ['websocket']
  //  });
   return socket;
}

function App() {
 


  const [socket] = useState(connectSocketServer() )
  const [online, setOnline] = useState(false);
  const [bands, setBands] = useState([]);

 

   useEffect(() => {
      console.log(socket.connected);
      setOnline( socket.connected)
   }, [ socket ])

   useEffect(() => {
     socket.on('connect', () => {
       setOnline(true);       
     })
   }, [ socket ])

   
   useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false);
    })
  }, [ socket ])

  useEffect(() => {
    socket.on('current-bands', (bands) => {
      setBands(bands);
    })
  }, [ socket ])

  const votar = ( id ) => {
    socket.emit('votar-banda', id);
  }

  const borrar = ( id ) => {
    socket.emit('borrar-banda', id);
  }

  const cambiarNombre = ( id,  nombre) => {
    socket.emit('cambiar-nombre-banda', {id, nombre});
  }

  const addBanda = ( nombre ) => {
    socket.emit('crear-banda', { nombre });
  }

  return (
    <div className="container">
        <div className="alert">
          <p>
            Service status:
            {
              online 
                ? <span className="text-success">Online</span> 
                : <span className="text-danger">Offline</span>
            }
            
          
          </p>
        </div>


        <h1>BandNames</h1>
        <hr />

        <div className="row">
          <div className="col-8">
            <BandList 
              data={ bands }
              votar={ votar }
              borrar={ borrar }
              cambiarNombre={ cambiarNombre } />
          </div>
          <div className="col-4">
            <BandAdd 
              addBanda={ addBanda }
            />
          </div>
        </div>
    </div>
  );
}

export default App;
