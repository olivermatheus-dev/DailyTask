"use client";

import { getAllTasks } from "@/functions/tasks/getAllTasks";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Task } from "@/types/task";
import Notification from "@/components/notification/notification";
import ButtonModalNewTaskForm from "@/components/forms/taskForm/newTaskForm/ButtonModalNewTaskForm";
import TaskCard from "@/components/taskCard";

export default function Teste() {
  const user = useAuth();
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  //Estou criando uma função assíncrona para puxar todas as tarefas do user
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (user) {
          const tasks = await getAllTasks(user);
          console.log(tasks);
          setAllTasks(tasks);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks();
  }, [user]);

  return (
    <>
      <Notification message="Testando notificação" status="success" />
      <ButtonModalNewTaskForm />
      <div className="flex flex-col gap-2">
        {allTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </>
  );
}
