module.exports = {
  apps: [
    {
      name: "next-app", // Имя вашего приложения
      script: "node_modules/next/dist/bin/next", // Путь к исполняемому скрипту Next.js
      args: "start", // Аргументы, передаваемые в скрипт
      env: {
        NODE_ENV: "production", // Установите переменную окружения для продакшн
        DATABASE_URL: "mysql://root:your_password@localhost:3306/your_database", // URL вашей базы данных
      },
      instances: 1, // Запустить 1 процесс (или укажите "max" - максимальное количество процессов)
      exec_mode: "cluster", // Режим выполнения
      log_file: "./logs/combined.log", // Файл для объединенных логов
      out_file: "./logs/out.log", // Файл для логов вывода
      error_file: "./logs/error.log", // Файл для логов ошибок
      time: true, // Включить временные метки в логах
    },
  ],
};
