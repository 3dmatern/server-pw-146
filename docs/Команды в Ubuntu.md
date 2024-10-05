# Команды в Ubuntu

- поиск файлов, пример (`*` - это любые символы на её месте):
```bash
find / -name "mysql-connector-java*.jar"
```

- проверить установлен ли пакет:
```bash
dpkg -l | grep имя_пакета
```
или
```bash
apt list --installed | grep имя_пакета
```

- проверка системных ресурсов:
```bash
free -h
```
```bash
df -h
```

- удалить папку и все ее содержимое без подтверждения:
```bash
rm -rf /путь/к/папке
```

## Настройка MySQL для удалённых подключений:
```bash
nano /etc/mysql/mysql.conf.d/mysqld.cnf
```
или
```bash
nano /etc/mysql/my.cnf
```
- найти строку `bind-address = 127.0.0.1` и заменить на
```bash
bind-address = 0.0.0.0
```
- настройка MySQL пользователей
```bash
mysql -u root -p
```
```bash
SELECT Host, User FROM mysql.user WHERE User = 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'ваш_пароль' WITH GRANT OPTION;
FLUSH PRIVILEGES;
SHOW GRANTS FOR 'root'@'%';
```
Здесь:
`'root'@'%'` — это настройка, которая позволяет подключаться с любого IP-адреса. Можно также указать конкретный IP-адрес клиента вместо `%`.

-рестарт mysql:
```bash
systemctl restart mysql

```
или
```bash
service mysql restart
```

-тестирование подключения:
```bash
mysql -u root -p -h 192.168.98.199
```

- пустой шаблон:
```bash

```