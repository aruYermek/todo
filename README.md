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
```bash
go install github.com/wailsapp/wails/v2/cmd/wails@latest

Установить зависимости фронтенда:

cd frontend
npm install

Запуск в режиме разработки:
wails dev

---

## Скриншоты
![Главный экран](https://github.com/aruYermek/todo/screenshots/main-page.png)
![Добавление задачи](https://github.com/aruYermek/todo/raw/main/screenshots/enter-todo.png)
![Все задачи](https://github.com/aruYermek/todo/raw/main/screenshots/add-todo.png)
![Добавление задачи с временем](https://github.com/aruYermek/todo/raw/main/screenshots/enter-todo-withtime.png)
![Раздел активные](https://github.com/aruYermek/todo/raw/main/screenshots/active.png)
![Раздел выполненные](https://github.com/aruYermek/todo/raw/main/screenshots/done.png)
![Сортировка по дате](https://github.com/aruYermek/todo/raw/main/screenshots/sorting-date.png)
![Сортировка по приоритету](https://github.com/aruYermek/todo/raw/main/screenshots/sorting-degree.png)
![Фильтр](https://github.com/aruYermek/todo/raw/main/screenshots/filter.png)
![Завершить задачу](https://github.com/aruYermek/todo/raw/main/screenshots/todo-done.png)
![Удалить задачу](https://github.com/aruYermek/todo/raw/main/screenshots/delete.png)
![Адаптивность](https://github.com/aruYermek/todo/raw/main/screenshots/responsive.png)
![Темная тема](https://github.com/aruYermek/todo/raw/main/screenshots/dark.png)



Видео демонстрация

Ссылка на видео - 



