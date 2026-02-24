import { api } from "./Api";

type UsuarioRequest = {
 
  username: string;
  email: string;
  password: string;
  nombre: string;
  familyName: string;
}


export const UsuarioApi = {
  create: async (data: UsuarioRequest) => {
    const response = await api.post('/api/RegistrarUsuario', data);
    return response.data;
  },
};