import { useEffect, useState } from "react";
import {
  AddTask,
  GetTasks,
  DeleteTask,
  ToggleTask,
} from "../wailsjs/go/main/App";
import "./App.css";

interface LocalTask {
  id: number;
  text: string;
  done: boolean;
  priority: string;
  deadline?: string;
  created_at: number;
  deadlineDate?: Date;
}

type Filter = "all" | "active" | "done";
type DateFilter = "all" | "today" | "week" | "month";
type SortBy = "none" | "date" | "priority";

function App() {
  const [tasks, setTasks] = useState<LocalTask[]>([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("medium");
  const [deadlineDateInput, setDeadlineDateInput] = useState("");
  const [deadlineTimeInput, setDeadlineTimeInput] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [sortBy, setSortBy] = useState<SortBy>("none");
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    GetTasks().then((result) => {
      const updated: LocalTask[] = result.map((t) => ({
        ...t,
        deadlineDate: t.deadline ? new Date(t.deadline) : undefined,
      }));
      setTasks(updated);
    });
  };

  const handleAdd = () => {
    if (!newTask.trim()) return;

    let deadline: Date | undefined;
    if (deadlineDateInput && deadlineTimeInput) {
      const [year, month, day] = deadlineDateInput.split("-").map(Number);
      const [hours, minutes] = deadlineTimeInput.split(":").map(Number);
      deadline = new Date(year, month - 1, day, hours, minutes);
    }

    const deadlineStr = deadline ? deadline.toISOString() : "";

    AddTask(newTask, priority, deadlineStr).then((task) => {
      const localTask: LocalTask = {
        ...task,
        deadlineDate: deadline,
      };
      setTasks((prev) => [localTask, ...prev]);
      setNewTask("");
      setPriority("medium");
      setDeadlineDateInput("");
      setDeadlineTimeInput("");
    });
  };

  const handleDelete = (id: number) => {
    DeleteTask(id).then(() => {
      loadTasks();
      setConfirmDeleteId(null);
    });
  };

  const handleToggle = (id: number) => {
    ToggleTask(id).then(() => {
      loadTasks();
    });
  };

  const formatDeadline = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

  // --- Фильтрация и сортировка ---
  const now = new Date();
  let filteredTasks = tasks
    .filter((t) => {
      if (filter === "active") return !t.done;
      if (filter === "done") return t.done;
      return true;
    })
    .filter((t) => {
      const deadline = t.deadlineDate;
      if (!deadline) return dateFilter === "all";

      const isToday = deadline.toDateString() === now.toDateString();
      const isThisWeek =
        deadline >= now &&
        deadline < new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
      const isThisMonth =
        deadline.getMonth() === now.getMonth() &&
        deadline.getFullYear() === now.getFullYear();

      if (dateFilter === "today") return isToday;
      if (dateFilter === "week") return isThisWeek;
      if (dateFilter === "month") return isThisMonth;
      return true;
    });

  // --- Сортировка ---
  filteredTasks.sort((a, b) => {
    // Сначала по статусу (done вниз)
    if (a.done !== b.done) return Number(a.done) - Number(b.done);

    // Потом по выбранной сортировке
    if (sortBy === "date") {
      const da = a.deadlineDate ? a.deadlineDate.getTime() : Infinity;
      const db = b.deadlineDate ? b.deadlineDate.getTime() : Infinity;
      return da - db;
    }

    if (sortBy === "priority") {
      const order: Record<string, number> = { high: 1, medium: 2, low: 3 };
      return order[a.priority] - order[b.priority];
    }

    return 0;
  });

  const priorityColors: Record<string, string> = {
    low: "green",
    medium: "orange",
    high: "red",
  };

  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>
      <h1>To-Do List</h1>
      <button
        style={{ marginBottom: 15 }}
        onClick={() => setDarkMode((prev) => !prev)}
      >
        {darkMode ? "Светлая" : "Тёмная"} тема
      </button>

      {/* Форма добавления задачи */}
      <div className="form">
        <div className="form-group">
          <label>Введите вашу задачу:</label>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Например: купить продукты"
          />
        </div>

        <div className="form-group">
          <label>Уровень приоритета:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Низкий</option>
            <option value="medium">Средний</option>
            <option value="high">Высокий</option>
          </select>
        </div>

        <div className="form-group">
          <label>Срок выполнения (дата):</label>
          <input
            type="date"
            value={deadlineDateInput}
            onChange={(e) => setDeadlineDateInput(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Срок выполнения (время):</label>
          <input
            type="time"
            value={deadlineTimeInput}
            onChange={(e) => setDeadlineTimeInput(e.target.value)}
          />
        </div>

        <div className="form-group-button">
          <button onClick={handleAdd}>Добавить</button>
        </div>
      </div>

      {/* Фильтры */}
      <div className="filters">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "active" : ""}
        >
          Все ({tasks.length})
        </button>
        <button
          onClick={() => setFilter("active")}
          className={filter === "active" ? "active" : ""}
        >
          Активные ({tasks.filter((t) => !t.done).length})
        </button>
        <button
          onClick={() => setFilter("done")}
          className={filter === "done" ? "active" : ""}
        >
          Выполненные ({tasks.filter((t) => t.done).length})
        </button>
      </div>

      {/* Панель сортировки и фильтра по времени */}
      <div className="form sort-filter">
        <div className="form-group">
          <label>Сортировка:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
          >
            <option value="none">Без сортировки</option>
            <option value="date">По дате</option>
            <option value="priority">По приоритету</option>
          </select>
        </div>

        <div className="form-group">
          <label>Фильтр по времени:</label>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as DateFilter)}
          >
            <option value="all">Все</option>
            <option value="today">Сегодня</option>
            <option value="week">На неделю</option>
            <option value="month">В этом месяце</option>
          </select>
        </div>
      </div>

      {/* Список задач */}
      <ul className="task-list">
        {filteredTasks.map((task) => {
          const deadline = task.deadlineDate;
          const isOverdue = deadline && !task.done && deadline < new Date();

          return (
            <li key={task.id} className={`task ${isOverdue ? "overdue" : ""}`}>
              <span
                className={`task-text ${task.done ? "done" : ""}`}
                style={{
                  textDecoration: task.done ? "line-through" : "none",
                  color: task.done ? "#888" : "#000",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {task.text}
                {deadline && (
                  <span style={{ fontSize: 12, color: "#555" }}>
                    ⏰ {formatDeadline(deadline)}
                  </span>
                )}
                <span style={{ color: priorityColors[task.priority], fontSize: 12 }}>
                  ({task.priority})
                </span>
              </span>

              <div className="task-actions">
                <button onClick={() => handleToggle(task.id)}>
                  {task.done ? "Вернуть" : "Выполнить"}
                </button>
                <button className="delete" onClick={() => setConfirmDeleteId(task.id)}>
                  Удалить
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Модалка подтверждения удаления */}
      {confirmDeleteId !== null && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Вы уверены, что хотите удалить задачу?</p>
            <div className="modal-actions">
              <button onClick={() => setConfirmDeleteId(null)}>Отмена</button>
              <button
                className="delete"
                onClick={() => handleDelete(confirmDeleteId!)}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
