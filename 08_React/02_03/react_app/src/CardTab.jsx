import Card from "./Card";
import "./CardTab.css";

function CardTab() {

    const deals = [

        {
            title: "Logitech MX Master",
            features: ["8000 DPI", "5 Programmable Buttons"],
            oldPrice: "12,495",
            newPrice: "8,999",
        },

        {
            title: "Apple Pencil (2nd Gen)",
            features: [
                "Intuitive Touch Surface",
                "Designed for iPad Pro"
            ],
            oldPrice: "11,900",
            newPrice: "9,199",
        },

        {
            title: "Zebronics",
            features: [
                "Designed for iPad Pro",
                "Intuitive Touch Surface"
            ],
            oldPrice: "1,599",
            newPrice: "899",
        },

        {
            title: "Petronics Toad",
            features: [
                "Wireless Mouse 2.4GHz",
                "Optical Orientation"
            ],
            oldPrice: "599",
            newPrice: "278",
        }

    ];

    return (

        <section className="card-tab">

            <h2>
                Blockbuster Deals on Computer Accessories | Shop Now
            </h2>

            <div className="deal-card-list">

                {deals.map((deal) => (

                    <Card
                        key={deal.title}
                        title={deal.title}
                        features={deal.features}
                        oldPrice={deal.oldPrice}
                        newPrice={deal.newPrice}
                    />

                ))}

            </div>

        </section>

    );

}

export default CardTab;