import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
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
  loadUserSession: () => void;
}
const AuthContext = createContext<IContext | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const toast = useToast();
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

    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Logout error",
        description: error.message,
        duration: 5000,
        isClosable: true,
        status: "error",
      });
    } else {
      toast({
        title: "Logout",
        description: "You have logged out successfully",
        duration: 5000,
        isClosable: true,
        status: "success",
      });

      router.replace("/auth");
    }
  };

  return (
    <AuthContext.Provider value={{ logout, user, loadUserSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
