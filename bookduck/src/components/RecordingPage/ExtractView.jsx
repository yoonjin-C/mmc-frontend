import { useQuery } from "@tanstack/react-query";
import { getExtractReview } from "../../api/archive";
import { getUserId } from "../../api/oauth";
import ExtractComponents from "./ExtractComponents";

const ExtractView = () => {
  const userId = getUserId();
  const {
    data: archiveExcerptData,
    isError,
    error,
  } = useQuery({
    queryKey: ["archiveExcerptData"],
    queryFn: () => getExtractReview(userId, "EXCERPT", 0, 20),
  });

  return (
    <div className="flex flex-col gap-[1rem] items-center max-h-[40rem]  mt-[1rem] overflow-y-auto">
      {archiveExcerptData.archiveList.map((it, index) => (
        <ExtractComponents
          key={index}
          page={it.data.pageNumber}
          content={it.data.excerptContent}
          excerptId={it.data.excerptId}
          title={it.title}
          author={it.author}
        />
      ))}
    </div>
  );
};
export default ExtractView;
