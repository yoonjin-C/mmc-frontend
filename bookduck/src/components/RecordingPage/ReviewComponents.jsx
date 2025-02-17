import { useNavigate } from "react-router-dom";
import useReviewColorStore from "../../store/useReviewColorStore";
import { useEffect } from "react";
import { getUserId } from "../../api/oauth";
import { getDetailExtractReview } from "../../api/archive";

const ReviewComponents = ({ reviewData, archive = false }) => {
  console.log(reviewData);
  const content = reviewData?.data.reviewContent;
  const reviewId = reviewData?.data.reviewId;
  const reviewTitle = reviewData?.data.reviewTitle;
  const title = reviewData?.title;
  const author = reviewData?.author;
  const color = reviewData?.data.color;
  const createdDate = reviewData?.data.createdTime
    .split("T")[0]
    .replace(/-/g, ".");

  const navigate = useNavigate();
  const { reviewColor } = useReviewColorStore();

  const handleOnClick = async () => {
    const res = await getDetailExtractReview(reviewId, "REVIEW");
    const typeState =
      res.excerpt && res.review ? "ALL" : res.excerpt ? "EXCERPT" : "REVIEW";

    if (typeState === "ALL")
      navigate(`/total-archive-detail/${reviewId}`, {
        state: { detailData: res },
      });
    if (typeState === "REVIEW")
      navigate(`/review-archive-detail/${reviewId}`, {
        state: { detailData: res },
      });
  };

  return (
    <div onClick={handleOnClick} className="cursor-pointer ">
      <div
        style={{ backgroundColor: color }}
        className={`flex flex-col gap-[1.75rem] w-[22.5625rem]  p-[1.25rem] rounded-[0.88rem] ${
          !reviewColor && "bg-gray-400"
        } shadow-custom`}
      >
        {!archive && createdDate && (
          <div className="text-c2 text-[#ffffff99]">{createdDate}</div>
        )}
        <div className="flex flex-col gap-[0.25rem]">
          <div className="text-st text-[#FFFFFF] font-semibold">
            {reviewTitle}
          </div>
          <div className="text-b2 text-[#FFFFFF]">{content}</div>
        </div>
        <div className="text-c2 text-[#ffffff99]">
          {title && author && `${title} / ${author}`}
        </div>
      </div>
    </div>
  );
};
export default ReviewComponents;
