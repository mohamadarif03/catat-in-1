import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Trash2, Edit, Plus, Check } from "lucide-react";

type Task = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  folder?: string;
};

const STORAGE_KEY = "catatin_todo_v1";

export default function ToDoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [folders, setFolders] = useState<string[]>(["Inbox"]);
  const [selectedFolder, setSelectedFolder] = useState<string>("All");
  const [search, setSearch] = useState<string>(""); // search term for filtering tasks
  const [text, setText] = useState("");
  const [newFolderName, setNewFolderName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const editRef = useRef<HTMLInputElement | null>(null);

  // load tasks + folders (backwards compatible with older plain-array storage)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        // old format: tasks array only
        setTasks(parsed);
        // derive folders from tasks (unique, keep Inbox)
        const derived = Array.from(
          new Set(parsed.map((t: Task) => t.folder || "Inbox"))
        );
        setFolders((prev) =>
          Array.from(new Set(["Inbox", ...derived, ...prev]))
        );
      } else if (parsed && typeof parsed === "object") {
        setTasks(parsed.tasks ?? []);
        setFolders(
          parsed.folders && parsed.folders.length > 0
            ? parsed.folders
            : ["Inbox"]
        );
      }
    } catch {
      setTasks([]);
      setFolders(["Inbox"]);
    }
  }, []);

  // persist combined state
  useEffect(() => {
    const payload = { tasks, folders };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [tasks, folders]);

  useEffect(() => {
    if (editingId && editRef.current) {
      editRef.current.focus();
      editRef.current.select();
    }
  }, [editingId]);

  function addTask() {
    const value = text.trim();
    if (!value) return;
    const folder = selectedFolder === "All" ? "Inbox" : selectedFolder;
    const newTask: Task = {
      id: String(Date.now()),
      text: value,
      completed: false,
      createdAt: Date.now(),
      folder,
    };
    setTasks((t) => [newTask, ...t]);
    // ensure folder exists
    if (!folders.includes(folder)) setFolders((f) => [folder, ...f]);
    setText("");
  }

  function toggleComplete(id: string) {
    setTasks((t) =>
      t.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function removeTask(id: string) {
    setTasks((t) => t.filter((task) => task.id !== id));
    if (editingId === id) setEditingId(null);
  }

  function startEdit(id: string) {
    setEditingId(id);
  }

  function saveEdit(id: string, value: string, folder?: string) {
    const v = value.trim();
    if (!v) {
      // if empty, remove task
      removeTask(id);
      return;
    }
    setTasks((t) =>
      t.map((task) =>
        task.id === id
          ? { ...task, text: v, folder: folder ?? task.folder }
          : task
      )
    );
    // ensure folder exists
    if (folder && !folders.includes(folder)) setFolders((f) => [folder, ...f]);
    setEditingId(null);
  }

  // folder helpers
  function addFolder() {
    const name = newFolderName.trim();
    if (!name) return;
    if (!folders.includes(name)) {
      setFolders((f) => [name, ...f]);
      setNewFolderName("");
      setSelectedFolder(name);
    }
  }

  function removeFolder(name: string) {
    if (name === "Inbox") return; // never remove Inbox
    // move tasks in this folder to Inbox
    setTasks((t) =>
      t.map((task) =>
        task.folder === name ? { ...task, folder: "Inbox" } : task
      )
    );
    setFolders((f) => f.filter((x) => x !== name));
    if (selectedFolder === name) setSelectedFolder("All");
  }

  function moveTaskTo(taskId: string, folderName: string) {
    setTasks((t) =>
      t.map((task) =>
        task.id === taskId ? { ...task, folder: folderName } : task
      )
    );
    if (!folders.includes(folderName)) setFolders((f) => [folderName, ...f]);
  }

  const completedCount = tasks.filter((t) => t.completed).length;

  // filtered tasks for display (filter by folder + search term)
  const visibleTasks = tasks.filter((t) => {
    // folder filtering
    const inFolder =
      selectedFolder === "All"
        ? true
        : (t.folder ?? "Inbox") === selectedFolder;
    if (!inFolder) return false;
    // search filtering (case-insensitive substring match)
    if (!search.trim()) return true;
    const q = search.trim().toLowerCase();
    return (
      t.text.toLowerCase().includes(q) ||
      (t.folder ?? "Inbox").toLowerCase().includes(q)
    );
  });

  // counts per folder
  const folderCounts: Record<string, number> = {};
  folders.forEach((f) => (folderCounts[f] = 0));
  tasks.forEach((t) => {
    const f = t.folder ?? "Inbox";
    folderCounts[f] = (folderCounts[f] || 0) + 1;
  });

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
        {/* Folder rail */}
        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Folders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setSelectedFolder("All")}
                  className={`text-left px-3 py-2 rounded-md w-full ${
                    selectedFolder === "All"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  All ({tasks.length})
                </button>
                {folders.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedFolder(f)}
                      className={`text-left px-3 py-2 rounded-md w-full ${
                        selectedFolder === f
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      {f} ({folderCounts[f] ?? 0})
                    </button>
                    {f !== "Inbox" && (
                      <button
                        title={`Delete folder ${f}`}
                        onClick={() => removeFolder(f)}
                        className="text-sm text-destructive px-2 py-2 rounded-md"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <Separator className="my-3" />

              <div className="flex gap-2">
                <Input
                  placeholder="New folder..."
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addFolder();
                  }}
                />
                <Button onClick={addFolder} aria-label="Add folder">
                  <Plus />
                </Button>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Main content */}
        <main>
          <Card>
            <CardHeader>
              <CardTitle>To‑Do List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 items-center">
                <Input
                  placeholder="Add a new task..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addTask();
                  }}
                />
                <select
                  value={selectedFolder === "All" ? "Inbox" : selectedFolder}
                  onChange={(e) => {
                    const v = e.target.value;
                    setSelectedFolder(v === "All" ? "All" : v);
                  }}
                  className="rounded-md border px-3 py-2 bg-background"
                  aria-label="Select folder for new task"
                >
                  <option value="Inbox">Inbox</option>
                  {folders.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
                <Button onClick={addTask} aria-label="Add task">
                  <Plus className="mr-2" /> Add
                </Button>
              </div>

              {/* search input */}
              <div className="mt-3 flex gap-2 items-center">
                <Input
                  placeholder="Search tasks or folders..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1"
                />
                {search && (
                  <Button
                    variant="ghost"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                  >
                    Clear
                  </Button>
                )}
              </div>

              <Separator className="my-4" />

              {visibleTasks.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  {search
                    ? "No tasks match your search."
                    : "No tasks in this folder."}
                </div>
              ) : (
                <ul className="flex flex-col gap-3">
                  {visibleTasks.map((task) => (
                    <li key={task.id}>
                      <div className="flex items-center gap-3 p-3 rounded-md border">
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => toggleComplete(task.id)}
                          aria-label={`Mark ${task.text} as ${
                            task.completed ? "incomplete" : "complete"
                          }`}
                        />
                        <div className="flex-1">
                          {editingId === task.id ? (
                            <div className="flex gap-2 items-center">
                              <input
                                ref={editRef}
                                className="w-full bg-transparent outline-none text-sm"
                                defaultValue={task.text}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter")
                                    saveEdit(
                                      task.id,
                                      (e.target as HTMLInputElement).value,
                                      (
                                        document.getElementById(
                                          `folder-select-${task.id}`
                                        ) as HTMLSelectElement
                                      )?.value
                                    );
                                  if (e.key === "Escape") setEditingId(null);
                                }}
                                onBlur={(e) =>
                                  saveEdit(
                                    task.id,
                                    (e.target as HTMLInputElement).value,
                                    (
                                      document.getElementById(
                                        `folder-select-${task.id}`
                                      ) as HTMLSelectElement
                                    )?.value
                                  )
                                }
                              />
                              <select
                                id={`folder-select-${task.id}`}
                                defaultValue={task.folder ?? "Inbox"}
                                className="rounded-md border px-2 py-1 text-sm"
                              >
                                {folders.map((f) => (
                                  <option key={f} value={f}>
                                    {f}
                                  </option>
                                ))}
                              </select>
                            </div>
                          ) : (
                            <div
                              className={`select-none ${
                                task.completed
                                  ? "line-through text-muted-foreground"
                                  : ""
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div>{task.text}</div>
                                <div className="text-xs text-muted-foreground ml-4">
                                  {task.folder ?? "Inbox"}
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="text-xs text-muted-foreground mt-1">
                            Added {new Date(task.createdAt).toLocaleString()}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {editingId === task.id ? (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                saveEdit(
                                  task.id,
                                  editRef.current?.value || task.text,
                                  (
                                    document.getElementById(
                                      `folder-select-${task.id}`
                                    ) as HTMLSelectElement
                                  )?.value
                                )
                              }
                            >
                              <Check />
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => startEdit(task.id)}
                              aria-label="Edit task"
                            >
                              <Edit />
                            </Button>
                          )}
                          <div className="flex items-center gap-2">
                            <select
                              value={task.folder ?? "Inbox"}
                              onChange={(e) =>
                                moveTaskTo(task.id, e.target.value)
                              }
                              className="rounded-md border px-2 py-1 text-sm"
                              aria-label="Move task to folder"
                            >
                              {folders.map((f) => (
                                <option key={f} value={f}>
                                  {f}
                                </option>
                              ))}
                            </select>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => removeTask(task.id)}
                              aria-label="Delete task"
                            >
                              <Trash2 />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>

            <CardFooter className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {visibleTasks.length} task
                {visibleTasks.length !== 1 ? "s" : ""} in{" "}
                {selectedFolder === "All" ? "All folders" : selectedFolder} —{" "}
                {completedCount} completed
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setTasks((t) => t.filter((x) => !x.completed))}
                  disabled={completedCount === 0}
                >
                  Clear Completed
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setTasks([])}
                  disabled={tasks.length === 0}
                >
                  Clear All
                </Button>
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
}
