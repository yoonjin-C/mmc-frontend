import right from "../../assets/statisticsPage/right.svg";
import UserDuck from "../CharacterPage/UserDuck";
const UserCard = ({ nickname }) => {
  return (
    <div className="flex h-[10rem]">
      <div className="flex flex-col gap-1 mt-[3.8125rem] ml-[1.75rem]">
        <div className="text-t2 font-semibold w-[10.8125rem]">
          <span className="font-regular">{nickname}</span>님은
          <br />
          문학에 진심인 문학덕!
        </div>
        <div className="flex text-btn4 text-gray-400 gap-0.5 cursor-pointer">
          자세히보기
          <img className="ml-2" src={right} />
        </div>
      </div>
      {/* 임시  */}
      <div className="w-[180px]">
        <UserDuck />
      </div>
    </div>
  );
};
export default UserCard;
