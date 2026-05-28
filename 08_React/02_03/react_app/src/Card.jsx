import './card.css';
function Card({ title, features, oldPrice, newPrice }) {
    return (
        <div className="card">
            <div className="card-body">
                <h3>{title}</h3>
                {
                    features.map((feature, index) => {
                       return  <p key={feature}> {feature} </p>
                    })
                }
            </div>
            <div className="card-price">
<span className="old-price">{oldPrice}</span>
<span className="new-price">{newPrice}</span>
            </div>
        </div>

    )
}

export default Card;