import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomeScreen, NotFound } from "../website/screens";

function WebsiteRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default WebsiteRoutes;
