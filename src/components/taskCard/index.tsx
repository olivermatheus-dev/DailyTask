export default function TaskCard({ task }) {
  return (
    <div className="flex flex-col bg-gray-200 rounded-lg w-96 h-32 p-4 shadow-md">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm font-bold text-gray-800">
          {task.category && task.category}
        </div>
        <button className="text-gray-600 hover:text-red-500 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-9.414l2.293-2.293a1 1 0 10-1.414-1.414L10 7.586 7.707 5.293a1 1 0 10-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 001.414 1.414L10 11.414l2.293 2.293a1 1 0 001.414-1.414L11.414 10z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="text-gray-600 text-lg font-bold">{task.title}</div>
      <div className="flex gap-2 justify-start">
        <div>{task.description && <> have description</>}</div>
      </div>
    </div>
  );
}
