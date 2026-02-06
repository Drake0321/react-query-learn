import { getProducts } from "../utils/productsUtils";
import { useQuery } from "@tanstack/react-query";
import ProductsContainer from "./ProductsContainer";
import SearchContainer from "./SearchContainer";
import { useMemo, useState } from "react";

export default function Products() {
  const [search, setSearch] = useState("");
  const [isStock, setIsStock] = useState(false);
  const { data, error, isError, isLoading } = useQuery({
    queryKey: [`products`],
    queryFn: getProducts,
    staleTime: 10 * 1000,
  });

  const filteredProducts = useMemo(() => {
    return data?.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStock = !isStock || item.stocked;

      return matchesSearch && matchesStock;
    });
  }, [data, search, isStock]);

  if (isError) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container">
      <div>
        <SearchContainer
          search={search}
          setSearch={setSearch}
          isStock={isStock}
          setIsStock={setIsStock}
        />
      </div>
      <div>
        <ProductsContainer products={filteredProducts} />
      </div>
    </div>
  );
}
