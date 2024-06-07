import { Link } from "react-router-dom"

function AdminPanel() {
  return (
    <div className="grid grid-cols-4 gap-2">
        <Link to={`/review-blogs`} className="px-4 py-2 bg-blue-600 rounded-lg text-white">Review Blogs</Link>
        <Link to={`/notices/create`} className="px-4 py-2 bg-blue-600 rounded-lg text-white">Create Notice</Link>
        <Link to={`/carousel`} className="px-4 py-2 bg-blue-600 rounded-lg text-white">Review Featured Pictures</Link>
        <Link to={`/add-highlight`} className="px-4 py-2 bg-blue-600 rounded-lg text-white">Add Highlight</Link>
    </div>
  )
}

export default AdminPanel