import { auth } from "@/lib/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

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
          const res = await fetch(
            `http://localhost:3000/user/me?userId=${user.uid}`
          );
          const data = await res.json();

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
