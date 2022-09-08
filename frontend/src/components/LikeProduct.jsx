import React from "react";
import { deletePersonalFavorite } from "../utils/apis/PersonalFavoriteAPI";
import red from "@material-ui/core/colors/green";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { StyledImg } from "./Common";
import { Box, Spinner } from "grommet";
import { FlexBox } from "./UserStyled";
import { stringToDate } from "../stores/modules/basicInfo";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
export const LikeProduct = ({ product, handleData }) => {
  const Navigate = useNavigate();
  const handleFavorite = () => {
    //좋아요를 눌렀다면
    deletePersonalFavorite(
      product.favoriteId,
      (response) => {
        console.log(response);
        handleData();
      },
      (fail) => {
        console.log(fail);
      }
    );
  };
  const goProductDetail = (id) => {
    Navigate(`/productDetail/${id}`)
  }
  if (!product) return <Spinner />;
  else
    return (
      <div style={{ padding: "20px" }}>
        <FlexBox Row_SB>
          <FlexBox Row_SB onClick={() => { goProductDetail(product.id) }}>

            <StyledImg
              src={product.productImgs[0]}
              alt="상품이미지"
              width="144px"
              height="144px"
            ></StyledImg>
            <div
              style={{
                marginLeft: "15px",
                display: "flex",
                flexDirection: "column",
                width: "65%",
                alignItems: "flex-start",
                height: "144px",
              }}
            >
              <p style={{ margin: "0px 0px", fontWeight: "bold" }}>
                {product.productName}
              </p>
              <p style={{ margin: "0px 0px", fontWeight: "500", fontSize: "14px", marginTop: "5px", marginBottom: "3px" }}>
                {product.userName}
              </p>
              <p style={{ margin: "0px 0px", fontSize: "12px" }}>
                {stringToDate(product.startTime)}
              </p>
              {/* <p style={{ margin: "0px 0px", fontSize: "12px" }}>
              {product.soldStatus === "STANDBY"
              ? "판매중"
              : product.soldStatus === "FAIL"
              ? "판매실패"
              : `판매완료 : ${moneyFormat(product.finalPrice)}원`}
            </p> */}
              {/* {!product.paidFlag ? (
              <Button
              SmallYellow
              style={{ alignSelf: "flex-end", margin: "5px 5px" }}
              onClick={handlePurchase}
              >
              결제하기
              </Button>
              ) : (
                <Button
                SmallBlack
                style={{ alignSelf: "flex-end", margin: "5px 5px" }}
                onClick={handlePurchase}
                >
                결제완료
                </Button>
              )} */}
            </div>
          </FlexBox>
          <Button
            Blank
            onClick={handleFavorite}
            children={<Box align="center">{<FavoriteIcon style={{ color: "red" }} />}</Box>}
          ></Button>
        </FlexBox>
      </div>
    );
};
