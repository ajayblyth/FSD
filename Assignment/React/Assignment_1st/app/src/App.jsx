import './App.css'
import ContextAPI_class from './components/ContextAPI_class'
import GlobalContext from './components/GlobalContext'
import PropDrilling from './components/PropDrilling'
import PropsRecap from './components/PropsRecap'
import UseContext_class from './components/UseContext_class'
import UseEffect_basics from './useEffect/UseEffect_basics'
import UseEffect_Ex1 from "./useEffect/UseEffect_Ex1";
import CharacterTable from "./useEffect/CharacterTable";
import CharacterSearch from "./useEffect/CharacterSearch";

function App() {
  return (
    <div className="container py-4" style={{maxWidth: 600}}>
      
      <CharacterTable />

      <hr />

      <CharacterSearch />

     {/* <h2 className='text-center mb-4 text-primary'>React Context</h2>
      <div className='card p-4 mb-4'><PropsRecap /></div>
      <div className='card p-4 mb-4'><PropDrilling /></div>
      <div className='card p-4 mb-4'><ContextAPI_class /></div>
      <div className='card p-4 mb-4'><UseContext_class /></div>
      <div className='card p-4 mb-4'><GlobalContext /></div> 
                  <div className='card p-4 mb-4'><UseEffect_Ex1 /></div> 
*/}

    </div>
  )
}

export default App
