import React from "react";
import Masonry from "react-masonry-css";
import Pin from "./Pin";

const breakpointsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 2,
  500: 1,
};

const MasonryLayout = ({ pins }) => {
  return (
    <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointsObj}>
      {pins?.map((pin) => (
        <Pin key={pin._id} pin={pin} className="w-max" />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;