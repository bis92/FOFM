import React from "react";
import { Carousel } from "antd";

function ImageSlider(props) {
  return (
    <div>
      <Carousel autoplay>
        {props.images &&
          props.images.map((image, index) => (
            <div key={index}>
              <img
                src={`${image}`}
                alt="images"
                style={{ width: "100%", height: "200px" }}
              />
            </div>
          ))}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
