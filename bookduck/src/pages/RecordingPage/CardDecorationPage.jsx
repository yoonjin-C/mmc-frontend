import { useLocation, useNavigate } from "react-router-dom";
import Header3 from "../../components/common/Header3";
import StatusBar from "../../components/common/StatusBar";
import ReviewComponents from "../../components/RecordingPage/ReviewComponents";
import Divider1 from "../../components/common/Divider1";
import RoundedTabComponent from "../../components/common/RoundedTabComponent";
import { useEffect, useState } from "react";
import ColorPalette from "../../components/RecordingPage/ColorPalette";
import { colorDefaultPalette } from "../../constant/colorDefaultPalette";
import { colorThemePalette } from "../../constant/colorThemePalette";
import ButtonComponent from "../../components/common/ButtonComponent";
import useReviewColorStore from "../../store/useReviewColorStore";

const CardDecorationPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("기본");
  const { setReviewColor } = useReviewColorStore();
  const navigate = useNavigate();
  const textValue = location.state?.textValue;
  const reviewTitleValue = location.state?.titleValue;
  const bookTitleValue = location.state?.bookTitleValue;
  const authorValue = location.state?.authorValue;

  const hanldleColor = (color) => {
    setReviewColor(color);
    console.log(color);
  };

  const handleComplete = () => {
    navigate("/recording");
  };

  return (
    <>
      <StatusBar />
      <Header3 title="감상평 카드 꾸미기" />
      <div className="flex justify-center mt-[2.69rem] mb-[5.12rem]">
        <ReviewComponents
          content={textValue}
          reviewTitle={reviewTitleValue}
          title={bookTitleValue}
          author={authorValue}
        />
      </div>
      <div className="relative min-h-[26rem] rounded-t-[1.25rem] shadow-custom2">
        <div className="px-6 pt-8 pb-3">
          <RoundedTabComponent
            type="primary"
            tabs={["기본", "테마"]}
            activeTab={activeTab}
            onTabClick={setActiveTab}
          />
        </div>
        <div className="px-[1.88rem] py-5">
          {activeTab === "기본" && (
            <ColorPalette
              palette={colorDefaultPalette}
              handleColor={hanldleColor}
            />
          )}
          {activeTab === "테마" && (
            <ColorPalette
              palette={colorThemePalette}
              handleColor={hanldleColor}
            />
          )}
        </div>
        <div className="absolute bottom-[2.13rem] flex justify-center w-[24.5625rem] mx-auto ">
          <ButtonComponent
            text="완료"
            type="primary"
            color="gray"
            onClick={handleComplete}
          />
        </div>
      </div>
    </>
  );
};
export default CardDecorationPage;
