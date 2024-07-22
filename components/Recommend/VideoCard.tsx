import React from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/card";

interface IVideo {
  video_id: string;
  videoLink: string;
  title: string;
  index: number;
}
const VideoCard = ({ videoLink, title, video_id, index }: IVideo) => {
  return (
    <Card
      key={`${video_id}_${index}`}
      className="hover:border-3 hover:border-main border-3 cursor-pointer"
      shadow="sm"
      isPressable={true}
      radius="none"
    >
      <CardBody className="overflow-visible p-0">
        <iframe
          width="360"
          height="315"
          src={videoLink}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </CardBody>
      <CardFooter className="flex flex-col justify-start items-center gap-3 px-2 min-h-[100px]">
        <h4 className="font-bold text-large">{title}</h4>
      </CardFooter>
    </Card>
  );
};

export default VideoCard;
