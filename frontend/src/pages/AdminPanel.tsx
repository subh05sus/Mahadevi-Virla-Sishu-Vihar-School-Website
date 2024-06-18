import { Link } from "react-router-dom"

function AdminPanel() {
  return (<>
  <h1 className="text-4xl font-bold my-3">Admin Panel</h1>
    <div className="grid lg:grid-cols-4 grid-cols-2 gap-2">
      <Link to={`/review-blogs`} className="px-4 py-2 bg-gray-600 rounded-lg text-white">Review Blogs</Link>
      <Link to={`/notices/create`} className="px-4 py-2 bg-gray-600 rounded-lg text-white">Create Notice</Link>
      <Link to={`/carousel`} className="px-4 py-2 bg-gray-600 rounded-lg text-white">Review Featured Pictures</Link>
      <Link to={`/add-highlight`} className="px-4 py-2 bg-gray-600 rounded-lg text-white">Add Highlight</Link>
      <Link to={`/admin/create-club`} className="px-4 py-2 bg-gray-600 rounded-lg text-white">Create Club</Link>
      <Link to={`/admin/add-event`} className="px-4 py-2 bg-gray-600 rounded-lg text-white">Add Event</Link>
      <Link to={`/admin/registrations`} className="px-4 py-2 bg-gray-600 rounded-lg text-white">View Registrations</Link>
      <Link to={`/admin/manage-clubs-and-events`} className="px-4 py-2 bg-gray-600 rounded-lg text-white">Manage Clubs and Events</Link>

    </div>
  </>
  )
}

export default AdminPanel