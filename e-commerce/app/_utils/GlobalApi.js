import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;
const apiUrl = "https://prodigy-fs-03.onrender.com/api";

const axiosClient = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

const getLatestProducts = () => axiosClient.get("/products?populate=*");

const getProductsById = (id) =>
  axiosClient.get("/products/" + id + "?populate=*");

const getProductListByCategory = (category) =>
  axiosClient.get(
    "/products?filters[category][$eq]=" + category + "&populate=*"
  );

const addToCart = (data) => axiosClient.post("/carts", data);

const getUserCartItems = (email) =>
  axiosClient.get(
    "/carts?populate[products][populate][0]=banner&filters[email][$eq]=" + email
  );

const deleteCartItem = (id) => axiosClient.delete("/carts/" + id);

const createOrder = (data) => axiosClient.post("/orders", data);

const addComment = (data) => axiosClient.post("/comments", data);

const getCommentById = (id) => axiosClient.get(`/comments?filters[products][id][$eq]=${id}&populate=*`);

const getUserOrders = (email) => axiosClient.get(`/orders?filters[email][$eq]=${email}&populate=*`);



export default {
  getLatestProducts,
  getProductsById,
  getProductListByCategory,
  addToCart,
  getUserCartItems,
  deleteCartItem,
  createOrder,
  addComment,
  getCommentById,
  getUserOrders
};
