import React from "react";
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/card";
import { getShortsList } from "./action";
interface IVideo {
  video_id: string;
  title: string;
}

const YouTubeShortRecommend = async () => {
  try {
    const data = await getShortsList();
    if (!data || data.length === 0) {
      return (
        <div className="p-4 text-center text-red-600">Backend not working</div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {data.map((video: IVideo, i: number) => (
          <Card key={i} className="py-4" isPressable>
            <CardHeader className="pb-0 pt-2 px-4 flex-col">
              <h4 className="font-bold text-large">{video.title}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2 flex items-center">
              <iframe
                width="360"
                height="315"
                src={`https://www.youtube.com/embed/${video.video_id}`}
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
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <div className="p-4 text-center text-red-600">Backend not working</div>
    );
  }
};

export default YouTubeShortRecommend;
