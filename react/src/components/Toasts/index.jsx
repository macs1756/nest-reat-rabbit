
import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { io } from 'socket.io-client';

const Toasts = ({ roomId }) => {

  useEffect(() => {

    if (roomId) {
      let socket = io('http://localhost:3000', {
        query: { roomId },
        transports: ['websocket'],
      });

      socket.on('connect', () => console.log('Connected', socket.id));
      socket.on('message', (msg) => {
        toast(msg);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [roomId]);



  return <ToastContainer />

};

export default Toasts;