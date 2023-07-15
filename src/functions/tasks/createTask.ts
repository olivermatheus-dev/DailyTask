import { db } from "@/config/firebase/firebase";
import { Task } from "@/types/task";
import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";

export async function createTask(newTask: Task, user: User) {
  try {
    const taskData = {
      ...newTask,
      isDone: false,
      userId: user.uid,
      lastModified: serverTimestamp(),
    };

    const taskRef = await addDoc(collection(db, "tasks"), taskData);

    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, {
      taskIds: arrayUnion(taskRef.id),
    });

    console.log(taskRef);
    return { success: true, taskId: taskRef.id };
  } catch (error) {
    console.error("Erro ao salvar tarefa: ", error);
    return { success: false, error };
  }
}
