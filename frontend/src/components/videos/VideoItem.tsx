import React from "react";
import { Video } from "./video";
import ReactPlayer from "react-player";
import "./VideoItem.css";
import { useNavigate } from "react-router";
import * as videoService from "./VideoService";

interface Props {
  video: Video;
  loadVideos: () => void;
}

const VideoItem = ({ video, loadVideos }: Props) => {
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    await videoService.deleteVideo(id);
    loadVideos();
  };

  return (
    <div className="col-md-4 video-card">
      <div className="card card-body" style={{ cursor: "pointer" }}>
        <div className="d-flex justify-content-between">
          <h1
            onClick={() => {
              navigate(`/update/${video._id}`);
            }}
          >
            {video.title}
          </h1>
          <span
            className="text-danger"
            onClick={() => {
              if (video._id) {
                handleDelete(video._id);
              }
            }}
          >
            x
          </span>
        </div>
        <p>{video.description}</p>
        <div>
          <ReactPlayer width="100%" height="100%" url={video.url} />
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
