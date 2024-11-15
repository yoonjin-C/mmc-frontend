import { apiAuth } from "./api";
import { get, patch, post, del } from "./example";

export const getTotalBook = async (sort) => {
  try {
    const res = await get(`/books/list?sort=${sort}`);
    console.log("내 서재 전체 조회 성공", res);
    return res;
  } catch (error) {
    console.error("내 서재 전체 조회 실패");
    return {};
  }
};

export const getSortedTotalBook = async (status, sort) => {
  console.log(status, sort);
  try {
    const res = await get(`/books/filter?status=${status}&sort=${sort}`);
    console.log("내 서재 분류 전체 조회 성공", res);
    return res;
  } catch (error) {
    console.error("내 서재 분류 전체 조회 실패");
    return {};
  }
};

export const patchBookStatus = async (userbookId, status) => {
  console.log(userbookId, status);
  try {
    const res = await patch(`/books/${userbookId}?status=${status}`);
    console.log("책 상태 변경 성공", res);
    return res;
  } catch (error) {
    console.error("책 상태 변경 실패");
    return {};
  }
};

export const deleteBook = async (userbookId) => {
  try {
    const res = await del(`/books/${userbookId}`);
    console.log("책 삭제 성공", res);
    return res;
  } catch (error) {
    console.error("책 삭제 실패");
    return {};
  }
};
