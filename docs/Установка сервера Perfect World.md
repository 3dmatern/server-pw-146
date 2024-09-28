### Установка сервера Perfect World (любой сервер) на Ubuntu

## Установка всех зависимостей
1. Обновление пакетов Ubuntu
```bash
apt-get update && apt-get upgrade -y
```

2. Устанавливаем необходимые пакеты
```bash
apt-get install openssh-server apache2 mysql-server -y
java -version
apt-get install openjdk-7-jre -y
php -v
apt-get install php5 -y
apt-get install php5-mysql -y
apt-get install phpmyadmin -y
```

2.1 При установки phpmyadmin, появятся диалоговые окна:
- в первом выбираем: `apache2`;
- во втором предложит установить конфигурацию, выбираем: `No` или `Нет`.


## Проверяем разрядность системы
```bash
lscpu
```

если система x64, то ещё устанавливаем:
```bash
dpkg --add-architecture i386
sudo apt update
apt install libgcc1:i386 libstdc++6:i386
sudo apt upgrade
```
```bash
apt-get install libgcc1 libxml2
```
```bash
export LD_LIBRARY_PATH=/lib/x86_64-linux-gnu:/usr/lib/x86_64-linux-gnu:$LD_LIBRARY_PATH
```
```bash
echo 'export LD_LIBRARY_PATH=/lib/x86_64-linux-gnu:/usr/lib/x86_64-linux-gnu:$LD_LIBRARY_PATH' >> ~/.bashrc
source ~/.bashrc
```
```bash
chmod 755 /lib/x86_64-linux-gnu/libgcc_s.so.1
chmod 755 /usr/lib/x86_64-linux-gnu/libxml2.so.2
```

Если права не удается назначить, то выполняем след. шаги:
получаем чтобы содержалось только 1 имя
```bash
cat /etc/hostname
```

Открываем
```bash
nano /etc/hosts
```
и добавляем строку `127.0.1.1    полученное_имя_в_предыдущей_команде` в `/etc/hosts`
должно получится примерно так:
```
127.0.0.1    localhost
127.0.1.1    xkbfpzryvj
```
после этого перезапускаем сервер
```bash
reboot
```

снова выдаем права
```bash
chmod 755 /lib/x86_64-linux-gnu/libgcc_s.so.1
chmod 755 /usr/lib/x86_64-linux-gnu/libxml2.so.2
```

Получаем версию java и устанавливаем переменную окружения:
```bash
java -version
```
```bash
export JAVA_HOME=/usr/lib/jvm/java-*-openjdk-amd64
```
```bash
source ~/.bashrc
```
## Узнаем свой ip-адрес
```bash
ifconfig
```

## Создаем нового пользователя для MySQL чтобы подключаться к БД

```bash
mysql -u root -p
```

```sql
CREATE USER 'phpmyadmin_user'@'%' IDENTIFIED BY 'trong_password';
GRANT ALL PRIVILEGES ON *.* TO 'phpmyadmin_user'@'%';
FLUSH PRIVILEGES;
\q
```

Откройте файл /etc/apache2/apache2.conf в редакторе nano:
```bash
nano /etc/apache2/apache2.conf
```

Добавьте следующую строку в конце файла:
```
Include /etc/phpmyadmin/apache.conf
```

Перезапустите сервис Apache:
```bash
systemctl restart apache2
```
или
```bash
service apache2 restart
```

## Инициализировать sql файлы из папки с архивом сервера

## Подключиться по FTP к серверу и загрузить файлы в корень сервера (не в папку root).

если в виртуальной мащине, то изменяем конфигурацию ssh:
```bash
nano /etc/ssh/sshd_config
```
изменяем `# PermitRootLogin no` на `PermitRootLogin yes`

```bash
service ssh restart
```

### Дожидаемся загрузки файлов на сервер!

## Редактируем серверные файлы

1. Редактируем доступ к БД
```bash
nano /etc/table.xml
```
- здесь в строке connection устанавливаем логин и пароль к БД

2. Редактируем gamesys.conf
```bash
nano /home/glinkd/gamesys.conf
```
необходимо установить ip-адрес `0.0.0.0` для всех блоков [GLinkServer#].

(В новых версиях Ubuntu соответственно не работает из-за отсутствия openjdk7-jre)
3. Редактируем подключение iweb к БД
```bash
nano /usr/local/jakarta/webapps/iweb/include/.config.jsp
```

4. Редактируем подключение скрипта регистрации к БД (там же можно редактировать выдачу голды при регистрации)
```bash
nano /var/www/index.php
```

5. Выдаем права на папку home
```bash
chmod 777 /home/chmod.sh
```
далее выполняем скрипт который выдаст ещё нужные права
```bash
/home/chmod.sh
```

6. Меняем путь к файлам сайта
```bash
nano /etc/apache2/sites-available/000-default.conf
```
заменяем `DocumentRoot /var/www/html` на `DocumentRoot /var/www`

## Если используем Next.js как сайт

```bash
apt install unzip
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

Также заменяем или добавляем:
```bash
nano /etc/apache2/sites-available/000-default.conf
```

```
<VirtualHost *:80>
    ServerName www.example.com
    ServerAlias www.example.com/test
    ServerAdmin denismatern@gmail.com

    # Убедитесь, что модули proxy и proxy_http включены
    # Для этого выполните следующие команды:
    # a2enmod proxy
    # a2enmod proxy_http

    # Статические файлы
    Alias /_next /path/to/your/nextjs/.next/static
    <Directory /path/to/your/nextjs/.next/static>
        Require all granted
    </Directory>

    # Настройка маршрутизации для Next.js
    ProxyPreserveHost On
    ProxyPass /register http://localhost:3000/
    ProxyPassReverse /register http://localhost:3000/

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```
```bash
systemctl restart apache2
```
или в старных версиях ubuntu:
```bash
service apache2 restart
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