import { create } from "zustand";
import { apiRequest } from "@/lib/api";
import { toast } from "sonner";
interface AuthState {
  user: { id: string; username: string; email: string } | null;
  isLoggedIn: boolean;
  setUser: (user: AuthState["user"], toastString: string) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user, toastString) => {
    set({ user, isLoggedIn: !!user });
    if (user) {
      toast.success(toastString, {
        description: `Welcome ${user.username}`,
      });
    }
  },
  logout: async () => {
    try {
      await apiRequest("/users/logout", "POST");
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      set({ user: null, isLoggedIn: false });
    }
  },
}));
