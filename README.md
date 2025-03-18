# Simple Chat Application

## About

This project is a simple real-time chat application built as a learning exercise for a **System Programming course**. It demonstrates the implementation of a client-server architecture for real-time messaging, incorporating a user-friendly graphical interface and utilizing socket programming for network communication.

The application allows users to exchange text messages instantly over a network. It's built with modern web technologies to provide a responsive and interactive chat experience.

**Key Features:**

- Real-time text messaging between connected users.
- Simple and intuitive graphical user interface for chatting.
- Basic username identification for users.
- Functionality to connect to and disconnect from the chat server.

## Why This Project?

This project was developed as part of a **System Programming course** to:

- Gain practical experience in building client-server applications.
- Understand and implement real-time communication using WebSockets and Socket.IO.
- Learn about GUI development with a modern JavaScript framework (Next.js).
- Demonstrate the integration of frontend and backend technologies for a networked application.
- Explore fundamental concepts of network programming and system interactions.

## Technologies Used:

- **Frontend (GUI):**
  - [Next.js](https://nextjs.org) - A React framework for building performant and user-friendly web applications.
  - [TypeScript](https://www.typescriptlang.org/) - For type-safe JavaScript development in the frontend.
  - [Tailwind CSS](https://tailwindcss.com) - A utility-first CSS framework for rapid and consistent UI styling.
- **Backend:**
  - [Node.js](https://nodejs.org) - JavaScript runtime environment for building the server-side application.
  - [Socket.IO](https://socket.io) - JavaScript library for real-time, bidirectional communication over WebSockets.

## Future Enhancements (Planned Features):

This is a basic version of the chat application. Future development may include:

- User Authentication and Accounts: Implementing user registration and login.
- Private Messaging: Allowing users to send direct messages to specific individuals.
- Chat Rooms/Channels: Organizing conversations into different rooms or channels.
- Message History: Persisting and displaying chat history.
- Improved UI/UX: Enhancing the user interface with features like message timestamps, user avatars, message formatting, and more polished styling.
- File Sharing: Adding the ability to share files within the chat.
- Scalability Improvements: Optimizing the server for handling a larger number of concurrent users.

## Project Proposal:

For a more detailed overview of the project's initial goals and planned features, please refer to the [Project Proposal Document](./Project-Proposal_%20Simple-Chat-Application.pdf).

## Getting Started

To run this chat application locally, follow these steps:

1. **Clone the repository:**

    ```sh
    git clone https://github.com/sharipovikromjon/chat-app-in-nextjs.git
    cd chat-app-in-nextjs
    ```

2. **Install dependencies:**

    ```sh
    npm install # or yarn install, pnpm install, bun install
    ```

3. **Start the development servers:**

    ```sh
    npm run dev:socket
    ```

    The Next.js development server typically runs on [http://localhost:3000](http://localhost:3000).

4. **Access the application:** Open your web browser and go to [http://localhost:3000](http://localhost:3000) (or the port where your Next.js app is running). You should see the chat application interface.

5. **Start chatting!** Open the application in multiple browser windows or on different devices on the same network to test the real-time chat functionality.

## Learn More

To learn more about the technologies used in this project, refer to their official documentation:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Socket.IO Documentation](https://socket.io/docs/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

You can also explore the [Next.js GitHub repository](https://github.com/vercel/next.js) and the [Socket.IO GitHub repository](https://github.com/socketio/socket.io) for more in-depth information and to contribute to these projects.