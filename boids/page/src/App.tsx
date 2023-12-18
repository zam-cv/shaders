import { useEffect, useRef } from 'react'
import wasmUrl from './generated/shaders_bg.wasm?url'
import init from './generated/shaders.js'
import './App.css'

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      (async () => {
        const _module = await WebAssembly.compileStreaming(fetch(wasmUrl))
        init(_module).then((instance: any) => {
          console.log(instance.get_count())
          instance.increment()
          console.log(instance.get_count())
        })
      })();
    }
  }, [canvasRef])

  return (
    <canvas ref={canvasRef} id="canvas" width="800" height="600"></canvas>
  )
}

export default App
