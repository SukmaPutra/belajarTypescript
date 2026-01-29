import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">📝 Daily Task</h1>

        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
};

export default Home;
