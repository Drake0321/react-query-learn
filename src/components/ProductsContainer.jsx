export default function ProductsContainer({ products }) {
  if (!products.length) return <p>No products found</p>;

  // 1. Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    acc[product.category] = acc[product.category] || [];
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <table className="products-table">
      <thead>
        <tr>
          <th>Category</th>
          <th>Item</th>
          <th>Price</th>
        </tr>
      </thead>

      <tbody>
        {Object.entries(groupedProducts).map(([category, items]) =>
          items.map((item, index) => (
            <tr key={item.id}>
              {/* Show category only once using rowSpan */}
              {index === 0 && <td rowSpan={items.length}>{category}</td>}

              <td style={{ color: item.stocked ? "inherit" : "red" }}>
                {item.name}
              </td>
              <td>{item.price}</td>
            </tr>
          )),
        )}
      </tbody>
    </table>
  );
}
