import React from 'react'
const orderDetails = {
  "order_id": "2403040640115901143",
  "user_id": "2310231051314211162",
  "order_type": "pickup",
  "order_status": "Initiated",
  "franchise_id": null,
  "franchise_address": null,
  "franchise_name": null,
  "city": "mumbai",
  "total_price": 500,
  "shipping_address_id": "2402201118037783132",
  "full_name": "abdullah  kazi",
  "mobile_number": "8907078607",
  "shipping_address": "06,taximan colony,near kurla depot,kurla west",
  "coupon_code": null,
  "orderProducts": [
    {
      "order_product_id": "2403040640115908285",
      "product_id": "2310251249526037055",
      "product_name": "Red Velvet Strawberry Cake",
      "product_image": "20240120084802366.jpeg,20240120084835622.jpeg,20240120090211247.jpeg",
      "variety_id": "2310201155582292994",
      "variety_name": "Fruit Cake",
      "city": "mumbai",
      "unit": "S",
      "value": "Small",
      "msg_cake": null,
      "price": 500
    }
  ],
  "json_order_product": null
}
const index = () => {
  return (
    <div>
     {
      orderDetails && (
        <>
        <div className='order Detail'>
        order Details :
        <p>Order Id : {orderDetails.order_id}</p>
        <p>order Status : {orderDetails.order_status}</p>
        <p>order Date : {orderDetails.order_date}</p>
        </div>
        <div className="shippingDetail">
        Shipping Details :
        <p>mobile number : {orderDetails.mobile_number}</p>
        <p>shipping Address : {orderDetails.shipping_address}</p>
        <p>city : {orderDetails.city}</p>
        </div>
       
         
        </>
      )
     }
    </div>
  )
}

export default index

// export async function getServerSideProps(context) {
//   const city = context.query.city;
//   const url = context.query;
//   const categoryname = url.l.split("-").join(" ") || "";
//   const subcategoryname = url.subcategory.split("-").join(" ") || "";

//   try {
//     const obj = {
//       category_name: categoryname || "",
//       sub_category_name: subcategoryname || "",
//       city_name: city,
//     };
//     const response = await axiosPost("/ProductMaster/GetB2CProducts", obj);

//     const cityObj = {
//       city_name: city,
//     };
//     const category = await axiosPost("/Category/GetAllCategories", cityObj);

//     return {
//       props: {
//         category: category,
//         subcategoryName: subcategoryname,
//         data: response,
//         categoryName: categoryname,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return {
//       props: {
//         data: null,
//         additionalData: null,
//       },
//     };
//   }
// }