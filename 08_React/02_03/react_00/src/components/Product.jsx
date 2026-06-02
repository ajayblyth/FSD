import "./Product.css";

function Product({title, price, features}){
return (
<div className="Product">
    <h4>{title}</h4>
    <p>{price}</p>


</div>

)
}
export default Product;