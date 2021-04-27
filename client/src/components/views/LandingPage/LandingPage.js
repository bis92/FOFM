import React from "react";
import { Mobile, PC } from "./Sections/MediaQuery";
import { Typography } from "antd";
import {
  SmileOutlined,
  HeartTwoTone,
  DoubleRightOutlined,
  DoubleLeftOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Title } = Typography;

function LandingPage(props) {
  const logoutHandler = async () => {
    try {
      await axios.get(`/api/users/logout`);
      props.history.push("/login");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <div className="pc_container">
        <PC>
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <Title level={1}>Friend Optimized For Me</Title>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src="/images/friends1.jpg"
              style={{ width: "500px" }}
              alt="mainImage"
            />
          </div>
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3>
              더 이상 소모적이고 의무적인 만남은 그만!
              <br />
              나와 코드가 맞고 서로 공감 할 수 있는 또는 생산적인 친구를 찾아보세요!
              <SmileOutlined style={{ paddingLeft: "1rem" }} />
            </h3>
          </div>

          <br />
          {props.user.userData && props.user.userData.isAuth === false ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h2>
                <LoginOutlined />
                &nbsp;
                <a href={"/login"}>로그인 하러가기</a>
                <br />
                <UserAddOutlined />
                &nbsp;
                <a href={"/register"}>회원가입 하러가기</a>
              </h2>
            </div>
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <a href={`/main`}>
                <h2>
                  <DoubleRightOutlined />
                  <HeartTwoTone twoToneColor="#eb2f96" />
                  새로운 친구들 보러가기
                  <HeartTwoTone twoToneColor="#eb2f96" />
                  <DoubleLeftOutlined />
                </h2>
              </a>
            </div>
          )}
        </PC>
      </div>
      <div className="mobile_container">
        <Mobile>
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <Title level={2}>Friend Optimized For Me</Title>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src="/images/friends1.jpg"
              style={{ width: "250px" }}
              alt="mainImage"
            />
          </div>
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h4>
              더 이상 소모적이고 의무적인 만남은 그만!
              <br />
              나와 코드가 맞고 서로 공감 할 수 있는 친구를 찾아보세요!
              <SmileOutlined style={{ paddingLeft: "1rem" }} />
            </h4>
          </div>

          <br />
          {props.user.userData && props.user.userData.isAuth === false ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h3>
                <LoginOutlined />
                &nbsp;
                <a href={"/login"}>로그인 하러가기</a>
                <br />
                <UserAddOutlined />
                &nbsp;
                <a href={"/register"}>회원가입 하러가기</a>
              </h3>
            </div>
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <a href={`/main`}>
                <h3>
                  <DoubleRightOutlined />
                  <HeartTwoTone twoToneColor="#eb2f96" />
                  새로운 친구들 보러가기
                  <HeartTwoTone twoToneColor="#eb2f96" />
                  <DoubleLeftOutlined />
                </h3>
              </a>
            </div>
          )}
        </Mobile>
      </div>
    </div>
  );
}

export default LandingPage;
