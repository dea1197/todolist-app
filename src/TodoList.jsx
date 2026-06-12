import { useEffect, useState } from 'react';

function TodoList() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  })
  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" atau "desc"

  // Dark mode----
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);


  function addTask() {

    if (newTask.trim() === "" || newDate.trim() === "") return;

    const taskObject = {
      id: Date.now(),
      name: newTask,
      date: newDate,
      completed: false
    };

    if (editIndex !== null) {
      setTasks(tasks.map(task =>
        task.id === editIndex ? { ...taskObject, id: task.id } : task
      ));
      setEditIndex(null);
    } else {
      setTasks(t => [...t, taskObject]);
    }

    setNewTask("");
    setNewDate("");
  }

  function editTask(id) {
    const task = tasks.find(t => t.id === id);
    setNewTask(task.name);
    setNewDate(task.date);
    setEditIndex(id);
  }

  // checklist bar---
  function toggleComplete(id) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  function deleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  const filteredTasks = tasks.filter(task => {

    const matchesFilter =
      filter === "all"
        ? true
        : filter === "completed"
          ? task.completed
          : !task.completed;

    const matchesSearch =
      task.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  }).sort((a, b) => {
    if (sortOrder === "asc") {
      return a.date.localeCompare(b.date); // terlama → terbaru
    } else {
      return b.date.localeCompare(a.date); // terbaru → terlama
    }
  });

  // Statistik tasks ----------
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    task => task.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  const completionPercentage =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  // Untuk menghitung todayTasks
  const today = new Date().toLocaleDateString("en-CA");

  const todayTasks = tasks.filter(
    task => task.date === today
  ).length;

  // DeadLine Tasks- -----

  function getDeadlineStatus(date) {
    const today = new Date();
    const deadline = new Date(date + "T00:00:00");

    today.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);

    if (deadline < today) {
      return "Terlambat";
    }

    if (deadline.getTime() === today.getTime()) {
      return "Hari Ini";
    }

    return "Akan Datang";
  }

  const overdueTasks = tasks.filter(task => {
    const today = new Date();
    const deadline = new Date(task.date + "T00:00:00");

    today.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);

    return deadline < today && !task.completed;
  }).length;

  // format date---
  function formatDate(dateStr) {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  }

  return (
    <div className='todo-container'>
      <div className="todo-header">
        <h1>TodoList App</h1>
        <button
          className="theme-toggle"
          onClick={() => setDarkMode(d => !d)}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
      <div className='todo-input-grid'>
        <input
          type='text'
          placeholder='Masukan Rencana Kegiatan..'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)} />

        <input type='date' value={newDate}
          onChange={(e) => setNewDate(e.target.value)} />

        <button onClick={addTask}>
          {editIndex !== null ? "Simpan" : "Tambahkan"}
        </button>

        <div className="filter-buttons">
          <button onClick={() => setFilter("all")}>
            Semua
          </button>

          <button onClick={() => setFilter("completed")}>
            Selesai
          </button>

          <button onClick={() => setFilter("pending")}>
            Belum Selesai
          </button>

          <button onClick={() => setSortOrder(s => s === "asc" ? "desc" : "asc")}>
            {sortOrder === "asc" ? "Tanggal ↑" : "Tanggal ↓"}
          </button>

          <input
            type="text"
            placeholder="Cari task..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <p>
          Menampilkan {filteredTasks.length} dari {tasks.length} task
        </p>
      </div>

      <div className="stats-container">
        <p>Total Task: {totalTasks}</p>
        <p>Selesai: {completedTasks}</p>
        <p>Belum Selesai: {pendingTasks}</p>
        <p>Progress: {completionPercentage}%</p>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>

      <p>📋Task Hari Ini: {todayTasks}</p>
      <p>⚠️Task Terlambat: {overdueTasks}</p>

      <div className='todolist'>

        {filteredTasks.map((task, index) => (
          <div className='todo-grid' key={index}>

            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />

            <div className={`text ${task.completed ? "completed" : ""}`}>
              {task.name}
            </div>

            <div className='date'>
              {formatDate(task.date)}
            </div>

            <div
              className={`deadline-status ${getDeadlineStatus(task.date) === "Terlambat"
                ? "overdue"
                : getDeadlineStatus(task.date) === "Hari Ini"
                  ? "today"
                  : "upcoming"
                }`}
            >
              {getDeadlineStatus(task.date)}
            </div>

            <button onClick={() => editTask(task.id)}>
              Edit
            </button>

            <button onClick={() => deleteTask(task.id)}>
              Hapus
            </button>

          </div>
        ))}

      </div>
    </div>

  );
}

export default TodoList;