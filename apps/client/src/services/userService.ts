import client from "./api-client";

export const getResponse = async () => {
  try {
    const response = await client.auth.login.$post();
    return (await response.json()).data;
  } catch (error) {
    console.log(error);
  }
};
