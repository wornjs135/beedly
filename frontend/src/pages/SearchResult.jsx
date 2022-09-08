import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HorizonScrollColTable } from "../components/HorizonScrollTable";
import { HalfProductCard } from "../components/HalfProductCard";
import { SearchBar } from "../components/SearchBar";
import { FlexBox } from "../components/UserStyled";

import { getProductListBySizeApi } from "../utils/apis/PersonalProductAPI";
import {
  getProductByArtistNickNameApi,
  getProductByProductNameApi,
  getProductByTagApi,
} from "../utils/apis/ProductSearchAPI";

const StyledTableTitle = styled.div`
  font-size: 16px;
  color: #1f1d1d;
  padding-top: 20px;
  padding-left: 20px;
  font-weight: 900;
`;

const ProductTable = styled.div`
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
  width: 90vw;
`;
export default function SearchResult() {
  const location = useLocation();
  const { keyword } = location.state;
  const { searchCategory } = location.state;
  const [searchProductList, setSearchProductList] = useState([]);
  const [loading, setloading] = useState(true);
  const [list, setlist] = useState();
  const Navigate = useNavigate("");
  const GoProductDetail = (id) => {
    Navigate(`/productDetail/${id}`);
  };
  useEffect(() => {
    if (loading) {
      if (searchCategory === "keyword") {
        if (
          localStorage.getItem("SearchList") === null ||
          JSON.parse(localStorage.getItem("SearchList")) === []
        ) {
          console.log([keyword]);
          localStorage.setItem("SearchList", JSON.stringify([keyword]));
        } else {
          localStorage.setItem(
            "SearchList",
            JSON.stringify(
              [keyword].concat(JSON.parse(localStorage.getItem("SearchList")))
            )
          );
        }
        //keyword로 상품작가가 keyword인 상품 검색
        getProductByArtistNickNameApi(
          keyword,
          "0",
          "20",
          "",
          (res) => {
            console.log(res);
            if (res.data.content.length !== 0) {
              setSearchProductList([...res.data.content]);
            }
          },
          (err) => {
            console.log(err);
            //keyword로 상품이름이 keyword인 상품 검색
          }
        ).then(
          getProductByProductNameApi(
            "0",
            keyword,
            "20",
            "",
            (res) => {
              console.log(res);

              if (res.data.content.length !== 0) {
                setSearchProductList((prev) => prev.concat(res.data.content));
              }
            },
            (err) => {
              console.log(err);
            }
          )
        );
      } else if (searchCategory === "size") {
        getProductListBySizeApi(
          keyword,
          "0",
          "20",
          "",
          (res) => {
            console.log(res);
            setSearchProductList(res.data.content);
          },
          (err) => {
            console.log(err);
          }
        );
      } else if (searchCategory === "tag") {
        getProductByTagApi(
          "0",
          "20",
          "",
          keyword,
          (res) => {
            console.log(res);
            setSearchProductList(res.data.content);
          },
          (err) => {
            console.log(err);
          }
        );
      }
      setloading(false);
    }
  }, [loading, keyword]);

  const goDetail = (id) => {
    console.log("t");
    Navigate(`/productDetail/${id}`);
  };

  const handleSubmit = () => {
    setSearchProductList([]);
    setloading(true);
  };
  return (
    // 검색 후 화면
    <div style={{ paddingBottom: "40px" }}>
      <SearchBar handlefunction={handleSubmit} word={keyword} />
      <StyledTableTitle>'{keyword}' 검색 결과</StyledTableTitle>
      <StyledTableTitle>Product</StyledTableTitle>
      {console.log(searchProductList)}
      {!loading && searchProductList.length !== 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px 0px",
          }}
        >
          <ProductTable>
            {searchProductList.map((product, idx) => (
              <div
                key={idx}
                onClick={(e) => GoProductDetail(product.id)}
                style={{ padding: "10px 0px" }}
              >
                <HalfProductCard product={product} />
              </div>
            ))}
          </ProductTable>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "10vw",
          }}
        >
          검색결과가 없습니다.
        </div>
      )}
    </div>
  );
}
