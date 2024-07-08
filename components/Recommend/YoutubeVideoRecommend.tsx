import React from "react";
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/card";

const sampleData = [
  {
    name: "라볶이",
    calories: 215,
    video_url: "https://www.youtube.com/embed/NEFJLTD37jA?si=U2CPIM6llxtkPS7d",
  },
  {
    name: "오이 간단하게 무쳐먹기",
    calories: 215,
    video_url: "https://www.youtube.com/embed/Nk5v-CcIRhQ?si=8xgQ9LNai3TeWTQD",
  },
  {
    name: "이런 두부조림은 처음!",
    calories: 500,
    video_url: "https://www.youtube.com/embed/As8bN8Yr8oQ?si=pQO92f6d5s8pt4bk",
  },
];

const YoutubeVideoRecommend = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {sampleData.map((food, i) => (
        <Card key={i} className="py-4" isPressable>
          <CardHeader className="pb-0 pt-2 px-4 flex-col">
            <h4 className="font-bold text-large">{food.name}</h4>
            <small className="text-default-500">{food.calories} KCAL</small>
          </CardHeader>
          <CardBody className="overflow-visible py-2 flex items-center">
            <iframe
              width="360"
              height="315"
              src={food.video_url}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default YoutubeVideoRecommend;
