import { Router } from "express";
import * as videoController from "./video.controllers";

const router = Router();

router.get("/videos", videoController.getVideos);

router.get("/videos/:id", videoController.getVideo);

router.post("/videos", videoController.createVideo);

router.delete("/videos/:id", videoController.deleteVideo);

router.put("/videos/:id", videoController.updateVideo);

export default router;
