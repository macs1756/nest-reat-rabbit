import { useState } from 'react'
import './App.css'
import Toasts from './components/Toasts'

function App() {

  const [roomId, setRoomId] = useState(Date.now())

  const fn = async () => {
    await fetch(`http://localhost:3000/report?roomId=${roomId}`)
  }

  return (
    <>
      <button onClick={fn}>Generate report</button>
      <Toasts roomId={roomId} />
    </>
  )
}

export default App
