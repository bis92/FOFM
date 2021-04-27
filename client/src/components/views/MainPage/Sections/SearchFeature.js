import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;

function SearchFeature(props) {
  const [SearchTerm, setSearchTerm] = useState("");

  const searchHandler = (event) => {
    setSearchTerm(event.currentTarget.value);
    props.refreshFunction(event.currentTarget.value);
  };

  return (
    <div>
      <Search
        placeholder="취미/관심사를 입력하세요.  EX)헬스"
        style={{
          width: 290,
        }}
        onChange={searchHandler}
      />
    </div>
  );
}

export default SearchFeature;
