import axios from "axios";

const BASE_URL = "http://localhost:8080/app"; // Replace with your API base URL

const api = axios.create({
  baseURL: BASE_URL,
});

// Function to fetch items
export const fetchItems = async (token) => {
  try {
    const response = await api.get("/item", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching items: " + error.message);
  }
};

// Function to create a new item
export const createItem = async (formData, userInfo, token) => {
  try {
    const response = await api.post("/item", {
      itemId: formData.itemId,
      itemName: formData.itemName,
      itemBuyingPrice: formData.buyingPrice,
      itemSellingPrice: formData.sellingPrice,
      itemEnteredByUser: userInfo,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error creating item: " + error.message);
  }
};

// Function to delete an item
export const deleteItem = async (itemId, token) => {
  try {
    await api.delete(`/item/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error("Error deleting item: " + error.message);
  }
};
