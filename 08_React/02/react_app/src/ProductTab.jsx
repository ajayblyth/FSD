import Product from "./Product";

function ProductTab(){
let features =["Feature 1", "Feature 2", "Feature 3"];

return(
    <>
    <Product title = "nokia" features = {features}/>
        <Product title = "samsung" price = "3000" features= { features}/>


      {/* title, price , features are props */}
    </>

)
}

export default ProductTab;