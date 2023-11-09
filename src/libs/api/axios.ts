// lib/axios.js
"use client";
import axios from "axios";
console.log("backend route for client: ", process.env.NEXT_PUBLIC_API_ROUTE);
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ROUTE, // Replace with your API endpoint
  timeout: 5000, // Set a timeout for requests (in milliseconds)
  headers: {
    "Content-Type": "application/json", // Set the default content type for request headers
  },
});
// instance.defaults.headers.common["Access-Control-Allow-Credentials"] = "true";
// instance.defaults.headers.common["Access-Control-Allow-Origin"] =
//   "http://localhost:3000";
// instance.defaults.headers.common["Access-Control-Allow-Methods"] =
//   "GET, DELETE, PATCH, POST, PUT";
// instance.defaults.headers.common["Access-Control-Allow-Headers"] =
//   "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version";

export default instance;
