package main

import (
	"context"
	"encoding/json"
	"os"
	"sort"
	"time"
)

// Модель задачи
type Task struct {
	ID        int        `json:"id"`
	Text      string     `json:"text"`
	Done      bool       `json:"done"`      
	Priority  string     `json:"priority"`  
	Deadline  *time.Time `json:"deadline"` 
	CreatedAt int64      `json:"created_at"` 
}

// Основной объект приложения
type App struct {
	ctx        context.Context
	tasks      []Task
	nextTaskID int
	storage    string
}

// Создание нового приложения
func NewApp() *App {
	return &App{
		tasks:      []Task{},
		nextTaskID: 1,
		storage:    "tasks.json",
	}
}

// Инициализация приложения
func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
	a.loadTasks() 
}

// Добавление новой задачи
func (a *App) AddTask(text string, priority string, deadlineStr string) Task {
	var deadline *time.Time
	if deadlineStr != "" {
		layout := "2006-01-02T15:04"     
		if t, err := time.Parse(layout, deadlineStr); err == nil {
			deadline = &t
		}
	}

	task := Task{
		ID:        a.nextTaskID,
		Text:      text,
		Done:      false,
		Priority:  priority,
		Deadline:  deadline,
		CreatedAt: time.Now().Unix(),
	}

	a.tasks = append(a.tasks, task)
	a.nextTaskID++
	a.saveTasks() // сохраняем в файл
	return task
}

// Получение задач с фильтром и сортировкой
func (a *App) GetFilteredTasks(filter, sortBy string) []Task {
	now := time.Now()
	filtered := []Task{}

	// Фильтрация
	for _, t := range a.tasks {
		switch filter {
		case "active":
			if !t.Done {
				filtered = append(filtered, t)
			}
		case "done":
			if t.Done {
				filtered = append(filtered, t)
			}
		case "today":
			if t.Deadline != nil && t.Deadline.Format("2006-01-02") == now.Format("2006-01-02") {
				filtered = append(filtered, t)
			}
		case "week":
			if t.Deadline != nil && t.Deadline.After(now) && t.Deadline.Before(now.AddDate(0, 0, 7)) {
				filtered = append(filtered, t)
			}
		case "overdue":
			if t.Deadline != nil && t.Deadline.Before(now) && !t.Done {
				filtered = append(filtered, t)
			}
		default: 
			filtered = append(filtered, t)
		}
	}

	// Сортировка
	sort.Slice(filtered, func(i, j int) bool {
		switch sortBy {
		case "priority":
			order := map[string]int{"high": 1, "medium": 2, "low": 3}
			pi, pj := order[filtered[i].Priority], order[filtered[j].Priority]
			if pi != pj {
				return pi < pj
			}
			return filtered[i].CreatedAt > filtered[j].CreatedAt
		case "date":
			return filtered[i].CreatedAt > filtered[j].CreatedAt
		default: // выполненные вниз
			if filtered[i].Done != filtered[j].Done {
				return !filtered[i].Done
			}
			return filtered[i].CreatedAt > filtered[j].CreatedAt
		}
	})

	return filtered
}

// Получение всех задач (для совместимости)
func (a *App) GetTasks() []Task {
	return a.GetFilteredTasks("all", "default")
}

// Удаление задачи по ID
func (a *App) DeleteTask(id int) {
	newTasks := []Task{}
	for _, t := range a.tasks {
		if t.ID != id {
			newTasks = append(newTasks, t)
		}
	}
	a.tasks = newTasks
	a.saveTasks()
}

// Переключение статуса выполнения задачи
func (a *App) ToggleTask(id int) {
	for i, t := range a.tasks {
		if t.ID == id {
			a.tasks[i].Done = !a.tasks[i].Done
			break
		}
	}
	a.saveTasks()
}

// Загрузка задач из файла
func (a *App) loadTasks() {
	data, err := os.ReadFile(a.storage)
	if err != nil {
		a.tasks = []Task{}
		a.nextTaskID = 1
		return
	}

	_ = json.Unmarshal(data, &a.tasks)

	maxID := 0
	for _, t := range a.tasks {
		if t.ID > maxID {
			maxID = t.ID
		}
	}
	a.nextTaskID = maxID + 1
}

// Сохранение задач в файл
func (a *App) saveTasks() {
	data, _ := json.MarshalIndent(a.tasks, "", "  ")
	_ = os.WriteFile(a.storage, data, 0644)
}
