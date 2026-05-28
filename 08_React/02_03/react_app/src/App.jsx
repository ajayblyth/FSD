import Title from "./Title";
import ProductTab from "./ProductTab";
import MessageBox from "./MessageBox"
import CardTab from "./CardTab";
import Button from "./Button";
import Counter from "./Counter";
import LikeButton from "./LikeButton";
function App(){
  return (
  <>
    {/* <h1>Hello World</h1>
    <h1>How are you {2*2} </h1>
    <Title/>
    <ProductTab/>
    <MessageBox userName = "Ajay" textColor = "red"/> */}
    
    {/* <CardTab/>
    <Button/> */}


    {/* <Counter/> */}
    <LikeButton/>

  </>
  ) 
}
export default App;

// Note:
// A React component must return only ONE parent element.
// Multiple elements cannot be returned side-by-side directly.