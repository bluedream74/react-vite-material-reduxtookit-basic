import { createContext, useContext } from 'react';

export interface UserType {
  email: string | null,
  password: string| null
}

export interface AuthContextType {
  user: UserType;
  isUserLoggedIn: boolean;
  signin: (user: UserType, callback: VoidFunction) => Promise<boolean>;
  signout: (callback: VoidFunction) => void;
  checkToken: () => Promise<boolean | undefined>;
}

const AuthContext = createContext<AuthContextType>(null!);
const useAuth = () => {
  return useContext(AuthContext);
}

export { useAuth };
export default AuthContext;

