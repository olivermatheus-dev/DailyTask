export interface Task {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  completionDate?: string;
  priority: "alta" | "média" | "baixa";
  category?: string;
  tags?: string[];
  comments?: Comment[];
  attachedFiles?: AttachedFile[];
  archived: boolean;
  isDone?: boolean;
  userId: string;
  assignedTo?: string[];
  history?: TaskHistory[];
  status?: TaskStatus;
  customFields?: Record<string, any>;
  lastModified?: string;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
}

export interface AttachedFile {
  id: string;
  name: string;
  url: string;
}

export interface TaskHistory {
  id: string;
  userId: string;
  timestamp: string;
  changes: TaskChanges;
}

export interface TaskChanges {
  [key: string]: {
    oldValue: any;
    newValue: any;
  };
}

export interface TaskStatus {
  id: string;
  name: string;
}
