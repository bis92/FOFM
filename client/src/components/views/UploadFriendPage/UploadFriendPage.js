import React, { useState } from "react";
import { Form, Input, Typography, Button, message } from "antd";
import FileUpload from "../../utils/FileUpload";
import { SmileTwoTone } from "@ant-design/icons";
import axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

const genderOptions = [
  { value: 0, label: "남자" },
  { value: 1, label: "여자" },
];

const Mbtis = [
  { value: 1, label: "ISTJ" },
  { value: 2, label: "ISFJ" },
  { value: 3, label: "INFJ" },
  { value: 4, label: "INTJ" },
  { value: 5, label: "ISTP" },
  { value: 6, label: "ISFP" },
  { value: 7, label: "INFP" },
  { value: 8, label: "INTP" },
  { value: 9, label: "ESTP" },
  { value: 10, label: "ESFP" },
  { value: 11, label: "ENFP" },
  { value: 12, label: "ENTP" },
  { value: 13, label: "ESTJ" },
  { value: 14, label: "ESFJ" },
  { value: 15, label: "ENFJ" },
  { value: 16, label: "ENTJ" },
];

function UploadFriendPage(props) {
  const [Name, setName] = useState("");
  const [Gender, setGender] = useState(0);
  const [Age, setAge] = useState(0);
  const [Address, setAddress] = useState("");
  const [Interest, setInterest] = useState("");
  const [MBTI, setMBTI] = useState("");
  const [Contact, setContact] = useState("");
  const [Introduce, setIntroduce] = useState("");
  const [Images, setImages] = useState([]);

  const onChangeName = (event) => {
    setName(event.currentTarget.value);
  };

  const onChangeGender = (event) => {
    setGender(event.currentTarget.value);
  };

  const onChangeAge = (event) => {
    setAge(event.currentTarget.value);
  };

  const onChangeAddress = (event) => {
    setAddress(event.currentTarget.value);
  };

  const onChangeInterest = (event) => {
    setInterest(event.currentTarget.value);
  };

  const onChangeMBTI = (event) => {
    setMBTI(event.currentTarget.value);
  };

  const onChangeContact = (event) => {
    setContact(event.currentTarget.value);
  };

  const onChangeIntroduce = (event) => {
    setIntroduce(event.currentTarget.value);
  };
  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let body = {
      writer: props.user.userData._id,
      name: Name,
      gender: Gender,
      age: Age,
      address: Address,
      interest: Interest,
      mbtis: MBTI,
      contact: Contact,
      introduce: Introduce,
      images: Images,
    };

    axios.post("/api/friends", body).then((response) => {
      if (response.data.success) {
        message.success("친구를 성공적으로 등록했습니다.");
        setTimeout(() => {
          props.history.push("/main");
        }, 3000);
      } else {
        alert("친구 등록에 실패했습니다.");
      }
    });
  };

  const cancleHandler = () => {
    props.history.push("/main");
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ justifyContent: "center" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Title level={1}>
            친구 등록 <SmileTwoTone />
          </Title>
        </div>
        <Form onSubmit={submitHandler}>
          {/* FileUpload */}
          <FileUpload refreshFunction={updateImages} />

          <br />
          <br />

          <label>이름/닉네임</label>
          <Input value={Name} onChange={onChangeName} />

          <br />
          <br />

          <label>성별 : </label>
          <select onChange={onChangeGender} value={Gender}>
            {genderOptions.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <br />
          <br />

          <label>나이</label>
          <Input value={Age} onChange={onChangeAge} />

          <br />
          <br />

          <label>지역</label>
          <Input value={Address} onChange={onChangeAddress} />

          <br />
          <br />

          <label>취미/관심사</label>
          <Input value={Interest} onChange={onChangeInterest} />

          <br />
          <br />

          <label>MBTI : </label>
          <select onChange={onChangeMBTI} value={MBTI}>
            {Mbtis.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <br />
          <br />

          <label>연락처(소통 방법)</label>
          <Input
            value={Contact}
            onChange={onChangeContact}
            placeholder="카카오톡ID, 이메일, 휴대폰번호 등등"
          />

          <br />
          <br />
          <label>소개</label>
          <TextArea value={Introduce} onChange={onChangeIntroduce} />

          <br />
          <br />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              size="large"
              style={{ backgroundColor: "blue", color: "white" }}
              onClick={submitHandler}
            >
              등록
            </Button>
            &nbsp;
            <Button size="large" type="danger" onClick={cancleHandler}>
              취소
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default UploadFriendPage;
