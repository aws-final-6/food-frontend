"use client";
import React, { useState, useEffect } from "react";
import { getVideoList } from "./action";
import VideoCard from "./VideoCard";

interface IVideo {
  video_id: string;
  title: string;
}

const YouTubeVideoRecommend = () => {
  const [data, setData] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getVideoList();
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
        <VideoCard
          video_id={video.video_id}
          videoLink={`https://www.youtube.com/embed/${video.video_id}`}
          title={video.title}
          index={i}
        />
      ))}
    </div>
  );
};

export default YouTubeVideoRecommend;
