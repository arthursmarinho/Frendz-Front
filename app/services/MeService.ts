import { auth } from "@/lib/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const MeService = {
  getMe: () =>
    new Promise<{
      userUid: string;
      name: string;
      photoUrl: string;
      email: string;
    } | null>((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!user) {
          resolve(null);
          unsubscribe();
          return;
        }

        try {
          const res = await fetch(`${API_URL}/user/me?userId=${user.uid}`);
          const data = await res.json();
          console.log(data);

          const userData = {
            userUid: data.userUid ?? user.uid,
            name: data.name ?? "",
            photoUrl: data.photoUrl ?? "",
            email: data.email ?? "",
          };

          resolve(userData);
        } catch (err) {
          reject(err);
        } finally {
          unsubscribe();
        }
      });
    }),
};
