import { db } from "@/config/firebase/firebase";
import { Task } from "@/types/task";
import { User } from "firebase/auth";
import {
  onSnapshot,
  query,
  where,
  collection,
  DocumentSnapshot,
} from "firebase/firestore";

export function getAllTasks(user: User): Promise<Task[]> {
  return new Promise((resolve, reject) => {
    if (!user) {
      resolve([]);
      return;
    }

    const tasksQuery = query(
      collection(db, "tasks"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(
      tasksQuery,
      (snapshot) => {
        const tasks: Task[] = snapshot.docs.map((doc: DocumentSnapshot) => ({
          id: doc.id,
          ...doc.data(),
        }));
        resolve(tasks);
      },
      (error) => {
        console.error("Erro ao buscar tarefas: ", error);
        reject(error);
      }
    );

    return () => unsubscribe();
  });
}
