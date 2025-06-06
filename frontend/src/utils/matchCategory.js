// src/utils/matchCategory.js
export const matchCategory = (item) => {
  const text = `${item.jobTitle} ${item.companyName}`.toLowerCase();

  if (text.includes("ai")) return "AI";
  if (text.includes("웹") || text.includes("html") || text.includes("javascript")) return "웹개발";
  if (text.includes("프론트")) return "프론트엔드";
  if (text.includes("백엔드")) return "백엔드";
  if (text.includes("게임")) return "게임";
  if (text.includes("데이터") || text.includes("분석")) return "데이터분석";
  if (text.includes("클라우드") || text.includes("aws") || text.includes("docker")) return "클라우드/DevOps";
  if (text.includes("풀스택")) return "풀스택";
  if (text.includes("모바일") || text.includes("android") || text.includes("ios")) return "모바일앱";
  return "기타";
};
