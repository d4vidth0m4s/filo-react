import { api } from "./Api";
import type { CrearPedidoRequest } from "../context/cartContext";

export const PedidosApi = {
  create: async (data: CrearPedidoRequest) => {
    const response = await api.post("/Pedidos", data);
    return response.data;
  },
};
