import { useState } from "react";
import StatusBar from "../../components/common/StatusBar";
import TabBarComponent from "../../components/common/TabBarComponent";
import BookListPage from "../../components/LibraryPage/BookListPage";
import BookCasePage from "../../components/LibraryPage/BookCasePage";
import Header from "../../components/RecordingPage/Header";
import BottomSheetModal from "../../components/common/BottomSheetModal";
import ButtonComponent from "../../components/common/ButtonComponent";
import ListIcon from "../../components/LibraryPage/ListIcon";
import CoverIcon from "../../components/LibraryPage/CoverIcon";
import plus_orange from "../../assets/common/plus-orange.svg";
import { postAddFolder } from "../../api/library";

const LibraryPage = () => {
  const [tab, setTab] = useState("책 목록");
  const [isClicked, setIsClicked] = useState("list");
  const [showAddBookCaseBottomSheet, setShowAddBookCaseBottomSheet] =
    useState(false);
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleIconClick = (view) => {
    setIsClicked(view);
  };

  const handleModalCancel = () => {
    setVisible(false); // 닫는 애니메이션 시작
    setTimeout(() => {
      setShowAddBookCaseBottomSheet(false); // 애니메이션이 끝난 후 모달 완전히 닫기
    }, 300);
  };

  const handleAddFolder = async () => {
    const data = {
      folderName: inputValue,
    };
    const res = await postAddFolder(data);
    window.location.reload();
    setShowAddBookCaseBottomSheet(false);
    console.log(res);
  };

  return (
    <>
      <StatusBar />
      <div className="relative flex flex-col ">
        <Header title="서재" />
        <TabBarComponent
          tabs={["책 목록", "책장"]}
          activeTab={tab}
          onTabClick={setTab}
          size="small"
          borderWidth="3rem"
        />

        <div className="absolute right-0 top-[3.8rem] right-[0.63rem]">
          {tab === "책 목록" && (
            <div className="flex gap-2 cursor-pointer">
              <ListIcon handleClick={handleIconClick} isClicked={isClicked} />
              <CoverIcon handleClick={handleIconClick} isClicked={isClicked} />
            </div>
          )}
          {tab === "책장" && (
            <div
              onClick={() => setShowAddBookCaseBottomSheet(true)}
              className="flex gap-1 items-center mr-[0.37rem] cursor-pointer"
            >
              <img src={plus_orange} />
              <div className="text-b2 text-gray-800">책장추가</div>
            </div>
          )}
        </div>

        <div>
          {tab === "책 목록" && <BookListPage view={isClicked} />}
          {tab === "책장" && (
            <BookCasePage
              showAddBookCaseBottomSheet={showAddBookCaseBottomSheet}
            />
          )}
        </div>
      </div>
      {showAddBookCaseBottomSheet && (
        <BottomSheetModal
          bottomSheetShow={showAddBookCaseBottomSheet}
          setBottomSheetShow={setShowAddBookCaseBottomSheet}
          visible={visible}
          setVisible={setVisible}
        >
          <div className="px-4 pb-3">
            <div className="flex justify-between">
              <div className="text-st text-gray-800 font-semibold">
                책장 추가
              </div>
              <div
                onClick={handleModalCancel}
                className="text-b1 text-gray-500 cursor-pointer"
              >
                취소
              </div>
            </div>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="책장 이름을 입력하세요"
              className="w-full mt-[1.62rem] mb-[3.19rem] px-1 py-2 border-b-[1px] border-[#DDDDDD]"
            />
            <ButtonComponent
              text="완료"
              type="primary"
              disabled={!inputValue}
              onClick={handleAddFolder}
            />
          </div>
        </BottomSheetModal>
      )}
    </>
  );
};
export default LibraryPage;
