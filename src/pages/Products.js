import LoadingSpinner from "common/components/LoadingSpinner";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "store/products/actions";

const ProductsPage = () => (
  <div className="border rounded border-gray-100 bg-white py-1 mx-6 mt-6">
    <div className="mt-5 mx-6 font-semibold text-2xl">Available Products</div>
    <div className="mx-6 text-gray-400">
      This list is maintained by service operator
    </div>
    <div className="my-5">
      <ProductList />
    </div>
  </div>
);

const ProductList = () => {
  const dispatch = useDispatch();

  const { isLoading, list } = useSelector((store) => store.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <table className="w-full border-collapse">
      <thead>
        <tr className="uppercase border-b-2 border-gray-100 text-gray-400">
          <th className="pl-6 font-normal text-left">Name</th>
        </tr>
      </thead>
      <tbody>
        {list.map((product) => (
          <tr
            className="border-t border-gray-100 hover:bg-gray-100"
            key={product.id}
          >
            <td className="pl-6 py-3">{product.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsPage;
