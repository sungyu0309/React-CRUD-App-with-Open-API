import React, { useState } from "react";
import styled from "styled-components";
import Image from "../../imgs/image.svg";
import { Horizontal, Vertical } from "../../styles/CommunalStyle";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function MakeTripComponent({ airlineInfo, closeModal }) {
  const [imgArr, setImgArr] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const onSubmit = (data) => {
    setLoading(true);
    const newImgArr = imgArr.map((itm) => itm.src);
    const newArr = {
      title: data.title,
      memo: data.memo,
      pic: newImgArr,
      Departure: airlineInfo.startcity,
      Arrival: airlineInfo.arrivalcity,
      DepartureTime: airlineInfo.domesticStartTime
        ? airlineInfo.domesticStartTime
        : airlineInfo.internationalTime,
      ArrivalTime: airlineInfo.domesticArrivalTime
        ? airlineInfo.domesticArrivalTime
        : "TBC",
      DepartureCode: airlineInfo.departCode,
      ArrivalCode: airlineInfo.arriveCode,
      AirlineName: airlineInfo.airlineKorean,
    };

    axios
      .post(
        "https://670731a0a0e04071d2296047.mockapi.io/flight/wanderAir",
        newArr
      )
      .then((response) => {
        closeModal();
      })
      .catch((err) => {
        alert("사진의 크기가 너무 큽니다! 200kb 미만의 사진만 추가해주세요");
      });
  };

  return (
    <Vertical style={{ marginTop: "40px" }}>
      {!loading ? (
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "70%" }}>
          <Title
            placeholder="제목"
            {...register("title", { required: true })}
          />
          {errors.title && <p>Title is required</p>}

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
            {...register("memo", { required: true })}
          />
          {errors.memo && <p>Memo is required</p>}

          <SubmitBtn type="submit">Add</SubmitBtn>
        </form>
      ) : (
        <div>로딩중..</div>
      )}
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
  margin-top: 10px;
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

const SubmitBtn = styled.button`
  margin-top: 20px;
  border-radius: 8px;
  font-size: 20px;
  border: 1px solid #e99953;
  background-color: #e99953;
  color: white;
  width: 60%;
  height: 40px;
`;
