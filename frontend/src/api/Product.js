import axios from "axios";

export const fetchVolaProducts = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/v1/products/filter?category=Vola&gender=Men"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Vola products:", error);
    throw error;
  }
};


export const fetchMenProducts = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/v1/products/filter?gender=Men"
    );
    return response.data; 
  } catch (error) {
     console.error("Error fetching Men shoes products:", error);
     throw error;
  }
}

export const fetchWomenProducts = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/v1/products/filter?gender=Women"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Women shoes products:", error);
    throw error;
  }
};
