import { useEffect, useState } from "react";
import { Video } from "./video";
import VideoItem from "./VideoItem";
import * as imageService from "./VideoService";

function VideoList() {
  const [videos, setVideos] = useState<Video[]>([]);

  const loadVideos = async () => {
    const res = await imageService.getVideos();
    console.log(res);

    const formatedVideos = res.data
      .map((video) => {
        return {
          ...video,
          createdAt: video.createdAt ? new Date(video.createdAt) : new Date(),
          updatedAt: video.updatedAt ? new Date(video.updatedAt) : new Date(),
        };
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    setVideos(formatedVideos);
  };

  useEffect(() => {
    loadVideos();
  }, []);

  return (
    <>
      <div className="row">
        {videos.map((video) => (
          <VideoItem
            video={video}
            key={video._id}
            loadVideos={loadVideos}
          ></VideoItem>
        ))}
      </div>
    </>
  );
}

export default VideoList;
