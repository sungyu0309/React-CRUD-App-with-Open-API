import moment from "moment";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

export default function CalenderComponent(props) {
  const today = new Date();

  const [limitDate, setLimitDate] = useState({
    minLimitDate: "",
    maxLimitDate: "",
  });

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    const newDate = new Date(result);
    return newDate;
  };

  const subDays = (date, days) => {
    let result = new Date(date);
    result.setDate(result.getDate() - days);
    const newDate = new Date(result);
    return newDate;
  };

  const handleChangeDate = (e) => {
    console.log(e);
    const clickedDate = moment(e).format("YYYY-MM-DD");
    if (props.type === "minDateBtn") {
      props.setDate((prev) => ({ ...prev, minDate: clickedDate }));
    } else {
      props.setDate((prev) => ({ ...prev, maxDate: clickedDate }));
    }
    props.closeModal();
  };

  useEffect(() => {
    let newArr;
    if (props.date.maxDate) {
      const maxDate = props.date.maxDate;
      if (subDays(maxDate, 7) > today) {
        const { maxLimitDate, ...prev } = limitDate;
        newArr = { ...prev, minLimitDate: subDays(maxDate, 7) };
      } else {
        const { minLimitDate, ...prev } = limitDate;
        newArr = { ...prev, minLimitDate: today };
      }
    } else {
      const { minLimitDate, ...prev } = limitDate;
      newArr = { ...prev, minLimitDate: today };
    }

    if (props.date.minDate) {
      const minDate = props.date.minDate;
      if (props.type === "minDateBtn") {
        newArr.maxLimitDate = addDays(minDate, 7);
      } else {
        newArr = {
          minLimitDate: subDays(minDate, 0),
          maxLimitDate: addDays(minDate, 7),
        };
      }
    }

    setLimitDate(newArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledCalendarWrapper>
      <StyledCalendar
        onChange={(e) => handleChangeDate(e)}
        formatDay={(locale, date) => moment(date).format("D")}
        formatYear={(locale, date) => moment(date).format("YYYY")}
        formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
        calendarType="gregory"
        showNeighboringMonth={true}
        next2Label={null}
        prev2Label={null}
        minDetail="year"
        minDate={limitDate.minLimitDate}
        maxDate={limitDate.maxLimitDate}
        // 오늘 날짜에 '오늘' 텍스트 삽입하고 출석한 날짜에 점 표시를 위한 설정
        tileContent={({ date, view }) => {
          let html = [];
          if (
            view === "month" &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
          ) {
            html.push(<StyledToday key={"today"}>오늘</StyledToday>);
          }
          return <>{html}</>;
        }}
      />
    </StyledCalendarWrapper>
  );
}

const StyledCalendarWrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  position: relative;
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
  }
  .react-calendar__month-view {
    abbr {
      color: black;
    }
  }
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
    color: red;
  }
  .react-calendar__tile {
    padding: 5px 0px 18px;
    position: relative;
    &:hover {
      background-color: rgb(185, 183, 182);
    }
  }
  .react-calendar__tile:disabled {
    background-color: white;
    > abbr {
      opacity: 0.4;
      color: gray;
    }
  }
`;
// 캘린더를 불러옴
const StyledCalendar = styled(Calendar)`
  border: none;
  .react-calendar__navigation__label {
    pointer-events: none;
  }
`;

/* 오늘 날짜에 텍스트 삽입 스타일 */
const StyledToday = styled.div`
  font-size: x-small;
  color: blue;
  font-weight: 600;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
`;
