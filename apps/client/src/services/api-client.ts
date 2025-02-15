import { ApiClient } from "server/src";

const token = localStorage.getItem("authToken");

const client = ApiClient("http://localhost:3000/", token);
export default client;
