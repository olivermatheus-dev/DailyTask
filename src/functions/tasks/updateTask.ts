// updateTask.ts
import { db } from "@/config/firebase/firebase";
import { UpdateTaskData } from "@/types/task";
import { User } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

export async function updateTask(updateData: UpdateTaskData, user: User) {
  const { id } = updateData;
  const taskRef = doc(db, "tasks", id);

  const { ["id"]: _, ...taskData } = updateData;

  try {
    await updateDoc(taskRef, taskData);
    console.log(`Task with ID ${id} updated.`);
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar tarefa: ", error);
    return { success: false, error };
  }
}
