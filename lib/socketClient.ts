"use client";
import { io } from "socket.io-client";

const BACKEND_URL = process.env.NODE_ENV === "production" ? "https://web-chat-app-11d9ba475cb9.herokuapp.com" : undefined;

export const socket = io(BACKEND_URL, {
  withCredentials: true,
});
