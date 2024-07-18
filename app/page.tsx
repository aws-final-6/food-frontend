"use client";
import React, { useContext } from "react";
import SeasonRecommend from "@/components/Recommend/SeasonRecommend";
import TodayRecommend from "@/components/Recommend/TodayRecommend";
import YoutubeVideoRecommend from "@/components/Recommend/YoutubeVideoRecommend";
import YouTubeShortRecommend from "@/components/Recommend/YouTubeShortRecommend";

import UserRecommend from "@/components/Recommend/UserRecommend";
import { subtitle } from "@/components/primitives";
import Carousel from "@/components/Carousel";
import SlidingLogos from "@/components/Navbar/SlidingLogo";
import BookmarkButton from "@/components/Button/BookmarkButton";
import { UserContext } from "@/providers/userProvider";
const Page = () => {
  const { userData } = useContext(UserContext);
  return (
    <div className="w-full flex flex-col gap-5">
      <main className="flex flex-col items-center justify-center gap-10">
        <Carousel />
        <SlidingLogos />
        <UserRecommend />
        <h1 className={subtitle()}>새로운 레시피</h1>
        <TodayRecommend />
        <h1 className={subtitle()}>7월 제철 레시피</h1>
        <SeasonRecommend />
        <h1 className={subtitle()}>유튜브 레시피</h1>
        <YoutubeVideoRecommend />
        <h1 className={subtitle()}>쇼츠 레시피</h1>
        <YouTubeShortRecommend />
      </main>
      <div className="fixed bottom-20 right-20 flex flex-col gap-3 items-start justify-center z-30 w-40">
        {userData && userData.nickname ? <BookmarkButton /> : <></>}
      </div>
    </div>
  );
};

export default Page;
