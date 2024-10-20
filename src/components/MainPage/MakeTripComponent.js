import React, { useState } from "react";
import styled from "styled-components";
import Image from "../../imgs/image.svg";
import { Horizontal, Vertical } from "../../styles/CommunalStyle";

export default function MakeTripComponent({ airlineInfo }) {
  const [imgArr, setImgArr] = useState([]);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const getRandomNum = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  const readURL = (event) => {
    for (let image of event.target.files) {
      let reader = new FileReader();

      reader.onload = function (event) {
        const src = event.target.result;
        const newArr = {
          id: getRandomNum().toString() + getRandomNum().toString(),
          src: src,
        };
        setImgArr((prev) => [...prev, newArr]);
      };
      reader.readAsDataURL(image);
    }
  };

  const deleteImg = (id) => {
    const newArr = imgArr.filter((itm) => itm.id !== id);
    setImgArr(newArr);
  };

  const handleSubmitBtn = () => {
    const newArr = {
      title: title,
      memo: contents,
      imgs: imgArr,
    };
    console.log(newArr); // console.log 대신 axios post 코드 작성
    console.log(airlineInfo);
  };
  return (
    <Vertical style={{ marginTop: "40px" }}>
      <Title
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Horizontal style={{ justifyContent: "flex-start" }}>
        <LabelForPhoto htmlFor="photo">
          <div>
            <img src={Image} alt="p" />
          </div>
        </LabelForPhoto>
        <input
          style={{ display: "none" }}
          type="file"
          id="photo"
          multiple
          accept="image/*"
          onChange={(e) => readURL(e)}
        />
        <ImagesContainer>
          {imgArr.map((itm) => (
            <ImgWrapper key={itm.id}>
              <i
                className="fa fa-close"
                style={{ fontSize: "15px" }}
                onClick={() => deleteImg(itm.id)}
              />
              <img src={itm.src} alt="img" />
            </ImgWrapper>
          ))}
        </ImagesContainer>
      </Horizontal>
      <Content
        placeholder="메모"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
      <button onClick={handleSubmitBtn}>Add</button>
    </Vertical>
  );
}

const Title = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 4px;
  border: 1px solid black;
  padding-left: 20px;
  box-sizing: border-box;
  font-size: 20px;
  font-weight: 600;
  &:focus {
    outline: none;
  }
`;

const Content = styled.textarea`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid black;
  width: 100%;
  height: 130px;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 13px;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const LabelForPhoto = styled.label`
  cursor: pointer;
  margin-top: 10px;

  > div {
    border: 1px solid rgb(224, 221, 221);
    border-radius: 8px;
    background-color: white;
    width: 50px;
    height: 5ch;
    display: flex;
    align-items: center;
    justify-content: center;
    > img {
      height: 80%;
    }
  }
`;

const ImagesContainer = styled.div`
  overflow-x: auto;
  margin: 20px 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 5px;
  border: none;
`;

const ImgWrapper = styled.div`
  position: relative;
  > img {
    border: 1px solid rgb(207, 205, 205);
    border-radius: 8px;
    width: 60px;
    height: 60px;
    margin-right: 10px;
  }

  > i {
    top: -3px;
    right: 7px;
    position: absolute;
    cursor: pointer;
    border: 1px solid rgb(207, 205, 205);
    background-color: beige;
    border-radius: 2px;
  }
`;
