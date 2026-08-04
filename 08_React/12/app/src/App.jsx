import { useState } from 'react'
import RenderCounter from './useRef/RenderCounter'
import FocusInput from './useRef/FocusInput'
import SlowEx from './useMemo/SlowEx'


function App() {

  return (
    <>
<RenderCounter />

<hr />

<FocusInput />

<hr />

<SlowEx />

    </>
  )
}

export default App
