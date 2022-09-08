import styled from "styled-components";
import OnairStateIcon from "../assets/img/OnairStateIcon.svg";
import BeforeStateIcon from "../assets/img/BeforeStateIcon.svg";

const StyledProductCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90vw;
  padding-top: 14px;
  padding-bottom: 10px;
`;

const StyledProductCardImgFrame = styled.div`
  position: relative;
  width: 90vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;

const StyledRectangleRowImg = styled.img`
  border-radius: 8px;
  width: 90vw;
  height: 60vw;
  object-fit: cover;
`;

const AuctionStateBox = styled.div`
  color: white;
  background-color: ${true ? "red" : "gray" || "gray"};
  display: inline-block;
  position: absolute;
  font-size: 16px;
  padding-left: 10px;
  padding-right: 12px;
  border-radius: 3px;
  margin: 18px;
`;
const AuctionStateBoxProps = (backcolor) => (
  <AuctionStateBox props={backcolor}></AuctionStateBox>
);
const StyledAuctionStateIcon = styled.img`
  height: 12px;
  padding-right: 5px;
`;

const StyledCardInfBox = styled.div`
  display: flex;
  padding-left: 5px;
  padding-top: 10px;
`;

const StyledCardArtistImgFrame = styled.div`
  display: flex;
  width: 50px;
  height: 50px;
  flex-direction: column;
  padding-left: 3px;
  padding-top: 5px;
  padding-bottom: 3px;
  padding-right: 3px;
`;

const StyledCardArtistImg = styled.img`
  object-fit: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const StyledCardInfTextFrame = styled.div`
  padding-left: 10px;
  padding-top: 3px;
`;

export function OnairProductCard({ product }) {
  const now = new Date();
  const start = new Date(product.startTime);
  const date = product.startTime.split("T");
  const yyyyMMdd = date[0].split("-");
  const HHmm = date[1].split(":");
  const isEnd = product.soldStatus; //STANDBY
  const CheckTime = () => {
    if (start > now) {
      // 아직 진행 예정
      return false;
    } else {
      return true;
    }
  };

  const getTime = () => {
    let diff = start - now;
    const diffDays = Math.floor(
      (start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    diff -= diffDays * (1000 * 60 * 60 * 24);
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    diff -= diffHours * (1000 * 60 * 60);
    const diffMin = Math.floor(diff / (1000 * 60));
    diff -= diffMin * (1000 * 60);
    const diffSec = Math.floor(diff / 1000);
    return `${diffDays < 10 ? ` 0${diffDays}` : diffDays}일 ${
      diffHours < 10 ? `0${diffHours}` : diffHours
    }: ${diffMin < 10 ? `0${diffMin}` : diffMin}: ${
      diffSec < 10 ? `0${diffSec}` : diffSec
    }`;
  };

  return (
    <StyledProductCard>
      <StyledProductCardImgFrame>
        <StyledRectangleRowImg src={product.productImgs[0]} />
        <AuctionStateBox
          style={{ backgroundColor: isEnd === 'STANDBY' ? (CheckTime() ? "red" : "gray") : "gray" }}
        >
          <StyledAuctionStateIcon
            src={isEnd === 'STANDBY' ? (CheckTime() ? OnairStateIcon : BeforeStateIcon) : ""}
          />
          {isEnd === 'STANDBY' ? (CheckTime() ? "실시간" : getTime()) : "종료됨"}
        </AuctionStateBox>
      </StyledProductCardImgFrame>
      <StyledCardInfBox>
        <StyledCardArtistImgFrame>
          <StyledCardArtistImg src={product.artistImg} />
        </StyledCardArtistImgFrame>
        <StyledCardInfTextFrame>
          <div
            style={{
              fontSize: "16px",
              fontWeight: "700",
              whiteSpace: "pre-line",
            }}
          >
            {product.userNickname}
          </div>
          <div
            style={{
              fontSize: "16px",
              whiteSpace: "pre-line",
            }}
          >
            {product.productName}
          </div>
          <div style={{ fontSize: "16px", whiteSpace: "pre-line" }}>
            {isEnd === 'STANDBY' ? (CheckTime()
              ? '방송 중'
              : `${
                  start.getMonth() + 1
                }월 ${start.getDate()}일 ${start.getHours()}시 ` +
                `${start.getMinutes()}분 예정`): "종료됨"}
          </div>
        </StyledCardInfTextFrame>
      </StyledCardInfBox>
    </StyledProductCard>
  );
}
