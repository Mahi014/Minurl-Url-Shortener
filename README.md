# MinURL 🔗

**MinURL** is a minimal, full-stack URL shortener built using the **PERN stack** (PostgreSQL, Express.js, React.js, Node.js) and **Docker**. It allows users to easily convert long URLs into short ones and provides instant redirection using short codes.

Live: [https://minurl.mahender.me](https://minurl.mahender.me)

## Features 🚀

* **Shorten URLs**: Quickly convert long links into short, shareable URLs.
* **Redirect on Click**: Access original URLs via generated short links.
* **Click Tracking**: Tracks the number of clicks (basic analytics).
* **Custom Domain**: Hosted on a personalized domain with HTTPS.
* **Dockerized Setup**: Fully containerized frontend and backend for streamlined deployment.

## Tech Stack 🛠️

* **Frontend**: React.js, Tailwind CSS
* **Backend**: Node.js, Express.js
* **Database**: PostgreSQL (Render Managed DB)
* **Deployment**: Docker, Docker Compose, Render


## Project Preview 🖼️

### Screenshot 1

![Screenshot 1](Images/Screenshot%20(1).png)

### Screenshot 2

![Screenshot 2](Images/Screenshot%20(2).png)

### Screenshot 3 (when user enters a wrong url)

![Screenshot 3](Images/Screenshot%20(3).png)

## Getting Started ⚙️

### 1. Clone Repository

```bash
git clone https://github.com/Mahi014/Minurl-Url-Shortener.git
cd Minurl-Url-Shortener
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file:

```
PG_USER=your_pg_user
PG_HOST=your_pg_host
PG_DATABASE=your_db
PG_PASSWORD=your_pg_password
PG_PORT=5432
PORT=5000
BASE_URL=your_backend_url
```

Run:

```bash
node index.js
```

### 3. Setup Frontend

```bash
cd ../client
npm install
```

Create `.env` in client:

```
REACT_APP_API_URL=your_backend_url
```

Run:

```bash
npm start
```

### 4. Docker Deployment (Optional)

To test the app locally with Docker:

```bash
docker-compose up --build
```

## Deployed On 🌍

* **Frontend**: [https://minurl.mahender.me](https://minurl.mahender.me)
* **Backend API**: [https://api.mahender.me](https://api.mahender.me)

## How It Works 🔍

1. Users submit a long URL through the UI.
2. The backend checks for existing records or generates a new short code.
3. The shortened URL is returned and displayed.
4. When the short URL is accessed, the app redirects to the original URL and increments the click count.

## Developed By

**Mahender Singh**
