#  DevConnect Frontend

React + Redux frontend for **DevConnect** – a platform that enables developer networking, collaboration, and skill-sharing.

---

**[View Live App Here](http://54.205.222.250/login)**  

## Tech Stack

- **Frontend:** React.js, Redux, React Router, TailwindCSS  
- **State Management:** Redux Toolkit  
- **API Integration:** Axios (connects to [DevConnect Backend](https://github.com/kartikpandey0007/DevConnect-backend))  
- **Deployment:** (Add if deployed – e.g., Vercel/Netlify)

---

##  Features

-  **Secure Authentication** – Login/Signup with JWT (via backend)  
-  **Connections & Feeds** – View, connect, and follow other developers  
-  **Post & Interact** – Create posts, like, and comment  
-  **Real-Time Updates** – Dynamic feed updates and responsive UI

---

##  Installation & Setup

Follow these steps to run the project locally:

```bash
# 1. Clone the repository
git clone https://github.com/kartikpandey0007/Devconnect-Frontend.git
cd Devconnect-Frontend

# 2. Install dependencies
npm install

# 3. Create a .env file in the root and add:
# (Make sure backend is running on the same port)
REACT_APP_BACKEND_URL=http://localhost:3000

# 4. Run the backend first
cd ../devconnect-backend
npm install
npm run dev

# 5. Run the frontend
cd ../devconnect-frontend
npm start
npm start
