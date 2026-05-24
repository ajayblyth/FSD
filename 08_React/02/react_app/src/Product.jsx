import "./Product.css"
function Product({title, price=1, features} ){
return(
<div className="Product">
<h3>{title}</h3>
<h5>{price}</h5>
<ul>

{

features.map((feature)=>{
return <li> {feature} </li>
})
}
</ul>

</div>
)}

export default Product;