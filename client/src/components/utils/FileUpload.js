import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";

function FileUpload(props) {
  const user = useSelector((state) => state.user);
  const [Images, setImages] = useState(
    user.getDetailFriend ? user.getDetailFriend[0].images : []
  );

  const dropHandler = (files) => {
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/formData" },
    };

    formData.append("file", files[0]);

    axios.post("/api/friends/image", formData, config).then((response) => {
      if (response.data.success) {
        fetch(response.data.filePath, {
          header: {
            Accept: "application/json",
          },
        })
          .then((data) => {
            setImages([...Images, data.url]);
            props.refreshFunction([...Images, data.url]);
          })
          .catch(function (error) {
            console.log("OH NO! " + error);
          });
      } else {
        alert("이미지를 가져오는데 실패했습니다");
      }
    });
  };

  const deleteHandler = (image) => {
    const currentIndex = Images.indexOf(image);

    const newImages = [...Images];

    newImages.splice(currentIndex, 1);
    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: 300,
              height: 240,
              border: "1px solid lightgray",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <PlusOutlined style={{ fontSize: "3rem" }} />
          </div>
        )}
      </Dropzone>
      <div
        style={{
          width: "350px",
          height: "240px",
          overflowX: "scroll",
          display: "flex",
        }}
      >
        {Images.map((image, index) => (
          <div key={index} onClick={() => deleteHandler(image)}>
            <img
              style={{ width: "300px", minWidth: "300px", height: "240px" }}
              src={`${image}`}
              alt="image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
