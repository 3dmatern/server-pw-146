Для развертывания Next.js приложения на VPS с Ubuntu, nginx, pm2 и настройки CI/CD для автоматического развертывания при пуше изменений на хостинге Beget, выполните следующие шаги:

### 1. Настройка сервера (VPS Ubuntu)

#### 1.1. Установка необходимых пакетов

Обновите пакеты и установите Node.js, npm, nginx и pm2:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

#### 1.2. Настройка проекта Next.js

1. Подключитесь к вашему серверу через SSH.
2. Перейдите в директорию, где будет храниться ваше приложение, например:

```bash
cd /var/www/your-next-app
```

3. Склонируйте репозиторий с вашим приложением:

```bash
git clone https://github.com/your-username/your-next-app.git .
```

4. Установите зависимости проекта:

```bash
npm install
```

5. Создайте файл `.env` и добавьте необходимые переменные окружения.

6. Соберите приложение для production:

```bash
npm run build
```

#### 1.3. Настройка pm2 для запуска Next.js

1. Настройте pm2 для управления процессом приложения:

```bash
pm2 start npm --name "next-app" -- start
```

2. Убедитесь, что приложение добавлено в автозагрузку:

```bash
pm2 save
pm2 startup
```

### 2. Настройка Nginx

Nginx будет использоваться как обратный прокси для перенаправления трафика на ваше приложение.

1. Откройте конфигурационный файл для вашего сайта:

```bash
sudo nano /etc/nginx/sites-available/default
```

2. Замените содержимое файла на следующее:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. Проверьте конфигурацию и перезапустите Nginx:

```bash
sudo nginx -t
sudo systemctl restart nginx
```

### 3. Настройка CI/CD (GitHub Actions)

Для автоматического развертывания приложения при пуше изменений можно использовать GitHub Actions.

1. Создайте файл `.github/workflows/deploy.yml` в вашем репозитории:

```yaml
name: Deploy Next.js App

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout the repository
        uses: actions/checkout@v4

      - name: Install SSH key
        uses: shimataro/ssh-key-action@v2
        with:
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          known_hosts: ${{ secrets.KNOWN_HOSTS }}

      - name: Deploy via SSH
        run: |
          ssh -o StrictHostKeyChecking=no user@your-vps-ip << 'EOF'
            export PATH=$PATH:/run/user/0/fnm_multishells/276090_1726604285757/bin
            cd /var/www/your-next-app
            git pull origin main
            npm install
            npm run build
            pm2 restart next-app
          EOF
```

2. Создайте SSH ключи и добавьте приватный SSH-ключ вашего сервера в секреты репозитория:
  - `ssh-keygen -t rsa`
  - Публичный ключ добавьте в **authorized_keys** (на хостинге) и перезапустите службу: `sudo systemctl restart ssh`
  - В настройках репозитория перейдите в раздел **Secrets and variables** → **Actions**.
  - Добавьте новый секрет с именем `SSH_PRIVATE_KEY`, содержащий ваш приватный SSH-ключ.
  - Добавьте еще один секрет `KNOWN_HOSTS` с результатом команды:

```bash
ssh-keyscan your-vps-ip
```

### 4. Дополнительные настройки

- **SSL**: Для обеспечения безопасности используйте Let's Encrypt для получения SSL-сертификатов:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

- **Мониторинг**: pm2 предоставляет встроенный мониторинг процессов:

```bash
pm2 monit
```

Теперь, после каждого пуша в ветку `main`, GitHub Actions будет автоматически обновлять ваше приложение на сервере.