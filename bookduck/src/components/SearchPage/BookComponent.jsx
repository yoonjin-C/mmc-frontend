import React from "react";

const BookComponent = ({ img, title, author }) => {
  return (
    <div className="flex flex-col gap-2 w-[6.5rem] h-fit">
      <img src={img} className="w-full h-[9.25rem]" />
      <div>
        <div>{title}</div>
        {author && <div>{author}</div>}
      </div>
    </div>
  );
};

export default BookComponent;
