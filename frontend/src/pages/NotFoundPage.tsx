import { FaExclamationTriangle } from "react-icons/fa";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center mx-auto container justify-center h-[50vh]">
      <div className="text-6xl text-gray-700 font-bold mb-4 flex flex-col items-center gap-2">
        <FaExclamationTriangle className="text-yellow-500 mr-2" />
        <span>
          404
          </span>
      </div>
      <h1 className="text-3xl text-gray-900 font-bold mb-8">Oops! Page Not Found</h1>
      <p className="text-lg text-gray-700 mb-8">Sorry, the page you are looking for might have been removed or does not exist.</p>
      <a href="/" className="text-lg text-blue-500 hover:underline">Go back to Home</a>
    </div>
  );
}

export default NotFoundPage;
