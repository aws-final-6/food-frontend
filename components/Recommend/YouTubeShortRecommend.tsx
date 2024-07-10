"use client";
import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/card";
import { getShortsList } from "./action";

interface IVideo {
  video_id: string;
  title: string;
}

const YouTubeShortRecommend = () => {
  const [data, setData] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getShortsList();
        if (!result || result.length === 0) {
          setError(true);
        } else {
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (error) {
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
};

export default YouTubeShortRecommend;
