import express from "express";
import Video from "./Video";

export const getVideos: express.RequestHandler = async (req, res) => {
  try {
    const foundedVideos = await Video.find();
    res.json(foundedVideos);
  } catch (error) {
    res.json(error);
  }
};

export const getVideo: express.RequestHandler = async (req, res) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    res.json({
      message: "invalid ID",
    });
  }
  const foundedVideos = await Video.findById(req.params.id);
  if (!foundedVideos) return res.status(204).json();
  return res.json(foundedVideos);
};

export const createVideo: express.RequestHandler = async (req, res) => {
  const videoFounded = await Video.findOne({ url: req.body.url });
  console.log(`Video: ${req.body.url}
  videoFounded: ${videoFounded}`);

  if (videoFounded) {
    return res.status(301).json({ message: "This video already exists" });
  }
  const video = new Video(req.body);
  console.log(video);
  const videoSaved = await video.save();
  res.json(videoSaved);
};

export const deleteVideo: express.RequestHandler = async (req, res) => {
  const foundedVideo = await Video.findByIdAndDelete(req.params.id, req.body);
  if (!foundedVideo) return res.status(204).json();
  res.json(foundedVideo);
};

export const updateVideo: express.RequestHandler = async (req, res) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.json({
      message: "invalid ID",
    });
  }
  const foundedVideo = await Video.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!foundedVideo) return res.status(204).json();

  res.json(foundedVideo);
  
};

