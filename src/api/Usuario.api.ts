import { api } from "./Api";

type CrearUsuarioRequest = {
  email: string;
  username: string;
  password: string;
  nombre: string;
  familyName: string;
};


export const UsuarioApi = {
  create: async (data: CrearUsuarioRequest) => {
    const response = await api.post('/Auths/CrearUsuario', data);
    return response.data;
  },
};
