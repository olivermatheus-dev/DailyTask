import { useState } from "react";
import { createTask } from "@/functions/tasks/createTask";
import useAuth from "@/hooks/useAuth";
import { Task, Checklist, ChecklistItem } from "@/types/task";

export default function NewTaskForm() {
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

  function handleTagsChange(tags: Task["tags"]) {
    setTask((prevTask) => ({ ...prevTask, tags }));
  }

  function handleAddChecklist() {
    const newChecklist: Checklist = {
      id: Math.random().toString(),
      name: "",
      items: [],
    };

    setTask((prevTask) => ({
      ...prevTask,
      checklists: [...prevTask.checklists, newChecklist],
    }));
  }

  function handleChecklistNameChange(checklistId: string, name: string) {
    setTask((prevTask) => {
      const updatedChecklists = prevTask.checklists.map((checklist) =>
        checklist.id === checklistId ? { ...checklist, name } : checklist
      );
      return { ...prevTask, checklists: updatedChecklists };
    });
  }

  function handleAddChecklistItem(checklistId: string) {
    setTask((prevTask) => {
      const updatedChecklists = prevTask.checklists.map((checklist) => {
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
      return { ...prevTask, checklists: updatedChecklists };
    });
  }

  function handleChecklistItemNameChange(
    checklistId: string,
    itemId: string,
    name: string
  ) {
    setTask((prevTask) => {
      const updatedChecklists = prevTask.checklists.map((checklist) => {
        if (checklist.id === checklistId) {
          const updatedItems = checklist.items.map((item) =>
            item.id === itemId ? { ...item, name } : item
          );
          return { ...checklist, items: updatedItems };
        }
        return checklist;
      });
      return { ...prevTask, checklists: updatedChecklists };
    });
  }

  function handleChecklistItemToggle(
    checklistId: string,
    itemId: string,
    completed: boolean
  ) {
    setTask((prevTask) => {
      const updatedChecklists = prevTask.checklists.map((checklist) => {
        if (checklist.id === checklistId) {
          const updatedItems = checklist.items.map((item) =>
            item.id === itemId ? { ...item, completed } : item
          );
          return { ...checklist, items: updatedItems };
        }
        return checklist;
      });
      return { ...prevTask, checklists: updatedChecklists };
    });
  }

  return (
    <>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex">
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Task Title"
                className="text-xl font-bold rounded-md p-2 "
                required
                value={task.title}
                onChange={(e) =>
                  setTask((prevTask) => ({
                    ...prevTask,
                    title: e.target.value,
                  }))
                }
              />
              <div>
                <label className="font-bold">Category:</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  value={task.category || ""}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="font-bold">Priority:</label>
              <select
                className="border border-gray-300 rounded-md p-2"
                value={task.priority}
                onChange={(e) =>
                  handlePriorityChange(e.target.value as Task["priority"])
                }
              >
                <option value="alta">High</option>
                <option value="média">Medium</option>
                <option value="baixa">Low</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-2">
              <div>X</div>
              <label className="font-bold">Task Description:</label>
            </div>
            <input
              type="text"
              placeholder="Task Description"
              className="border border-gray-300 rounded-md p-2"
              required
              value={task.description}
              onChange={(e) =>
                setTask((prevTask) => ({
                  ...prevTask,
                  description: e.target.value,
                }))
              }
            />
          </div>

          {/* Checklists */}
          <button
            type="button"
            onClick={handleAddChecklist}
            className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
          >
            Add Checklist
          </button>
          {task.checklists.map((checklist, index) => (
            <div key={checklist.id} className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Checklist Name"
                className="border border-gray-300 rounded-md p-2"
                value={checklist.name}
                onChange={(e) =>
                  handleChecklistNameChange(checklist.id, e.target.value)
                }
              />

              {/* Checklist Items */}
              {checklist.items.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={(e) =>
                      handleChecklistItemToggle(
                        checklist.id,
                        item.id,
                        e.target.checked
                      )
                    }
                  />
                  <input
                    type="text"
                    placeholder="Checklist Item"
                    className="border border-gray-300 rounded-md p-2"
                    value={item.name}
                    onChange={(e) =>
                      handleChecklistItemNameChange(
                        checklist.id,
                        item.id,
                        e.target.value
                      )
                    }
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={() => handleAddChecklistItem(checklist.id)}
                className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
              >
                Add Item
              </button>
            </div>
          ))}

          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
}
