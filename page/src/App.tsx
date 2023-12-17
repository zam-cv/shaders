import { useEffect, useRef } from 'react'
import wasmUrl from './generated/shaders_bg.wasm?url'
import { initSync } from './generated/shaders.js'
import './App.css'

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current !== null) {
      (async () => {
        const _module = await WebAssembly.compileStreaming(fetch(wasmUrl))
        initSync(_module)
      })();
    }
  }, [canvasRef])

  return (
    <canvas ref={canvasRef} id="canvas" width="800" height="600"></canvas>
  )
}

export default App
