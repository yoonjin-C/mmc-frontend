import React from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "../../components/common/StatusBar";
import SearchComponent from "../../components/common/SearchComponent";
import BookComponent from "../../components/search/BookComponent";
import ButtonComponent from "../../components/common/ButtonComponent";
import duck from "../../assets/common/duck.svg";
const SearchMainPage = () => {
  const navigate = useNavigate();
  const recentBooks = [
    { id: "1", img: duck, title: "가나다라", writer: "나작가" },
    { id: "2", img: duck, title: "마바사", writer: "김작가" },
    { id: "3", img: duck, title: "큐큐", writer: "하이" },
  ];
  const bestBooks = [
    { id: "1", img: duck, title: "가나다라", writer: "나작가" },
    { id: "2", img: duck, title: "마바사", writer: "김작가" },
    { id: "3", img: duck, title: "큐큐", writer: "하이" },
    { id: "4", img: duck, title: "안녕", writer: "나작가" },
    { id: "5", img: duck, title: "가나다라", writer: "나작가" },
  ];
  return (
    <div>
      <StatusBar />
      <SearchComponent />
      <div className="flex flex-col px-4 gap-3 mt-4">
        <div>최근 기록한 책</div>
        <div className="flex flex-row gap-3">
          {recentBooks.map((book) => {
            return (
              <BookComponent
                key={book.id}
                img={book.img}
                title={book.title}
                writer={book.writer}
              />
            );
          })}
        </div>
      </div>
      <div className="flex justify-between px-7 py-4 bg-[#FBFBFB] my-5">
        <div className="flex flex-col gap-1 justify-center">
          <span className="text-btn3 text-gray-400">
            원하는 책을 찾을 수 없나요?
          </span>
          <span className="text-btn3 text-gray-800">
            직접 책을 등록해보세요
          </span>
        </div>
        <ButtonComponent
          text="책 등록하기"
          type="secondary"
          color="orange"
          size="medium"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="flex flex-col px-4 gap-3">
        <div>요즘 많이 읽는 책 Top 10</div>
        <div className="flex flex-row gap-3">
          <BookComponent />
          <BookComponent />
          <BookComponent />
        </div>
      </div>
    </div>
  );
};

export default SearchMainPage;
