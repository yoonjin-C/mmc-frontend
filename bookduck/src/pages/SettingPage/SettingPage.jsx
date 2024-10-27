import React, { useState } from "react";
import StatusBar from "../../components/common/StatusBar";
import Header1 from "../../components/common/Header1";
import edit from "../../assets/setting/edit.svg";
import kakao from "../../assets/setting/kakao.png";
import ToggleButton from "../../components/common/ToggleButtonComponent";
import BottomSheetModal from "../../components/common/BottomSheetModal";
import TextField from "../../components/common/TextField";
import ButtonComponent from "../../components/common/ButtonComponent";

const SettingPage = () => {
  const [isPushOn, setPushOn] = useState(true);
  const [isFriendOn, setFriendOn] = useState(true);
  const [bottomSheetShow, setBottomSheetShow] = useState(false);

  return (
    <div className="relative w-[24.5625rem]">
      <StatusBar />
      <Header1 title="설정" edit={false} />
      <div className="flex flex-col gap-[2.5rem] px-4 pt-[1.31rem]">
        <div>
          <div className="mb-5 text-st font-semibold">계정 정보</div>
          <div className="flex justify-between items-center h-8 mb-2">
            <span>이름</span>
            <div className="flex items-center gap-2">
              <span>유저닉네임</span>
              <button onClick={() => setBottomSheetShow(true)}>
                <img src={edit} alt="edit" />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center h-8">
            <span>로그인정보</span>
            <div className="flex items-center gap-[0.62rem]">
              <img src={kakao} alt="kakao" />
              <span>1234@naver.com</span>
            </div>
          </div>
        </div>
        <div>
          <div className="mb-5 text-st font-semibold">사용 설정</div>
          <div className="flex justify-between items-center h-8 mb-4">
            <span>푸시 알림 허용</span>
            <ToggleButton
              isOn={isPushOn}
              onToggle={() => setPushOn(!isPushOn)}
            />
          </div>
          <div className="flex justify-between items-center h-8">
            <span>친구 추가 허용</span>
            <ToggleButton
              isOn={isFriendOn}
              onToggle={() => setFriendOn(!isFriendOn)}
            />
          </div>
        </div>
        <fieldset>
          <legend className="mb-5 text-st font-semibold">기록 폰트 설정</legend>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center h-8">
              <label htmlFor="1">나눔고딕체</label>
              <input type="radio" id="1" name="font" value="1" />
            </div>
            <div className="flex justify-between items-center h-8">
              <label htmlFor="2">나눔명조체</label>
              <input type="radio" id="2" name="font" value="2" />
            </div>
            <div className="flex justify-between items-center h-8">
              <label htmlFor="3">리디바탕체</label>
              <input type="radio" id="3" name="font" value="3" />
            </div>
          </div>
        </fieldset>
      </div>

      <BottomSheetModal
        bottomSheetShow={bottomSheetShow}
        setBottomSheetShow={setBottomSheetShow}
      >
        <div className="flex justify-between mb-[1.62rem]">
          <span className="text-st font-semibold">이름 수정</span>
          <button
            onClick={() => setBottomSheetShow(false)}
            className="text-btn2 text-gray-500"
          >
            취소
          </button>
        </div>
        <TextField title="제목" placeholder="유저닉네임" />
        <ButtonComponent
          text="완료"
          type="primary"
          disabled={false}
          className="mt-7"
          onClick={() => setBottomSheetShow(false)}
        />
      </BottomSheetModal>
    </div>
  );
};

export default SettingPage;
