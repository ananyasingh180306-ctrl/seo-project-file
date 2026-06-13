
![Logo](https://github.com/ananyasingh180306-ctrl/seo-project-file/blob/main/Screenshot%202026-06-13%20204715.png)


# RankPilot

## 📖 Project Description

**RankPilot** is an AI-powered SEO analytics platform built with the **MERN stack** that helps users analyze website performance, track keyword rankings, and generate intelligent SEO reports. By integrating **Google Gemini AI** for advanced insights and **Browserbase** for browser automation and web scraping, the platform automates technical SEO analysis and delivers actionable recommendations in real time.

The application features secure user authentication, historical keyword tracking, RESTful APIs, and a responsive interface, enabling businesses, marketers, and developers to monitor search performance and make data-driven optimization decisions. Designed with scalability and usability in mind, RankPilot streamlines the entire SEO workflow by combining AI, automation, and analytics into a single modern web application.



## Features

🔍 Website SEO Analyzer – Perform in-depth SEO audits and identify optimization opportunities.

🤖 AI SEO Report Generator – Generate detailed, AI-powered SEO reports with actionable recommendations.

📈 Keyword Rank Tracking – Monitor keyword positions and visualize ranking history over time.

🌐 Browser Automation – Leverage Browserbase to automate website analysis and data extraction.

🔐 Secure Authentication – User authentication and authorization built with the MERN stack.

🗄️ MongoDB Integration – Efficiently manage users, reports, and keyword tracking data.

⚡ RESTful API Architecture – Scalable backend services for seamless frontend integration.

🚀 Production Ready – Designed for deployment with a modern, responsive, and scalable architecture.




## 🛠️ Tech Stack

### Client
- React.js
- Vite
- React Router DOM
- Tailwind CSS
- Axios
- React Hot Toast

### Server
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt.js
- Google Gemini AI
- Browserbase API
- RESTful APIs
- CORS
- Dotenv

### Deployment
- MongoDB Atlas
- Render
- GitHub



## 📦 Installation


Clone the repository and install the required dependencies.

```bash
# Clone the repository
git clone https://github.com/<your-github-username>/seo-project-file.git

# Navigate to the project directory
cd seo-project-file

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```
```
```
    
## Environment Variables

## 🔐 Environment Variables

To run this project, create a `.env` file in the **server** directory and add the following variables:

```env
# Server Configuration
PORT=5000

# MongoDB Database
MONGODB_URI=your_mongodb_connection_string

# JWT Authentication
JWT_SECRET=your_jwt_secret_key

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Browserbase
BROWSERBASE_API_KEY=your_browserbase_api_key
BROWSERBASE_PROJECT_ID=your_browserbase_project_id

# Client URL (for CORS)
CLIENT_URL=http://localhost:5173
```

### Client Environment Variables

Create a `.env` file in the **client** directory and add:

```env
VITE_API_URL=http://localhost:5000
```

> **Note:** Replace all placeholder values with your own credentials. Never commit your `.env` files or expose API keys in a public repository.


## Deployment

## 🚀 Deployment

### 1. Clone the repository

```bash
git clone https://github.com/your-username/rankpilot.git
cd rankpilot
```

### 2. Install dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Configure environment variables

Create a `.env` file in the `server` directory and add the following:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
BROWSERBASE_API_KEY=your_browserbase_api_key
PORT=5000
```

### 4. Run the application

#### Start the backend

```bash
cd server
npm run dev
```

#### Start the frontend

```bash
cd client
npm run dev
```

The application will be available at:

- **Frontend:** `http://localhost:5173`
- **Backend:** `http://localhost:5000`


## Screenshots

![Main dashboard](https://github.com/ananyasingh180306-ctrl/seo-project-file/blob/main/Screenshot%202026-06-13%20200209.png)

![Analysis dashboard](https://github.com/ananyasingh180306-ctrl/seo-project-file/blob/main/Screenshot%202026-06-13%20202314.png)
![keyword tracking ](https://github.com/ananyasingh180306-ctrl/seo-project-file/blob/main/Screenshot%202026-06-13%20202324.png)

![Main features](https://github.com/ananyasingh180306-ctrl/seo-project-file/blob/main/Screenshot%202026-06-13%20204030.png)
 


## Demo

https://seo-project-file.vercel.app/




## 📚 Lessons Learned

Building **RankPilot** provided valuable hands-on experience in developing a production-ready AI-powered SaaS application. Throughout the project, I gained practical knowledge in:

* Integrating **Google Gemini AI** to generate intelligent SEO insights and automate report creation.
* Implementing **Browserbase** for browser automation and real-time website scraping to collect SEO data efficiently.
* Designing scalable **RESTful APIs** and managing secure authentication using JWT.
* Optimizing database operations with **MongoDB** and Mongoose for handling keyword tracking and report history.
* Building a responsive and user-friendly interface with **React.js** while maintaining clean component architecture.
* Managing environment variables, API keys, and sensitive credentials securely across development and production environments.
* Deploying a full-stack MERN application and resolving challenges related to CORS, API communication, and cloud hosting.
* Understanding the importance of modular code, reusable components, and scalable architecture for building maintainable applications.



## 👨‍💻 About Me

I'm a passionate **Full-Stack Developer** with a strong interest in building scalable web applications and AI-powered solutions using the **MERN stack**. I enjoy transforming complex ideas into intuitive, user-friendly products by combining modern technologies with clean and efficient code.

My experience includes developing projects involving **artificial intelligence, browser automation, SEO analytics, authentication systems, payment integrations, and RESTful APIs**. I continuously explore new technologies and best practices to create impactful applications that solve real-world problems.



## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](www.linkedin.com/in/ananya-singh-71b7252ba)


