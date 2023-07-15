"use client";

import { getAllTasks } from "@/functions/tasks/getAllTasks";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Task } from "@/types/task";
import { withAuth } from "@/hooks/withAuth";
import TopBar from "./components/topbar";
import Sidebar from "./components/sidebar/index";

function Dashboard() {
  const user = useAuth();
  const [allTasks, setAllTasks] = useState<Task[]>([]);

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
      <div className="flex w-screen">
        <Sidebar />
        <div className="flex flex-col gap-6 w-full ml-[80px] mx-10 my-8">
          <TopBar />
          <div className="flex justify-between h-screen">
            <div className="w-1/5 h-5/6">
              {/* Primeira coluna */}
              <div className="h-full flex flex-col justify-between">
                <p>Add New Task</p>
                <div className="mb-6">{/* Conteúdo do gadget 1 */}</div>
                {/* Gadget 2 */} segundo
                <div className="mb-6">{/* Conteúdo do gadget 2 */}</div>
                {/* Gadget 3 */} terceiro
                <div>{/* Conteúdo do gadget 3 */}</div>
              </div>
            </div>
            <div className="w-1/3">
              {/* Segunda coluna */}
              <div className="h-full">
                {/* Gadget grande */} Gadget grande
                <div className="h-full">{/* Conteúdo do gadget grande */}</div>
              </div>
            </div>
            <div className="w-1/3">
              {/* Terceira coluna */}
              <div className="h-full flex flex-col justify-between">
                {/* Gadget 4 */} category
                <div className="mb-6">{/* Conteúdo do gadget 4 */}</div>
                {/* Gadget 5 */} music
                <div>{/* Conteúdo do gadget 5 */}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuth(Dashboard);
