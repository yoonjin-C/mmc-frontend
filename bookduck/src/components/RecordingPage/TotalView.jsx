import { useQuery } from "@tanstack/react-query";
import ExtractComponents from "./ExtractComponents";
import ReviewComponents from "./ReviewComponents";
import { getExtractReview } from "../../api/archive";
import { getUserId } from "../../api/oauth";

const TotalView = () => {
  const userId = getUserId();
  const {
    data: archiveData,
    isError,
    error,
  } = useQuery({
    queryKey: ["archiveData"],
    queryFn: () => getExtractReview(userId, "ALL", 0, 20),
  });
  console.log(archiveData);
  return (
    <div className="flex flex-col gap-[1rem] items-center max-h-[40rem]  mt-[1rem] overflow-y-auto">
      {archiveData.archiveList.map((it, index) => (
        <>
          {it.type === "EXCERPT" ? (
            <ExtractComponents key={index} excerptData={it} archive={true} />
          ) : (
            <ReviewComponents key={index} reviewData={it} archive={true} />
          )}
        </>
      ))}
    </div>
  );
};
export default TotalView;
