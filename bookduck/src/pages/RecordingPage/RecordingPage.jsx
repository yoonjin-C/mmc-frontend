import { useLocation, useNavigate } from "react-router-dom";
import Divider1 from "../../components/common/Divider1";
import Divider2 from "../../components/common/Divider2";
import Header1 from "../../components/common/Header1";
import Header3 from "../../components/common/Header3";
import StatusBar from "../../components/common/StatusBar";
import ColoredAuthorComponent from "../../components/RecordingPage/ColoredAuthorComponent";
import ExtractWritingComponent from "../../components/RecordingPage/ExtractWritingComponent";
import Header2 from "../../components/RecordingPage/Header2";
import ReviewWritingComponent from "../../components/RecordingPage/ReviewWritingComponent";
import { useEffect, useState } from "react";
import BottomSheetModal from "../../components/common/BottomSheetModal";
import WritingTemplate from "../../components/RecordingPage/WritingTemplate";
import ButtonComponent from "../../components/common/ButtonComponent";
import useBookInfoStore from "../../store/useBookInfoStore";
import { postExtractReview } from "../../api/archive";
import useExtractData from "../../store/useExtractDataStore";
import useReviewData from "../../store/useReviewDataStore";
import useReviewColorStore from "../../store/useReviewColorStore";

const RecordingPage = () => {
  const navigate = useNavigate();
  const [viewBottomSheet, setViewBottomSheet] = useState(false);
  const [visible, setVisible] = useState(false);
  const [bottomSheetType, setBottomSheetType] = useState("");
  const [extractPublicState, setExtractPublicState] = useState("전체공개");
  const [reviewPublicState, setReviewPublicState] = useState("전체공개");
  const {
    pageInputValue,
    setPageInputValue,
    extractInputValue,
    setExtractInputValue,
  } = useExtractData();
  const {
    reviewPage,
    setReviewPage,
    titleInputValue,
    setTitleInputValue,
    reviewInputValue,
    setReviewInputValue,
  } = useReviewData();

  const { reviewColor } = useReviewColorStore();

  const { bookInfo, setBookInfo } = useBookInfoStore();

  const handleBack = () => {
    navigate("/selectBook");
  };

  const handleExtractOnChange = (e) => {
    setExtractInputValue(e.target.value);
  };
  const handleReviewOnChange = (e) => {
    setReviewInputValue(e.target.value);
  };

  const handleExtractTextField = () => {
    setViewBottomSheet(true);
    setBottomSheetType("발췌");
  };

  const handleReviewTextField = () => {
    setViewBottomSheet(true);
    setBottomSheetType("감상평");
  };

  const handleBackdropClick = () => {
    setVisible(false); // 닫는 애니메이션 시작
    setTimeout(() => {
      setViewBottomSheet(false); // 애니메이션이 끝난 후 모달 완전히 닫기
    }, 300);
  };
  console.log(bookInfo);

  const handleComplete = async () => {
    const data = {};
    if (pageInputValue && extractInputValue && reviewInputValue) {
      data.excerpt = {
        excerptContent: extractInputValue,
        visibility: extractPublicState === "전체공개" ? "PUBLIC" : "PRIVATE",
        pageNumber: parseInt(pageInputValue, 10),
        userBookId: bookInfo.userBookId,
      };
      data.review = {
        reviewTitle: titleInputValue,
        reviewContent: reviewInputValue,
        color: reviewColor,
        visibility: reviewPublicState === "전체공개" ? "PUBLIC" : "PRIVATE",
        userBookId: bookInfo.userBookId,
      };
    } else if (pageInputValue && extractInputValue) {
      data.excerpt = {
        excerptContent: extractInputValue,
        visibility: extractPublicState === "전체공개" ? "PUBLIC" : "PRIVATE",
        pageNumber: parseInt(pageInputValue, 10),
        userBookId: bookInfo.userBookId,
      };
    } else if (reviewInputValue) {
      data.review = {
        reviewTitle: titleInputValue,
        reviewContent: reviewInputValue,
        color: reviewColor,
        visibility: reviewPublicState === "전체공개" ? "PUBLIC" : "PRIVATE",
        userBookId: bookInfo.userBookId,
      };
    }

    // userBook: {
    //   title: bookInfo.title,
    //   authors: [bookInfo.author],
    //   publisher: "bookInfo.publisher",
    //   publishDate: "2020-10-10",
    //   description: "<p><b>description...</p>",
    //   genreId: 1,
    //   category: ["fiction"],
    //   imgPath: bookInfo.imgPath,
    //   language: "한글",
    //   readStatus: bookInfo.readStatus,
    //   providerId: "Q7uTBgAAQBAJTEST3",
    // },

    console.log(data);
    const res = await postExtractReview(data);
    console.log(res);
    setBookInfo({});
    setPageInputValue();
    setExtractInputValue("");
    setTitleInputValue("");
    setReviewInputValue("");
    navigate("/archive");
  };

  return (
    <>
      <StatusBar />
      <Header3
        title="기록하기"
        check={true}
        handleBack={handleBack}
        handleComplete={handleComplete}
      />
      <div className="flex flex-col gap-[1rem] mx-4">
        <div className="mt-5">
          <ColoredAuthorComponent
            title={bookInfo.title}
            author={bookInfo.author}
          />
        </div>
      </div>
      <div className="mx-4">
        <ExtractWritingComponent
          inputValue={extractInputValue}
          setInputValue={setExtractInputValue}
          pageInputValue={pageInputValue}
          handleTextField={handleExtractTextField}
          extractPublicState={extractPublicState}
          setExtractPublicState={setExtractPublicState}
        />
      </div>
      <div className="mt-7 mb-4">
        <Divider2 />
      </div>
      <div className="mx-4">
        <ReviewWritingComponent
          inputValue={reviewInputValue}
          handleTextField={handleReviewTextField}
          titleInputValue={titleInputValue}
          bookTitleValue={bookInfo.title}
          authorValue={bookInfo.author}
          reviewPublicState={reviewPublicState}
          setReviewPublicState={setReviewPublicState}
        />
      </div>
      <div className="h-[7.5rem]"></div>
      <div className="relative">
        <BottomSheetModal
          bottomSheetShow={viewBottomSheet}
          setBottomSheetShow={setViewBottomSheet}
          visible={visible}
          setVisible={setVisible}
        >
          <div className="absolute w-10 h-1 top-[0.75rem] left-1/2 -translate-x-1/2 rounded-[0.25rem] bg-gray-300"></div>

          <div className="flex flex-col gap-3 items-center">
            {bottomSheetType === "발췌" && (
              <>
                <WritingTemplate height="18rem">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-end">
                      <div className="flex items-center justify-center gap-1">
                        <input
                          type="number"
                          placeholder="페이지"
                          value={pageInputValue}
                          onChange={(e) => setPageInputValue(e.target.value)}
                          className="w-[2.5rem] bg-transparent text-b2 text-gray-800"
                        />
                        <div className="text-b2 text-gray-400">p</div>
                      </div>
                    </div>
                    <textarea
                      value={extractInputValue}
                      onChange={handleExtractOnChange}
                      placeholder="책의 구절을 입력하세요"
                      className="w-[20.5625rem] h-[13rem] mt-2 bg-transparent text-b2 text-gray-800 appearance-none outline-none resize-none"
                    />
                  </div>
                </WritingTemplate>
                <ButtonComponent
                  text="완료"
                  type="primary"
                  color="gray"
                  onClick={handleBackdropClick}
                  disabled={!extractInputValue}
                />
              </>
            )}
            {bottomSheetType === "감상평" && (
              <>
                <WritingTemplate height="18rem">
                  <div className="flex flex-col gap-2">
                    <input
                      value={titleInputValue}
                      onChange={(e) => setTitleInputValue(e.target.value)}
                      placeholder="제목"
                      className="text-b1 font-semibold bg-transparent"
                    />
                    <textarea
                      value={reviewInputValue}
                      onChange={handleReviewOnChange}
                      placeholder="책에 대한 자유로운 감상을 기록하세요"
                      className="w-[20.5625rem] h-[13.5rem] mt-2 bg-transparent text-b2 text-gray-800 appearance-none outline-none resize-none"
                    />
                  </div>
                </WritingTemplate>
                <ButtonComponent
                  text="완료"
                  type="primary"
                  color="gray"
                  onClick={handleBackdropClick}
                  disabled={!reviewInputValue}
                />
              </>
            )}
          </div>
        </BottomSheetModal>
      </div>
    </>
  );
};
export default RecordingPage;
