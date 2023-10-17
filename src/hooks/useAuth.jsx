import { useEffect, useState } from "react";
import { supabase } from "../backend/supabase";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user ?? null);
      setLoading(false);
    };
    getUser();

    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session) console.log("usuario:", session.user.email);
      else console.log("usuario: none");
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const login = (email, password) =>
    supabase.auth.signInWithPassword({ email, password });

  const signOut = () => supabase.auth.signOut();

  return { user, loading, login, signOut };
};
