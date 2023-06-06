import axios from "axios";
import React, { useEffect, useState } from "react";
import { Category } from "../types/type";

const useGetCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    axios.get(`/posts/categories`).then((response) => {
      setCategories(response.data.categories);
    });
  }, []);
  return { categories };
};

export default useGetCategory;
