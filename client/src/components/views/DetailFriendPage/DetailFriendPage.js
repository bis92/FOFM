import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import axios from "axios";
import FriendImage from "./Sections/FriendImage";
import FriendInfo from "./Sections/FriendInfo";

function DetailFriendPage(props) {
  const friendId = props.match.params.friendId;
  const user = props.user;
  const [Friend, setFriend] = useState({});

  useEffect(() => {
    axios
      .get(`/api/friends/friends_by_id?id=${friendId}&type=single`)
      .then((response) => {
        setFriend(response.data[0]);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <div style={{ width: "100%", padding: "2rem" }}>
      <div style={{ textAlign: "center" }}>
        <h1>{Friend.name}</h1>
      </div>

      <br />

      <Row gutter={[16, 16]}>
        <Col lg={9} sm={24}>
          <FriendImage detail={Friend} />
        </Col>
        <Col lg={15} sm={24}>
          <FriendInfo detail={Friend} user={user} friendId={friendId} />
        </Col>
      </Row>
    </div>
  );
}

export default DetailFriendPage;
