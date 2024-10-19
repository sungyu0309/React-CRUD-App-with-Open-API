import React, { useState } from "react";
import styled from "styled-components";
import Camera from "../../imgs/camera.svg";

export default function MakeTripComponent() {
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
      contents: contents,
      imgs: imgArr,
    };
    console.log(newArr); // console.log 대신 axios post 코드 작성
  };
  return (
    <>
      <input
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <LabelForPhoto htmlFor="photo">
        <div>
          <img src={Camera} alt="Camera" />
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
      <Content
        placeholder="contents"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
      <button onClick={handleSubmitBtn}>Add</button>
    </>
  );
}

const Content = styled.textarea`
  border: 1px solid black;
  width: 100%;
  height: 100px;
  resize: none;
`;

const LabelForPhoto = styled.label`
  cursor: pointer;
  width: 0;
  height: 0;
  > div {
    border: 1px solid rgb(224, 221, 221);
    border-radius: 8px;
    background-color: rgb(224, 221, 221);
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    > img {
      height: 60%;
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
