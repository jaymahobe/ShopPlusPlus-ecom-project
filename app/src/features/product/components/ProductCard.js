import React from "react";

const ProductCard = ({ product }) => {
  const { id, images, title, color, price } = product;
  return (
    <div>
      <div className="p-2 border-black-100  overflow-hidden  shadow-md border rounded-sm h-67">
        <div key={id} className="group relative">
          <div className="aspect-h-1 aspect-w-1  w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
            <img
              src={images[0]}
              alt={title}
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="mt-4 flex justify-between items-baseline">
            <div>
              <p className="text-sm text-gray-700 font-bold">
                <div>
                  <span aria-hidden="true" className="absolute inset-0 " />
                  {title}
                </div>
              </p>
              <p className="mt-1 text-sm text-gray-500">{color}</p>
            </div>
            <div className="text-md font-bold text-gray-900 ">${price}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
