import { useState } from "react";
import BottomNavbar from "../../components/common/BottomNavbar";
import Header from "../../components/RecordingPage/Header";

import TotalView from "../../components/RecordingPage/TotalView";
import TabBarComponent from "../../components/common/TabBarComponent";
import ExtractView from "../../components/RecordingPage/ExtractView";
import ReviewView from "../../components/RecordingPage/ReviewView";
import StatusBar from "../../components/common/StatusBar";
import { useNavigate } from "react-router-dom";
import FloatingRecordButton from "../../components/common/FloatingRecordButton";
import { useQuery } from "@tanstack/react-query";
import { getExtractReview } from "../../api/archive";
import { getUserId } from "../../api/oauth";

const ArchivePage = () => {
  const [tab, setTab] = useState("전체보기");
  const navigate = useNavigate();

  const handleRecording = () => {
    navigate("/selectBook");
  };

  return (
    <>
      <StatusBar />
      <div className="flex flex-col ">
        <Header title="기록 아카이브" />
        <TabBarComponent
          tabs={["전체보기", "발췌", "감상평"]}
          activeTab={tab}
          onTabClick={setTab}
          size="small"
          borderWidth="3rem"
        />
        <div className="h-[45rem] overflow-y-auto">
          {tab === "전체보기" && <TotalView />}
          {tab === "발췌" && <ExtractView />}
          {tab === "감상평" && <ReviewView />}
          <div className="h-[6rem] bg-transparent"></div>
        </div>
        <div className="fixed bottom-[6.38rem] flex justify-end w-[24.5625rem] cursor-pointer">
          <FloatingRecordButton handleNavigate={handleRecording} />
        </div>

        <BottomNavbar />
      </div>
    </>
  );
};
export default ArchivePage;
