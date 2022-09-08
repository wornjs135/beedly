import React, { useEffect } from "react";
import { useState } from "react";
import { getTempProductList } from "../utils/apis/PersonalProductAPI";

export const Temp = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) getProducts();
  });

  const getProducts = async () => {
    const params = {
      categoryName: "회화",
      page: 0,
      size: 20,
      sort: "createdDate,DESC",
    };

    await getTempProductList(
      params,
      (response) => {
        console.log(response);
        // setProducts(...response.data)
        setLoading(false);
      },
      (fail) => {
        console.log(fail);
      }
    );
  };
  if (loading) return <div>로딩중...</div>;
  return <div>Temp</div>;
};
