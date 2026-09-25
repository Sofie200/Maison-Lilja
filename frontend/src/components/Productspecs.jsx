import "./ProductSpecs.css";

export default function ProductSpecs({ product, variant }) {
    const allergens = product.allergener?.references?.nodes
        ?.map((node) => node.label?.value)
        .filter(Boolean) ?? [];

    console.log(allergens);

    const rows = [
        { label: "Antal", value: product.antal?.value, multiline: false },
        { label: "Nettovolym", value: product.nettovolym?.value, multiline: false },
        { label: "Nettovikt", value: product.nettovikt?.value, multiline: false },
        { label: "Ingredienser", value: product.ingredienser?.value, multiline: true },
        { label: "Allergener", value: allergens.join(", ") },
        { label: "Förvaring", value: product.forvaring?.value, multiline: true },
        { label: "Förpackning", value: product.forpackning?.value, multiline: true }
    ].filter((row) => row.value);

    if (rows.length === 0) return null;

    return (
        <details className="product-specs">
            <summary>Specifikationer</summary>

            <table className="product-specs__table">
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.label}>
                            <th scope="row">{row.label}</th>
                            <td className={row.multiline ? "is-multiline" : undefined}>
                                {row.value}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </details>
    );
}