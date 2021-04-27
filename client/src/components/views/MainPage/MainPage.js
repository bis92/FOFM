import React, { useEffect, useState } from "react";
import axios from "axios";
import { TeamOutlined } from "@ant-design/icons";
import { Row, Col, Card, Button } from "antd";
import ImageSlider from "../../utils/ImageSlider";
import { mbtis, age } from "./Sections/Datas";
import CheckBox from "./Sections/CheckBox";
import RadioBox from "./Sections/RadioBox";
import SearchFeature from "./Sections/SearchFeature";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

const { Meta } = Card;

function MainPage(props) {
  const user = props.user;
  const [Friends, setFriends] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({
    mbtis: [],
    age: [],
  });
  const [SearchTerm, setSearchTerm] = useState("");
  const [SearchAddress, setSearchAddress] = useState("");

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };

    getFriends(body);
  }, []);

  const getFriends = (body) => {
    axios.post("/api/friends/getFriends", body).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          setFriends([...Friends, ...response.data.friendInfo]);
        } else {
          setFriends(response.data.friendInfo);
        }
        setPostSize(response.data.postSize);
      } else {
        alert("친구들을 불러오는데 실패했습니다.");
      }
    });
  };

  const renderCards = Friends.map((friend, index) => (
    <Col key={index} lg={6} md={8} xs={24}>
      <Card
        hoverable
        cover={
          <a href={`/friend/${friend._id}`}>
            <ImageSlider images={friend.images} />
          </a>
        }
      >
        <Meta
          title={`${friend.name}(${friend.age}-${
            friend.gender === 0 ? "남" : "여"
          })`}
          description={friend.address}
        />
      </Card>
    </Col>
  ));

  const loadMoreItems = () => {
    let skip = Skip + Limit;

    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true,
      filters: Filters,
      searchTerm: SearchTerm,
      searchAddress: SearchAddress,
    };

    getFriends(body);
    setSkip(skip);
    setFilters(Filters);
  };

  const showFilteredResult = (filters) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: filters,
      searchTerm: SearchTerm,
      searchAddress: SearchAddress,
    };

    getFriends(body);
  };

  const handlePrice = (filters) => {
    const data = age;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(filters, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };

    newFilters[category] = filters;

    if (category === "age") {
      let ageValues = handlePrice(filters);
      newFilters[category] = ageValues;
    }

    showFilteredResult(newFilters);
    setFilters(newFilters);
  };

  const updateSearchTerm = (newSearchTerm) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
      searchAddress: SearchAddress,
    };

    setSkip(0);
    setSearchTerm(newSearchTerm);

    getFriends(body);
  };

  const onChangeAddress = (event) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: SearchTerm,
      searchAddress: event.currentTarget.value,
    };

    setSkip(0);
    setSearchAddress(event.currentTarget.value);

    getFriends(body);
  };

  const clickHandler = () => {
    let body = {
      writer: user.userData?._id,
      skip: Skip,
      limit: Limit,
    };

    axios.post("/api/friends/getMypost", body).then((response) => {
      if (response.data.success) {
        setFriends(response.data.friendInfo);
        setPostSize(response.data.postSize);
      } else {
        alert("내가 작성한 글을 가져오는데 실패했습니다.");
        let body = {
          skip: Skip,
          limit: Limit,
        };

        getFriends(body);
      }
    });
  };

  const clickRefresh = () => {
    let body = {
      skip: Skip,
      limit: Limit,
    };

    getFriends(body);
  };

  return (
    <div style={{ width: "90%", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", paddingBottom: "2rem" }}>
        <h1>
          등록된 친구들
          <TeamOutlined />
        </h1>
      </div>

      {/* Filters */}

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <CheckBox
            list={mbtis}
            handleFilters={(filters) => handleFilters(filters, "mbtis")}
          />
        </Col>
        <Col lg={12} xs={24}>
          <RadioBox
            list={age}
            handleFilters={(filters) => handleFilters(filters, "age")}
          />
        </Col>
      </Row>

      {/* Search */}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem auto",
        }}
      >
        <SearchFeature refreshFunction={updateSearchTerm} />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "1rem auto",
        }}
      >
        <SearchIcon />
        <InputBase
          style={{ width: 400, paddingRight: "2rem" }}
          placeholder=" 지역을 입력하세요. "
          value={SearchAddress}
          onChange={onChangeAddress}
        />
        {user.userData?.isAuth && (
          <Button onClick={clickHandler}>내가 쓴 글</Button>
        )}
        &nbsp;
        <Button onClick={clickRefresh}>
          초기화
        </Button>
      </div>

      <Row gutter={[16, 16]}>{renderCards}</Row>

      <br />

      {PostSize >= Limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={loadMoreItems}>더보기</Button>
        </div>
      )}
    </div>
  );
}

export default MainPage;
