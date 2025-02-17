import { useState } from "react";
import noCheck from "../../assets/characterPage/check-no.svg";
import yesCheck from "../../assets/characterPage/check-yes.svg";
import lock from "../../assets/characterPage/lock.svg";
const Skin = ({ isLock = true }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected((prevState) => !prevState);
  };

  return (
    <div className="w-[110px] h-[110px] rounded-[12px]">
      {isLock ? (
        <div className="flex justify-center items-center bg-gray-50 w-[110px] h-[110px] rounded-[12px]">
          <img className="w-5 h-6" src={lock} />
        </div>
      ) : (
        <div
          className="pt-2 pl-2 bg-gray-300 w-[110px] h-[110px] rounded-[12px] cursor-pointer"
          onClick={handleClick}
        >
          <img src={isSelected ? yesCheck : noCheck} />
        </div>
      )}
    </div>
  );
};
export default Skin;
