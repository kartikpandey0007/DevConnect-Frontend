import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    // ✅ Local development: connect to backend (e.g. http://localhost:3000)
    return io(BASE_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
  } else {
    // ✅ Production: connect to the same origin where frontend is served
    // Nginx should proxy /api/socket.io to your backend server
    return io(window.location.origin, {
      path: "/api/socket.io",
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
  }
};
