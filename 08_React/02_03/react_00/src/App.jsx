import Product from './components/Product'
// import Greetings from './components/Greetings'
import Button from './components/Button'
import Counter from  './components/Counter'

function App() {

  let showButton = false;

  return (
    <>

<Product 
title= "Phone"
price = "30000"
features={["fast", "reliable"]}

/>

<Product 
title= "laptop"
price = "50000"
features={{a: "fast", b: "reliable"}}

/>

{showButton && <Button/>}

 {/* <Greetings userName="Ajay" textColor="blue" />
      <Greetings userName="Rahul" textColor="red" />
      <Greetings userName="Priya" textColor="green" /> */}


<Counter />

</>
  )
}

export default App
