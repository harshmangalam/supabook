import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../utils/supabaseClient";

interface IContext {
  user: any;
  logout: () => void;
}
const AuthContext = createContext<IContext | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);

  const loadUserSession = async () => {
    const data = await supabase.auth.session();
    setUser(data?.user);
  };
  useEffect(() => {
    loadUserSession();
  }, []);

  const logout = async () => {
    setUser(null);
    return await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
