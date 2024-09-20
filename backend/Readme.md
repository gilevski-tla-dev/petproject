# Платформа для психологических и социалогических исследований

> TODO

Краткое описание проекта и его назначения. 

## Начало работы

Инструкции по настройке и запуску проекта на локальной машине для целей разработки и тестирования.

### Предварительные требования

Что необходимо установить для работы с проектом:
- Go
- PostgreSQL

### Установка

Пошаговые инструкции по установке и настройке окружения.

```bash
git clone 
cd backend
go mod tidy
```

## Файловая структура проекта

```bash
Backend
├── config         # Configuration files (e.g., database connection, environment variables)
├── database       # Database-related code (e.g., migrations, models)
│   ├── migrations # Database migrations for schema management
│   ├── models     # Data models representing database tables
├── daos           # Data access objects for interacting with the database
│   ├── users      # User-related data access object
│   └── products   # Product-related data access object
├── dtos           # Data transfer objects for transferring data between layers
│   ├── user       # User data transfer object
│   └── product    # Product data transfer object
├── handlers       # Controller functions for handling HTTP requests
├── middleware     # Middleware functions for preprocessing requests and responses
├── routes         # Routing rules for mapping URLs to controller functions
├── services       # Business logic and application services
│   ├── auth       # Authentication and authorization services
│   ├── user       # User-related services (e.g., registration, profile management)
│   └── product    # Product-related services (e.g., product management, ordering)
├── utils          # General utility functions and helper code
├── main.go        # Main application entry point
└── vendor         # Vendor code (third-party libraries)

(Перевод)
Backend

├── config         # Конфигурационные файлы (например, подключение к базе данных, переменные окружения)
├── database       # Код, связанный с базой данных (например, миграции, модели)
│   ├── migrations # Миграции базы данных для управления схемой
│   ├── models     # Модели данных, представляющие таблицы базы данных
├── daos           # Объекты доступа к данным для взаимодействия с базой данных
│   ├── users      # Объект доступа к данным, связанным с пользователями
│   └── products   # Объект доступа к данным, связанным с продуктами
├── dtos           # Объекты передачи данных для передачи данных между слоями
│   ├── user       # Объект передачи данных пользователя
│   └── product    # Объект передачи данных продукта
├── handlers       # Функции контроллеров для обработки HTTP-запросов
├── middleware     # Функции промежуточного программного обеспечения для предварительной обработки запросов и ответов
├── routes         # Правила маршрутизации для сопоставления URL с функциями контроллеров
├── services       # Бизнес-логика и сервисы приложения
│   ├── auth       # Сервисы аутентификации и авторизации
│   ├── user       # Сервисы, связанные с пользователями (например, регистрация, управление профилем)
│   └── product    # Сервисы, связанные с продуктами (например, управление продуктами, заказы)
├── utils          # Общие утилиты и вспомогательный код
├── main.go        # Основная точка входа в приложение
└── vendor         # Код поставщиков (сторонние библиотеки)
```

## Используемые технологии
### Список технологий и библиотек, использованных в проекте:

- Gin - HTTP веб-фреймворк

- GORM - ORM для Go

- PostgreSQL - СУБД