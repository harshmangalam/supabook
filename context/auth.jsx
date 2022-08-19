import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../utils/supabaseClient";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const router = useRouter();
  const toast = useToast();
  const [user, setUser] = useState<any>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const loadUserSession = async () => {
    try {
      const session = await supabase.auth.session();
      if (session?.user) {
        const { data } = await supabase
          .from("profile")
          .select("id, user_id, name ,avatar")
          .eq("user_id", session?.user.id);
        setUser(data?.[0]);

        if (router.pathname.includes("auth")) router.replace("/");
      } else {
        if (protectedRoutes.includes(router.pathname)) {
          router.replace("/auth");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsAuthenticating(false);
    }
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
    <AuthContext.Provider
      value={{ logout, user, loadUserSession, isAuthenticating }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);

const protectedRoutes = ["/create-post", "/friends"];
