import './App.css'
import { useEffect, useRef } from 'react'
// import init from './generated/shaders'

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    (async () => {
      if (canvasRef.current) {
        const init = import('./generated/shaders.js')
        // init()
        // init()
      }
    })();
  }, [canvasRef])

  return (
    <>
      <div id="root">
        <div id="container">
          <canvas ref={canvasRef} id="canvas" width="800" height="600"></canvas>
        </div>
      </div>
    </>
  )
}

export default App
