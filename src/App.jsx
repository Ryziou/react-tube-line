import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [tubes, setTube] = useState([])

  useEffect(() => {
    async function getTubeLines() {
      try {
        console.log("Fetching tube lines...")

        const { data } = await axios.get('https://api.tfl.gov.uk/line/mode/tube/status')

          setTube(data)
      } catch (error) {
        console.log(error);
        
      }
    }
    getTubeLines()

    const interval = setInterval(getTubeLines, 300000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <h1>Tube Line Statuses</h1>
      <div className="container">
        {tubes.length > 0 && tubes.map((tube, index) => (
          
          <div className='tubelines' key={index}>
            <h2>{tube.name}</h2>
            <p>{tube.lineStatuses[0].statusSeverityDescription}</p>
          </div>
          
        ))}
      </div>
    </>
  )
}

export default App
