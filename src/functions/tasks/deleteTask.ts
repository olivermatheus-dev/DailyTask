import { db } from "@/config/firebase/firebase";
import { User } from "firebase/auth";
import {
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";

async function removeTaskFromUser(taskId: string, user: User) {
  const userDocRef = doc(db, "users", user.uid);
  await updateDoc(userDocRef, {
    taskIds: arrayRemove(taskId),
  });
}

export async function deleteTask(taskId: string, user: User) {
  const taskRef = doc(db, "tasks", taskId);

  try {
    const taskDoc = await getDoc(taskRef);
    if (!taskDoc.exists()) {
      console.error(`Task with ID ${taskId} does not exist.`);
      return {
        success: false,
        error: `Task with ID ${taskId} does not exist.`,
      };
    }
    if (taskDoc.data().userId === user.uid) {
      await deleteDoc(taskRef);
      await removeTaskFromUser(taskId, user);
      console.log(`Task with ID ${taskId} deleted.`);
      return { success: true };
    } else {
      console.error("Ação negada. Você não é o dono desta tarefa.");
      return {
        success: false,
        error: "Ação negada. Você não é o dono desta tarefa.",
      };
    }
  } catch (error) {
    console.error("Erro ao deletar tarefa: ", error);
    return { success: false, error };
  }
}
