export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">About the Project</h1>
      <p className="text-lg text-gray-700 max-w-2xl text-center">
        This is a real-time chat application built using Next.js, Node.js, and Socket.IO.
        It allows users to join chat rooms, send messages, and interact in real-time.
        The project demonstrates the use of WebSockets for real-time communication and
        provides a user-friendly interface for chatting.
      </p>
    </div>
  );
}