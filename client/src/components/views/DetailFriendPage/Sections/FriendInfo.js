import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Descriptions, Button, message } from "antd";
import { getDetailFriend } from "../../../../_actions/user_actions";
import axios from "axios";
import { LeftOutlined } from "@ant-design/icons";

const Mbtis = [
  "none",
  "ISTJ",
  "ISFJ",
  "INFJ",
  "INTJ",
  "ISTP",
  "ISFP",
  "INFP",
  "INTP",
  "ESTP",
  "ESFP",
  "ENFP",
  "ENTP",
  "ESTJ",
  "ESFJ",
  "ENFJ",
  "ENTJ",
];

function FriendInfo(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const history = useHistory();

  const updateHandler = (friendId) => {
    dispatch(getDetailFriend(friendId)).then((response) => {
      if (response.payload) {
        history.push({
          pathname: "/update",
          state: { friendData: response.payload },
        });
      }
    });
  };

  const deleteHandler = (friendId) => {
    axios
      .delete(`/api/friends/deleteFriend?id=${friendId}`)
      .then((response) => {
        if (response.data.success) {
          message.success("성공적으로 삭제하였습니다.");
          setTimeout(() => {
            history.push("/main");
          }, 2000);
        } else {
          alert("삭제에 실패했습니다.");
        }
      });
  };

  const clickHandler = () => {
    history.push("/main");
  };

  return (
    <div>
      <Descriptions title="친구 정보" bordered>
        <Descriptions.Item label="이름">{props.detail.name}</Descriptions.Item>
        <Descriptions.Item label="성별">
          {props.detail.gender === 0 ? "남자":"여자"}
        </Descriptions.Item>
        <Descriptions.Item label="나이">{props.detail.age}</Descriptions.Item>
        <Descriptions.Item label="거주지" span={2}>
          {props.detail.address}
        </Descriptions.Item>
        <Descriptions.Item label="취미/관심사" span={3}>
          {props.detail.interest}
        </Descriptions.Item>
        <Descriptions.Item label="MBTI">
          {Mbtis[props.detail.mbtis]}
        </Descriptions.Item>
        <Descriptions.Item label="연락처/소통방법" span={2}>
          {props.detail.contact}
        </Descriptions.Item>
        <Descriptions.Item label="자기소개" span={4}>
          {props.detail.introduce}
        </Descriptions.Item>
      </Descriptions>

      <br />
      <br />
      <br />
      <br />

      {user.userData?.isAuth && props.detail.writer === user.userData._id ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button size="large" onClick={() => updateHandler(props.friendId)}>
            수정
          </Button>
          &nbsp;
          <Button
            size="large"
            type="danger"
            onClick={() => deleteHandler(props.friendId)}
          >
            삭제
          </Button>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button size="large" onClick={() => clickHandler()}>
            <LeftOutlined />
            메인으로 이동
            <LeftOutlined />
          </Button>
        </div>
      )}
    </div>
  );
}

export default FriendInfo;
