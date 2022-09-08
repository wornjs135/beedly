import React from "react";
import Button from "../components/Button";
import { FlexBox } from "../components/UserStyled";
import Logo from "../assets/img/logoClear.png";
const flexbox = {
  display: "flex",
  margin: "10vw 3vw",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  height: "auto",
};

const CLIENT_ID = process.env.REACT_APP_KAKAO_API_KEY;
const REDIRECT_URI = "https://i7a601.p.ssafy.io/user/kakao/callback";
// const REDIRECT_URI = "http://localhost:3000/user/kakao/callback";
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
const test = () => {
  console.log(KAKAO_AUTH_URL);
  window.location.href = KAKAO_AUTH_URL;
};
export default function login() {
  return (
    <FlexBox Column_SB>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "40vh",
          alignItems: "center",
        }}
      >
        <img
          style={{ maxWidth: "60vw", maxHeight: "20vh" }}
          alt="logo"
          src={Logo}
        ></img>
        <p style={{ fontSize: "12px", color: "#1F1D1D", maxWidth: "80vw" }}>
          Bid Everything Everywhere Discover Like Yours
        </p>
      </div>

      <div style={flexbox}>
        <Button BigYellow onClick={test}>
          카카오 로그인
        </Button>
        <Button BigBlack onClick={test}>
          카카오로 시작하기
        </Button>
      </div>
    </FlexBox>
  );
}
