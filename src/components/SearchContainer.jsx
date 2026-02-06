export default function SearchContainer({
  search,
  setSearch,
  isStock,
  setIsStock,
}) {
  return (
    <div className="search-container">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
      />
      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
        <input
          type="checkbox"
          name="inStock"
          aria-label="Only show products in stock"
          onChange={(e) => setIsStock(e.target.checked)}
          checked={isStock}
        />
        <label htmlFor="instock">Only show products in stock</label>
      </div>
    </div>
  );
}
