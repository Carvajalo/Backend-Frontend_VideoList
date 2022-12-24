import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import VideoList from "./components/videos/VideoList";
import VideoForm from "./components/videos/VideoForm";
import "bootswatch/dist/pulse/bootstrap.min.css";

import "./index.css";
import Navbar from "./components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar></Navbar>
      <div className="container p-4">
        <Routes>
          <Route path="/" element={<VideoList />} />
          <Route path="/new-image" element={<VideoForm />} />
          <Route path="/update/:id" element={<VideoForm />} />
        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
