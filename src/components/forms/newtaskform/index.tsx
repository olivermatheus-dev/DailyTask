"use client";

import React, { useState } from "react";
import { createTask } from "@/functions/tasks/createTask";
import useAuth from "@/hooks/useAuth";
import { Task, Checklist, ChecklistItem } from "@/types/task";
import TaskTitleInput from "./components/TaskTitleInput";
import CategoryInput from "./components/CategoryInput";
import PrioritySelect from "./components/PrioritySelect";
import DescriptionInput from "./components/DescriptionInput";
import ChecklistForm from "./components/ChecklistForm";
import AddChecklistButton from "./components/AddChecklistButton";
import SubmitButton from "./components/SubmitButton";

const NewTaskForm: React.FC = () => {
  const [task, setTask] = useState<Task>({
    id: "",
    title: "",
    description: "",
    creationDate: new Date().toISOString(),
    priority: "média",
    category: "",
    tags: [],
    comments: [],
    attachedFiles: [],
    archived: false,
    isDone: false,
    checklists: [],
  });
  const user = useAuth();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    const result = await createTask(task, user);
    if (result.success) {
      console.log("Task created successfully");
      setTask({
        id: "",
        title: "",
        description: "",
        creationDate: new Date().toISOString(),
        priority: "média",
        category: "",
        tags: [],
        comments: [],
        attachedFiles: [],
        archived: false,
        isDone: false,
        checklists: [],
      });
    } else {
      console.error("Error creating task:", result.error);
    }
  }

  function handlePriorityChange(priority: Task["priority"]) {
    setTask((prevTask) => ({ ...prevTask, priority }));
  }

  function handleCategoryChange(category: Task["category"]) {
    setTask((prevTask) => ({ ...prevTask, category }));
  }

  return (
    <>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex">
            <div className="flex flex-col">
              <TaskTitleInput
                value={task.title}
                onChange={(title) =>
                  setTask((prevTask) => ({ ...prevTask, title }))
                }
              />
              <CategoryInput
                value={task.category || ""}
                onChange={(category) =>
                  setTask((prevTask) => ({ ...prevTask, category }))
                }
              />
            </div>
            <div>
              <PrioritySelect
                value={task.priority}
                onChange={(priority) => handlePriorityChange(priority)}
              />
            </div>
          </div>
          <DescriptionInput
            value={task.description}
            onChange={(description) =>
              setTask((prevTask) => ({ ...prevTask, description }))
            }
          />

          <AddChecklistButton
            onClick={() =>
              setTask((prevTask) => ({
                ...prevTask,
                checklists: [
                  ...prevTask.checklists,
                  {
                    id: Math.random().toString(),
                    name: "",
                    items: [],
                  },
                ],
              }))
            }
          />

          <ChecklistForm
            checklists={task.checklists}
            onChecklistNameChange={(checklistId, name) => {
              const updatedChecklists = task.checklists.map((checklist) =>
                checklist.id === checklistId
                  ? { ...checklist, name }
                  : checklist
              );
              setTask((prevTask) => ({
                ...prevTask,
                checklists: updatedChecklists,
              }));
            }}
            onAddChecklistItem={(checklistId) => {
              const updatedChecklists = task.checklists.map((checklist) => {
                if (checklist.id === checklistId) {
                  const newItem: ChecklistItem = {
                    id: Math.random().toString(),
                    name: "",
                    completed: false,
                  };
                  return { ...checklist, items: [...checklist.items, newItem] };
                }
                return checklist;
              });
              setTask((prevTask) => ({
                ...prevTask,
                checklists: updatedChecklists,
              }));
            }}
            onChecklistItemNameChange={(checklistId, itemId, name) => {
              const updatedChecklists = task.checklists.map((checklist) => {
                if (checklist.id === checklistId) {
                  const updatedItems = checklist.items.map((item) =>
                    item.id === itemId ? { ...item, name } : item
                  );
                  return { ...checklist, items: updatedItems };
                }
                return checklist;
              });
              setTask((prevTask) => ({
                ...prevTask,
                checklists: updatedChecklists,
              }));
            }}
            onChecklistItemToggle={(checklistId, itemId, completed) => {
              const updatedChecklists = task.checklists.map((checklist) => {
                if (checklist.id === checklistId) {
                  const updatedItems = checklist.items.map((item) =>
                    item.id === itemId ? { ...item, completed } : item
                  );
                  return { ...checklist, items: updatedItems };
                }
                return checklist;
              });
              setTask((prevTask) => ({
                ...prevTask,
                checklists: updatedChecklists,
              }));
            }}
          />

          <SubmitButton onSubmit={handleSubmit} />
        </form>
      </div>
    </>
  );
};

export default NewTaskForm;
