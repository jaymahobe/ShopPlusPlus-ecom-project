import React, { useEffect } from "react";
import "../../../index.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StarHalfIcon from "@mui/icons-material/StarHalf";

import {
  fetchAllproductsAsync,
  selectAllProducts,
} from "../../product/productListSlice";

const AdminProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);

  useEffect(() => {
    dispatch(fetchAllproductsAsync());
  }, [dispatch]);

  return (
    <>
      <div className="bg-white ">
        <div className="mx-auto max-w-2xl px-4 py-3 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8">
          <Link
            to="/admin/add-product"
            className="rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-green-700 bg-green-500"
          >
            Add Product
          </Link>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 animation_product">
            {products.map((product) => (
              <Link to={`/product-detail/${product.id}`}>
                <div>
                  <div className="border mb-3 p-2">
                    <div key={product.id} className="group relative">
                      <div className="aspect-h-1 aspect-w-1  w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <a href={product.href}>
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              {product.title}
                            </a>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.color}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          ${product.price}
                        </p>
                      </div>
                    </div>{" "}
                    <p className="text-sm font-medium text-gray-900">
                      <StarHalfIcon />
                      {product.rating}
                    </p>
                  </div>

                  <Link
                    to={`/admin/add-product/edit/${product.id}`}
                    className=" rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-red-600 bg-indigo-500"
                  >
                    Edit
                  </Link>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProductList;
