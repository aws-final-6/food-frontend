export const cate_tags = [
  { id: 63, label: "밑반찬" },
  { id: 56, label: "메인반찬" },
  { id: 54, label: "국/탕" },
  { id: 55, label: "찌개" },
  { id: 60, label: "디저트" },
  { id: 53, label: "면/만두" },
  { id: 52, label: "밥/죽/떡" },
  { id: 61, label: "퓨전" },
  { id: 57, label: "김치/젓갈/장류" },
  { id: 58, label: "양념/소스/잼" },
  { id: 65, label: "양식" },
  { id: 64, label: "샐러드" },
  { id: 68, label: "스프" },
  { id: 66, label: "빵" },
  { id: 69, label: "과자" },
  { id: 59, label: "차/음료/술" },
  { id: 62, label: "기타" },
];

export const situ_tags = [
  { id: 12, label: "일상" },
  { id: 18, label: "초스피드" },
  { id: 13, label: "손님접대" },
  { id: 19, label: "술안주" },
  { id: 21, label: "다이어트" },
  { id: 15, label: "도시락" },
  { id: 43, label: "영양식" },
  { id: 17, label: "간식" },
  { id: 45, label: "야식" },
  { id: 46, label: "해장" },
  { id: 44, label: "명절" },
  { id: 14, label: "이유식" },
  { id: 22, label: "기타" },
];

export function getCateLabel(cate_no: number) {
  const category = cate_tags.find((tag) => tag.id === cate_no);
  return category ? category.label : undefined;
}

export function getSituLabel(situ_no: number) {
  const category = situ_tags.find((tag) => tag.id === situ_no);
  return category ? category.label : undefined;
}
