# To-Do List Wails App

## Описание проекта
Кросс-платформенное настольное приложение To-Do List, разработанное с использованием **Wails (Go + React)**.  
Позволяет пользователю управлять задачами: добавлять, удалять, отмечать как выполненные, сортировать и фильтровать.  
Состояние задач сохраняется между перезапусками приложения с помощью локального файла `tasks.json`.

---

## Технологии
- **Go** – backend, логика приложения
- **React** – frontend, интерфейс пользователя
- **Wails v2** – кросс-платформенный desktop фреймворк
- **CSS** – стилизация, поддержка светлой и тёмной темы

---

## Основные возможности
- Добавление задач с текстом, приоритетом (низкий/средний/высокий) и дедлайном  
- Удаление задач с подтверждением через модальное окно  
- Отметка задачи как выполненной и возврат в активные  
- Фильтрация задач по статусу (все, активные, выполненные) и по времени (сегодня, неделя, месяц)  
- Сортировка задач по дате или приоритету  
- Поддержка светлой и тёмной темы  
- Адаптивный интерфейс  
- Сохранение состояния задач при закрытии приложения

---

## Структура проекта
todo-app/
├─ frontend/ # React фронтенд
├─ main.go # Wails main
├─ App.go # Логика приложения (Go)
├─ tasks.json # Локальное хранение задач
├─ .gitignore
├─ README.md


---

## Установка и запуск
1. Установить [Go](https://go.dev/) и [Node.js](https://nodejs.org/)
2. Установить Wails:

go install github.com/wailsapp/wails/v2/cmd/wails@latest

Установить зависимости фронтенда:

cd frontend
npm install

Запуск в режиме разработки:
wails dev

---

| Скриншот | Описание |
|----------|----------|
| ![Главный экран](https://raw.githubusercontent.com/aruYermek/todo/master/screenshots/main-page.png) | Главный экран |
| ![Добавление задачи](https://raw.githubusercontent.com/aruYermek/todo/master/screenshots/enter-todo.png) | Добавление задачи |
| ![Все задачи](https://raw.githubusercontent.com/aruYermek/todo/master/screenshots/add-todo.png) | Все задачи |
| ![Добавление задачи с временем](https://raw.githubusercontent.com/aruYermek/todo/master/screenshots/enter-todo-withtime.png) | Добавление задачи с временем |
| ![Раздел активные](https://raw.githubusercontent.com/aruYermek/todo/master/screenshots/active.png) | Раздел активные |
| ![Раздел выполненные](https://raw.githubusercontent.com/aruYermek/todo/master/screenshots/done.png) | Раздел выполненные |
| ![Сортировка по дате](https://raw.githubusercontent.com/aruYermek/todo/master/screenshots/sorting-date.png) | Сортировка по дате |
| ![Сортировка по приоритету](https://raw.githubusercontent.com/aruYermek/todo/master/screenshots/sorting-degree.png) | Сортировка по приоритету |
| ![Фильтр](https://raw.githubusercontent.com/aruYermek/todo/master/screenshots/filter.png) | Фильтр |
| ![Завершить задачу](https://raw.githubusercontent.com/aruYermek/todo/master/screenshots/todo-done.png) | Завершить задачу |
| ![Удалить задачу](https://raw.githubusercontent.com/aruYermek/todo/master/screenshots/delete.png) | Удалить задачу |
| ![Адаптивность](https://raw.githubusercontent.com/aruYermek/todo/master/screenshots/responsive.png) | Адаптивность |
| ![Темная тема](https://raw.githubusercontent.com/aruYermek/todo/master/screenshots/dark.png) | Темная тема |




Видео демонстрация

Ссылка на видео - 



