import React, { useState, useEffect } from "react";
import { FormEvent } from "react";
import { ChangeEvent } from "react";
import { Video } from "./video";
import * as videoService from "./VideoService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const VideoForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const initialState = {
    title: "",
    description: "",
    url: "",
  };

  const [video, setVideo] = useState<Video>(initialState);

  const getVideo = async (id: string) => {
    const res = await videoService.getVideo(id);
    const { title, description, url } = res.data;
    setVideo({ title, description, url });
  };

  useEffect(() => {
    if (params.id) {
      getVideo(params.id);
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!params.id) {
      await videoService.createVideo(video);
      toast.success("New video added");
      setVideo(initialState);
    } else {
      await videoService.updateVideo(params.id, video);
    }
    navigate("/");
  };

  const handleInputChange = (e: InputChange) => {
    setVideo({ ...video, [e.target.name]: e.target.value });
  };
  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <div className="card">
          <div className="card-body">
            <h3 className="mb-3">New video</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Title</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  value={video.title}
                  name="title"
                  placeholder="Write a title for the video"
                  className="form-control"
                  autoFocus
                />
              </div>
              <div className="mb-3">
                <label>URL</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="url"
                  value={video.url}
                  placeholder="https://somevideo.com"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label>description</label>
                <textarea
                  name="description"
                  rows={3}
                  value={video.description}
                  placeholder="Write a description"
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>
              {!params.id ? (
                <button className="btn btn-info bg-gradient text-white">
                  Submit
                </button>
              ) : (
                <button className="btn btn-primary bg-gradient text-white">
                  update
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoForm;
