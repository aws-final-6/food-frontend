import React from "react";
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/card";

const sampleData = [
  {
    name: "애호박 레시피",
    calories: 215,
    video_url: "https://www.youtube.com/embed/JlmTYP-axM8?si=uz5xJRNb_UAQpDwy",
  },
  {
    name: "인생 양배추 레시피",
    calories: 215,
    video_url: "https://www.youtube.com/embed/lAwJnWY8BkU?si=twqFk6_s1j9WrZTT",
  },
  {
    name: "라이스 페이퍼 고기만두",
    calories: 500,
    video_url: "https://www.youtube.com/embed/mHy5GhYh-3Y?si=uz3r1zXG4F69hVnS",
  },
];

const YouTubeShortRecommend = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {sampleData.map((food, i) => (
        <Card key={i} className="py-4" isPressable>
          <CardHeader className="pb-0 pt-2 px-4 flex-col">
            <h4 className="font-bold text-large">{food.name}</h4>
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

export default YouTubeShortRecommend;
