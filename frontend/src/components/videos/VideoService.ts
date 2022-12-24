import axios from "axios";
import { Video } from "./video";
const API = "http://localhost:3000/";

export const getVideos = async () => {
  return await axios.get<Video[]>(`${API}videos`);
};

export const createVideo = async (video: Video) => {
  return await axios.post(`${API}videos`, video);

};

export const getVideo = async (id: String) => {
  return await axios.get(`${API}videos/${id}`, );
};

export const updateVideo = async (id: string, video: Video) => {
  return await axios.put(`${API}videos/${id}`, video);
};

export const deleteVideo = async (id: string) => {
  return await axios.delete(`${API}videos/${id}`);
};


