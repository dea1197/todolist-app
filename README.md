# 📝 TodoList App

A clean, responsive **Todo List application** built with **React**, designed to help you manage daily tasks with style. It features dark/light mode, smart filtering, due-date tracking, and real-time progress visualization — all wrapped in a sleek, modern UI.

![TodoList App Preview](./assets/Screenshot_5.png)

---

🌐Live Demo<br>
https://todolist-app-ten-gamma.vercel.app/

## ✨ Features

- ✅ **Add, Edit, and Delete Tasks** — quickly manage your to-do list with simple, intuitive controls.
- 📅 **Due Date Picker** — assign deadlines to each task using a native date input.
- 🌗 **Dark / Light Mode** — toggle between themes, with your preference saved via `localStorage`.
- 🔍 **Search Tasks** — instantly find tasks by typing keywords.
- 🧭 **Smart Filters** — filter tasks by **All**, **Completed**, **Not Completed**, or sort by **Date**.
- 📊 **Progress Tracker** — visual progress bar showing completion percentage at a glance.
- 📈 **Task Statistics** — see total tasks, completed tasks, and pending tasks in real time.
- ⏰ **Today & Overdue Indicators** — automatically highlights tasks due today (🟡 *Hari Ini*) and overdue tasks (🔴 *Terlambat*).
- 💾 **Persistent Storage** — your tasks and theme preference are saved locally, so nothing is lost on refresh.

---

## 🖥️ Tech Stack

- **React** – component-based UI library
- **CSS (Custom Properties)** – for theming and dark/light mode styling
- **localStorage** – for persisting tasks and theme settings

---

## 🚀 Getting Started

### Prerequisites
Make sure you have **Node.js** and **npm** installed on your machine.

### Installation

1. Clone this repository
   ```bash
   git clone https://github.com/dea1197/todolist-app.git
   ```

2. Navigate to the project folder
   ```bash
   cd todolist-app
   ```

3. Install dependencies
   ```bash
   npm install
   ```

4. Run the app
   ```bash
   npm run dev
   ```

5. Open your browser and go to `http://localhost:5173` (or the port shown in your terminal).

---

## 📖 How to Use

1. Type your task in the input field (*Masukan Rencana Kegiatan..*).
2. Pick a due date using the date picker.
3. Click **Tambahkan** to add the task to your list.
4. Use the checkbox to mark a task as completed.
5. Use **Edit** to update a task or **Hapus** to delete it.
6. Use the filter buttons (**Semua**, **Selesai**, **Belum Selesai**, **Tanggal**) to organize your view.
7. Use the search bar to quickly find specific tasks.
8. Toggle **Light Mode / Dark Mode** in the top-right corner to switch themes.

---

## ☁️ Deployment (Vercel)

This project can be easily deployed using **Vercel**:

1. Push your project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account.
3. Click **Add New Project**, then select your TodoList repository.
4. Vercel will auto-detect the framework (e.g. Vite/React) and configure the build settings automatically.
5. Click **Deploy** — and that's it! 🎉

Once deployed, you'll get a live URL (e.g. `https://your-todolist-app.vercel.app`) that you can share or add to your portfolio.

> 💡 Tip: Every time you push new changes to the `main` branch, Vercel will automatically redeploy your app.

---

## 📌 Roadmap / Future Improvements

- [ ] Task categories or tags
- [ ] Drag-and-drop task reordering
- [ ] Cloud sync / backend integration
- [ ] Notifications/reminders for upcoming deadlines

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/dea1197/todolist-app/issues) if you'd like to contribute.

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute it.

---

## 👤 Author

Made with ❤️ by **Dea**
