export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "마이리틀레시피북",
  description: "6조 최종 프로젝트",
  webuserItems: [
    {
      label: "홈",
      href: "/",
    },
    {
      label: "냉장고를 부탁해",
      href: "/myrefrigerator",
    },
    {
      label: "마이페이지",
      href: "/mypage",
    },
  ],
  webbasicItems: [
    {
      label: "홈",
      href: "/",
    },
  ],
  mobileuserItems: [
    {
      label: "홈",
      href: "/",
    },
    {
      label: "냉장고를 부탁해",
      href: "/myrefrigerator",
    },
    {
      label: "마이페이지",
      href: "/mypage",
    },
    {
      label: "로그아웃",
      href: "/",
    },
  ],
  mobilebasicItems: [
    {
      label: "홈",
      href: "/",
    },
    {
      label: "로그인",
      href: "/login",
    },
  ],
};
