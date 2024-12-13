// import React from "react";
// import Image from "next/image";
// import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addMainProductToAsync,
//   addToCartAsync,
//   editProductAsyncData,
//   subtractFromCartAsync,
// } from "@/redux/thunk";
// import { RootState } from "@/redux/store";
// import { Product } from "@/types/product";

// interface MiniProductCardProps {
//   productData: Product;
//   className?: string;
//   parentProduct?: Product | null;
// }

// const MiniProductCard: React.FC<MiniProductCardProps> = ({
//   productData,
//   className,
//   parentProduct,
// }) => {
//   const cartDataFromRedux = useSelector((state: RootState) => state.cartItems);
//   const dispatch = useDispatch();

//   const isExtraAdded = (itemId: string): Product | undefined => {
//     if (parentProduct?.addedExtras?.length > 0) {
//       return parentProduct.addedExtras.find((x) => x.product_id === itemId);
//     } else if (cartDataFromRedux?.products) {
//       return cartDataFromRedux.products.find((x) => x.product_id === itemId);
//     }
//     return undefined;
//   };

//   const addToCart = (item: Product) => {
//     if (parentProduct) {
//       const updatedItem = { ...item, cart_id: parentProduct.cart_id };
//       dispatch(addToCartAsync(updatedItem));
//     } else {
//       dispatch(addMainProductToAsync(item));
//     }
//   };

//   const incQuantityFromCart = (item: Product) => {
//     dispatch(editProductAsyncData(item));
//   };

//   const subtractFromCart = (item: Product) => {
//     dispatch(subtractFromCartAsync(item));
//   };

//   const addedProduct = isExtraAdded(productData.product_id);

//   return (
//     <div
//       className={
//         className ||
//         "w-[110px] md:w-60 flex flex-col items-center border-2 rounded p-2 md:p-4 gap-5 bg-third text-primary border-none"
//       }
//     >
//       <div className="w-12 h-12 md:w-20 md:h-20">
//         {productData?.thumb && (
//           <Image
//             src={productData.thumb}
//             width={142}
//             height={142}
//             alt={productData.name}
//             className="w-auto h-full"
//           />
//         )}
//       </div>
//       <div className="flex justify-between font-bold w-full gap-1 md:gap-5 flex-col md:flex-row">
//         <span className="order-2 md:order-1 md:text-lg text-[14px]">
//           {productData.name}
//         </span>
//         <span className="order-1 md:order-2 md:text-lg text-[14px]">
//           {productData.price}
//         </span>
//       </div>

//       {addedProduct ? (
//         <div className="flex items-center gap-2">
//           <button
//             type="button"
//             onClick={() => incQuantityFromCart(addedProduct)}
//             aria-label="Increase quantity"
//           >
//             <FaCirclePlus className="w-5 md:w-10 text-xl cursor-pointer hover:text-primary transition-all duration-300 group-hover:text-fourth" />
//           </button>

//           <div className="bg-fourth flex w-8 h-8 md:w-10 md:h-10 items-center justify-center text-black">
//             <span className="font-medium">{addedProduct.quantity}</span>
//           </div>
//           <button
//             type="button"
//             onClick={() => subtractFromCart(addedProduct)}
//             aria-label="Decrease quantity"
//           >
//             <FaCircleMinus className="w-5 md:w-10 text-xl cursor-pointer hover:text-secondary transition-all duration-300 group-hover:text-fourth" />
//           </button>
//         </div>
//       ) : (
//         <button
//           onClick={() => addToCart(productData)}
//           type="button"
//           className="p-2 rounded bg-primary text-fourth md:w-full md:text-lg text-[12px]"
//         >
//           Wählen Sie
//         </button>
//       )}
//     </div>
//   );
// };

// export default MiniProductCard;
