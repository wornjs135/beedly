import styled from "styled-components";
import OnairStateIcon from "../assets/img/OnairStateIcon.svg";
import BeforeStateIcon from "../assets/img/BeforeStateIcon.svg";
import { useEffect } from "react";
import { useState } from "react";

const StyledProductCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40vw;
  padding-right: 14px;
  padding-top: 14px;
`;

const StyledProductCardImgFrame = styled.div`
  position: relative;
  width: 40vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;

const StyledRectangleRowImg = styled.img`
  border-radius: 8px;
  width: 40vw;
  height: 40vw;
  object-fit: cover;
`;

const AuctionStateBox = styled.div`
  color: white;
  background-color: ${true ? "red" : "gray" || "gray"};
  display: flex;
  position: absolute;
  font-size: 12px;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 2px;
  border-radius: 3px;
  margin: 12px;
`;
const AuctionStateBoxProps = (backcolor) => (
  <AuctionStateBox props={backcolor}></AuctionStateBox>
);
const StyledAuctionStateIcon = styled.img`
  height: 12px;
  padding-right: 3px;
`;

const StyledCardInfBox = styled.div`
  display: flex;
  padding-left: 5px;
  padding-top: 5px;
`;

const StyledCardArtistImgFrame = styled.div`
  display: flex;
  width: 30px;
  height: 30px;
  flex-direction: column;
  padding-left: 3px;
  padding-top: 5px;
  padding-bottom: 3px;
  padding-right: 3px;
`;

const StyledCardArtistImg = styled.img`
  object-fit: cover;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  border: 2px solid rgb(235, 235, 235);
`;

const StyledCardInfTextFrame = styled.div`
  padding-left: 5px;
  width: 28vw;
`;

export function ProductCard({ product, startTime }) {
  const [now, setNow] = useState(new Date());
  const start =
    startTime === undefined ? new Date(product.startTime) : new Date(startTime);
  const date =
    startTime === undefined
      ? product.startTime.split("T")
      : startTime.split("T");
  const yyyyMMdd = date[0].split("-");
  const HHmm = date[1].split(":");
  const [timer, setTimer] = useState(0);
  const isEnd = product.soldStatus; //STANDBY
  // const LeftMonth = start.getMonth();
  // const LeftDay = start.get();
  const CheckTime = () => {
    if (start > now) {
      // 아직 진행 예정
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  const getTime = () => {
    let diff = start - now;
    // const diffDays = Math.floor(
    //   (start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    // );
    // diff -= diffDays * (1000 * 60 * 60 * 24);
    // const diffHours = Math.floor(diff / (1000 * 60 * 60));
    // diff -= diffHours * (1000 * 60 * 60);
    // const diffMin = Math.floor(diff / (1000 * 60));
    // diff -= diffMin * (1000 * 60);
    // const diffSec = Math.floor(diff / 1000);
    // return `${diffDays < 10 ? ` 0${diffDays}` : diffDays}일 ${
    //   diffHours < 10 ? `0${diffHours}` : diffHours
    // }: ${diffMin < 10 ? `0${diffMin}` : diffMin}: ${
    //   diffSec < 10 ? `0${diffSec}` : diffSec
    // }`;
    let sec = 1000;
    let minute = sec * 60;
    let hour = minute * 60;
    let day = 24 * hour;
    let month = day * 30;
    if (diff / month >= 1) {
      return `${parseInt(diff / month)}달 남음`;
    } else if (diff / day >= 1) {
      return `${parseInt(diff / day)}일 남음`;
    } else {
      return `${diff / hour >= 1 ? `${parseInt(diff / hour)}:` : ``}${
        diff / minute >= 1
          ? `${
              parseInt((diff % hour) / minute) < 10
                ? `0${parseInt((diff % hour) / minute)}`
                : parseInt((diff % hour) / minute)
            }:`
          : ``
      }${
        parseInt((diff % minute) / sec) < 10
          ? `0${parseInt((diff % minute) / sec)}`
          : parseInt((diff % minute) / sec)
      }`;
    }
  };

  return (
    <StyledProductCard>
      <StyledProductCardImgFrame>
        <StyledRectangleRowImg
          src={
            product.productImgs
              ? product.productImgs[0]
              : product.specialProductImgs[0]
          }
        />
        <AuctionStateBox
          style={{
            backgroundColor:
              isEnd === "STANDBY" ? (CheckTime() ? "red" : "gray") : "grap",
          }}
        >
          <StyledAuctionStateIcon
            src={
              isEnd === "STANDBY"
                ? CheckTime()
                  ? OnairStateIcon
                  : BeforeStateIcon
                : ""
            }
            style={{ paddingRight: "5px", paddingTop: "3px" }}
          />
          <div style={{ paddingBottom: "2px" }}>
            {isEnd === "STANDBY"
              ? CheckTime()
                ? "실시간"
                : getTime()
              : "종료됨"}
          </div>
        </AuctionStateBox>
      </StyledProductCardImgFrame>
      <StyledCardInfBox>
        <StyledCardArtistImgFrame>
          <StyledCardArtistImg src={product.artistImg} />
        </StyledCardArtistImgFrame>
        <StyledCardInfTextFrame>
          <div
            style={{
              fontSize: "14px",
              fontWeight: "700",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product.userNickname}
          </div>
          <div
            style={{
              fontSize: "14px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product.productName}
          </div>
          <div
            style={{
              fontSize: "12px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {isEnd === "STANDBY"
              ? CheckTime()
                ? `방송 중`
                : `${
                    start.getMonth() + 1
                  }월 ${start.getDate()}일 ${start.getHours()}시 ` +
                  `${start.getMinutes()}분 예정`
              : "종료됨"}
          </div>
        </StyledCardInfTextFrame>
      </StyledCardInfBox>
    </StyledProductCard>
  );
}

const StyledProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 144px;
  padding-right: 10px;
  padding-top: 14px;
`;

const StyledProfileCardImgFrame = styled.div`
  position: relative;
  width: 144px;
  display: flex;
  flex-direction: column;
`;

const StyledRectangleColImg = styled.img`
  border-radius: 8px;
  width: 144px;
  height: 208px;
  object-fit: cover;
`;

const StyledProfileCardInfBox = styled.div`
  position: absolute;
  height: 208px;
  width: 144px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  background-image: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0) 30%
  );
`;

export function ArtistCard({ artist }) {
  return (
    <StyledProfileCard>
      <StyledProfileCardImgFrame>
        <StyledRectangleColImg src={artist.artistBgImg} />
        <StyledProfileCardInfBox>
          <StyledCardArtistImgFrame style={{ padding: "12px" }}>
            <StyledCardArtistImg
              style={{ border: "2px solid white" }}
              src={artist.artistProfileImg}
            />
          </StyledCardArtistImgFrame>
          <div style={{ padding: "12px", color: "white", fontSize: "14px" }}>
            {artist.userNickname}
          </div>
        </StyledProfileCardInfBox>
      </StyledProfileCardImgFrame>
    </StyledProfileCard>
  );
}
