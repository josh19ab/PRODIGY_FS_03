import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;
const apiUrl = "http://localhost:1337/api";

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

const getUserCartItems = (email) => axiosClient.get('/carts?populate[products][populate][0]=banner&filters[email][$eq]='+email)

export default {
  getLatestProducts,
  getProductsById,
  getProductListByCategory,
  addToCart,
  getUserCartItems
};
