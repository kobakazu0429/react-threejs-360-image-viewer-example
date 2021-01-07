import * as React from "react";
import { Viewer } from "../Viewer";
import room from "../../assets/360image/room.jpg";

const id = "360image_container";

export const PlainThreePage: React.FC = () => {
  React.useEffect(() => {
    new Viewer(id, room);
  }, []);

  return <div id={id} />;
};
