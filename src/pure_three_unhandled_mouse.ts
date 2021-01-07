import room from "../assets/360image/room.jpg";
import { Viewer } from "./Viewer";

window.addEventListener("load", () => {
  new Viewer("container", room);
});
