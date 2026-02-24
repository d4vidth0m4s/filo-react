import {api} from './Api';

type Usuario = {
  id: number;
  email: string;
  username: string;

  nombre: string;
  familyName: string;

  pictureUrl: string;
  token: string;
};

type LoginData = {
  username: string;
  password: string;
};
export const AuthApi = {
  pots: async (data: LoginData): Promise<Usuario> => {
    const response = await api.post<Usuario>('/api/Autenticacion/login', data);
    return response.data;
  },

};
