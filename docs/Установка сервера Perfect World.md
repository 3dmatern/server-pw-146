### Установка сервера Perfect World (любой сервер) на Ubuntu

## Установка всех зависимостей
1. Обновление пакетов Ubuntu
```bash
apt-get update && apt-get upgrade -y
```

2. Устанавливаем необходимые пакеты
```bash
apt install openssh-server -y
apt install apache2 -y
apt install mysql-server -y
java -version
apt install openjdk-7-jre -y
php -v
apt install php5 -y
apt install php5-mysql -y
apt install phpmyadmin -y
```

2.1 При установки phpmyadmin, появятся диалоговые окна:
- в первом выбираем: `apache2`;
- во втором предложит установить конфигурацию, выбираем: `Yes` или `Да`.

## Проверяем разрядность системы
```bash
lscpu
```
если система x64, то ещё устанавливаем:
```bash
apt-get install libgtk2.0.0:i386 libpangoxft-1.0.0:i386 gstreamer0.10-pulseaudio:i386 gstreamer0.10-plugins-base:i386 gstreamer0.10-plugins-good:i386
```
или
```bash
dpkg --add-architecture i386
apt-get update
apt-get install ia32-libs
```

## Узнаем свой ip-адрес
```bash
ifconfig
```

## Создаем нового пользователя для MySQL чтобы подключаться к БД

```bash
sudo mysql -u root -p
```

```sql
CREATE USER 'phpmyadmin_user'@'%' IDENTIFIED BY 'trong_password';
GRANT ALL PRIVILEGES ON *.* TO 'phpmyadmin_user'@'%';
FLUSH PRIVILEGES;
\q
```

Откройте файл /etc/apache2/apache2.conf в редакторе nano:
```bash
sudo nano /etc/apache2/apache2.conf
```

Добавьте следующую строку в конце файла:
```
Include /etc/phpmyadmin/apache.conf
```

Перезапустите сервис Apache:
```bash
sudo systemctl restart apache2
```
или
```bash
service apache2 restart
```

## Инициализировать sql файлы из папки с архивом сервера

## Подключиться по FTP к серверу и загрузить файлы в корень сервера (не в папку root).

```bash
sudo nano /etc/ssh/sshd_config
```
изменяем `# PermitRootLogin no` на `PermitRootLogin yes`

```bash
sudo service ssh restart
```

Дожидаемся загрузки файлов на сервер.

## Редактируем серверные файлы

1. Редактируем доступ к БД
```bash
sudo nano /etc/table.xml
```
- здесь в строке connection устанавливаем логин и пароль к БД

2. Редактируем gamesys.conf
```bash
sudo nano /home/glinkd/gamesys.conf
```

необходимо установить ip-адрес `0.0.0.0` для всех блоков [GLinkServer#].

3. Редактируем подключение iweb к БД
```bash
sudo nano /usr/local/jakarta/webapps/iweb/include/.config.jsp
```

4. Редактируем подключение скрипта регистрации к БД (там же можно редактировать выдачу голды при регистрации)
```bash
sudo nano /var/www/register.php
```

5. Выдаем права на папку home
```bash
sudo chmod 777 /home/chmod.sh
```
далее выполняем скрипт который выдаст ещё нужные права
```bash
/home/chmod.sh
```

6. Меняем путь к файлам сайта
```bash
sudo nano /etc/apache2/sites-available/000-default.conf
```
заменяем `DocumentRoot /var/www/html` на `DocumentRoot /var/www`

Если работаем с фреймворком, то заменяем или добавляем:
```
<VirtualHost *:80>
    ServerName localhost
    ServerAlias www.example.com 127.0.0.1
    ServerAdmin webmaster@localhost

    # Укажите путь к вашему приложению Next.js
    ProxyPreserveHost On
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined

    # Убедитесь, что модули proxy и proxy_http включены
    # Для этого выполните следующие команды:
    # a2enmod proxy
    # a2enmod proxy_http
</VirtualHost>
```

```bash
sudo systemctl restart apache2
```
или
```bash
service apache2 restart
```

## Если используем Next.js как сайт

```bash
sudo apt install unzip
```

```bash
curl -fsSL https://fnm.vercel.app/install | bash
```
```bash
source ~/.bashrc
```
```bash
fnm use --install-if-missing 20
```

## Запускаем сервер
```bash
/home/start.sh
```

## Останавливаем сервер
```bash
/home/stop.sh
```

## Обновляем файлы клиента
- заменяем клиентские файлы из папки с сервером в папке client
- прописываем ip к серверу в pw/patcher/server/serverlist.txt