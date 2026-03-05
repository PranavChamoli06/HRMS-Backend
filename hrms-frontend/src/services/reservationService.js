import api from "../api/axios";

export const getReservations = async () => {
  const response = await api.get("/v1/reservations");
  return response.data;
};