import React, { Suspense, lazy } from "react";
import SeasonRecommend from "@/components/Recommend/SeasonRecommend";
import TodayRecommend from "@/components/Recommend/TodayRecommend";
import UserRecommend from "@/components/Recommend/UserRecommend";
import { subtitle } from "@/components/primitives";
import Carousel from "@/components/Carousel";
import SlidingLogos from "@/components/Navbar/SlidingLogo";

const YoutubeVideoRecommend = lazy(
  () => import("@/components/Recommend/YoutubeVideoRecommend")
);
const YouTubeShortRecommend = lazy(
  () => import("@/components/Recommend/YouTubeShortRecommend")
);

const Loading = () => <div className="p-4 text-center">Loading...</div>;

const Page = () => {
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
        <Suspense fallback={<Loading />}>
          <YoutubeVideoRecommend />
        </Suspense>
        <h1 className={subtitle()}>쇼츠 레시피</h1>
        <Suspense fallback={<Loading />}>
          <YouTubeShortRecommend />
        </Suspense>
      </main>
    </div>
  );
};

export default Page;
