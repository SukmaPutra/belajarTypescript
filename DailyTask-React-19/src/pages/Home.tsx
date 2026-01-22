import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Daily Task
        </h1>

        {/* Form */}
        <TaskForm />

        {/* List */}
        <TaskList />
      </div>
    </div>
  );
};

export default Home;
