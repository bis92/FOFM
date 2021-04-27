import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

function FriendImage(props) {
  const [Images, setImages] = useState([]);

  useEffect(() => {
    let images = [];

    if (props.detail.images && props.detail.images.length > 0) {
      props.detail.images.map((item) =>
        images.push({
          original: `${item}`,
          thumbnail: `${item}`,
        })
      );
      setImages(images);
    }
  }, [props.detail]);

  return (
    <div>
      <ImageGallery items={Images} />
    </div>
  );
}

export default FriendImage;
