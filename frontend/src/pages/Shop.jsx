import ProductCard from "../components/ProductCard";

export default function Shop() {

    const products = [
        {
            id: 1,
            name: "Midnight Noir 72%",
            description: "Elegant mörk choklad med toner av espresso och svart körsbär.",
            price: 89,
            discount: 0,
            image: "/../../dummy1.png"
        },
        {
            id: 2,
            name: "Caramel Fleur de Sel",
            description: "Silkeslen karamell med fransk havssalt, omsluten av mjölkchoklad.",
            price: 99,
            discount: 10,
            image: "/../../dummy2.png"
        },
        {
            id: 3,
            name: "Hazelnut Praliné Luxe",
            description: "Klassisk praliné med rostade hasselnötter och krämig fyllning.",
            price: 119,
            discount: 0,
            image: "/../../dummy3.png"
        },
        {
            id: 4,
            name: "Ruby Rosé Collection",
            description: "Fruktig ruby‑choklad med hallon och rosblad.",
            price: 149,
            discount: 20,
            image: "/../../dummy1.png"
        },
        {
            id: 5,
            name: "Citrus & White Velvet",
            description: "Vit choklad med citronzest och vanilj, mjuk och len som sammet.",
            price: 89,
            discount: 0,
            image: "/../../dummy2.png"
        },
        {
            id: 6,
            name: "Espresso Crunch Bar",
            description: "Mörk choklad med krispiga kaffebönor och intensiv arom.",
            price: 79,
            discount: 0,
            image: "/../../dummy3.png"
        },
        {
            id: 7,
            name: "Pistachio Royale",
            description: "Lyxig pistagefyllning i mörk choklad, toppad med krossade nötter.",
            price: 139,
            discount: 15,
            image: "/../../dummy1.png"
        },
        {
            id: 8,
            name: "Honeycomb Gold",
            description: "Krispig honungskaka i mjölkchoklad, en gyllene klassiker.",
            price: 99,
            discount: 0,
            image: "/../../dummy2.png"
        },
        {
            id: 9,
            name: "Truffle du Champagne",
            description: "Champagnetryffel med vit choklad och subtil citrus.",
            price: 159,
            discount: 20,
            image: "/../../dummy3.png"
        },
        {
            id: 10,
            name: "Dark Almond Silhouette",
            description: "Mörk choklad med rostade mandlar och en elegant bitter ton.",
            price: 89,
            discount: 0,
            image: "/../../dummy1.png"
        }
    ];

    return <section>
        <h1>Handla nu</h1>
        <div className="product-grid">
            <ProductCard product={products[0]} />
            <ProductCard product={products[1]} />
            <ProductCard product={products[2]} />
            <ProductCard product={products[3]} />
            <ProductCard product={products[4]} />
            <ProductCard product={products[5]} />
            <ProductCard product={products[6]} />
            <ProductCard product={products[7]} />
            <ProductCard product={products[8]} />
            <ProductCard product={products[9]} />
        </div>
    </section>;
}