# CollabBoard

CollabBoard is a web-based collaborative whiteboard application that allows multiple users to sketch and collaborate in real time. This application is built using modern web technologies and deployed on cloud platforms for scalability and reliability.

Features:-
    Real-time Collaboration: Multiple users can create or join a shared whiteboard session using a room ID and collaborate in real time.
    Sketching Tools: Users can draw on the whiteboard using different colors and see changes made by other users instantly.
    Session Management: Save and load whiteboard sessions for later use.
    User Authentication: Secure login and registration functionality using JWT.


Tech Stack:-

    Frontend:
    Framework: React
    Real-time Communication: Socket.IO
    Styling: CSS (with custom styles)
    Deployment: Vercel

    Backend:
    Framework: Node.js with Express
    Real-time Communication: Socket.IO
    Database: PostgreSQL
    Authentication: JSON Web Tokens (JWT)
    Deployment: Render


Project Structure:-

/CollabBoard
        ├── /client            # React frontend
        │   ├── /public        # Public assets
        │   ├── /src           # Source files
        │   │   ├── /components # React components
        │   │   ├── /pages      # Page components
        │   │   ├── /styles     # CSS styles
        │   │   ├── App.js      # Main app component
        │   │   ├── index.js    # Entry point
        │   └── package.json   # Frontend dependencies
        ├── /server            # Node.js backend
        │   ├── /controllers   # API controllers
        │   ├── /models        # Database models
        │   ├── /routes        # API routes
        │   ├── /utils         # Utility functions
        │   ├── index.js       # Entry point
        │   └── package.json   # Backend dependencies
        └── README.md          # Project documentation


Usage:
    Open the deployed application in your browser.
    Register a new account or log in with existing credentials.
    Create or join a whiteboard session using a room ID.
    Start sketching and collaborating in real time with other users.


Future Improvements:
    Adding more drawing tools like shapes and text.
    Implementing unit tests for frontend and backend components.
    Enhancing the user interface with additional features and animations.


Assumptions:
    Reasonable assumptions were made regarding the scalability and deployment of the application.
    JWT is used for secure authentication and session management.

Deployment:
    Frontend (Vercel)
    npm install -g vercel
    Deploy the frontend:
    vercel --prod
    Backend (Render)
    Push the server code to a GitHub repository.
    Create a new web service on Render, connecting it to the GitHub repository.
    Set up environment variables on Render (same as in the .env file).
    Deploy the backend service.



Setup Instructions:-

        Prerequisites
        Node.js and npm
        PostgreSQL
        Vercel CLI (for frontend deployment)
        Render account (for backend deployment)

        Frontend Setup

        Navigate to the client directory:

        sh
        
        cd client
        Install dependencies:

        sh
        
        npm install
        Start the development server:

        sh
        
        npm start
        Backend Setup
        Navigate to the server directory:

        sh
        
        cd server
        Install dependencies:

        sh
        
        npm install
        Set up environment variables:


        env
        
        DATABASE_URL=postgresql://database_url
        JWT_SECRET=your_jwt_secret
        Start the backend server:

        sh
        npm start

Database Setup:
    Create a PostgreSQL database and a user.

    Tables
    1. sessions
    Columns:

    id (Primary Key): Unique identifier for each session.
    data: Data associated with the session.
    userId (Foreign Key): References the id column in the users table, indicating the user to whom the session belongs.
    roomId: Identifier for the room associated with the session.
    createdAt: Timestamp when the session was created.
    updatedAt: Timestamp when the session was last updated.
    Constraints:

    Primary Key on id.
    Foreign Key on userId referencing users(id).


    2. users
    Columns:

    id (Primary Key): Unique identifier for each user.
    username: Username of the user.
    password: Password for the user.
    createdAt: Timestamp when the user account was created.
    updatedAt: Timestamp when the user account was last updated.
    Constraints:

    Primary Key on id.



Acknowledgments:
    This project is part of the Full Stack Developer assignment by Growtomation.
    Thanks to the creators of the libraries and tools used in this project.


License:
    This project is licensed under the MIT License.

