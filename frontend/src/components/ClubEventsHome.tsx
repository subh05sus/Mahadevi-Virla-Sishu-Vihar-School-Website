import { Link } from "react-router-dom"



function ClubEventsHome() {
  return (
    <div className="mb-4 bg-gray-100 border p-4 lg:grid-cols-3 grid-cols-1 grid gap-2">
        <div className=" col-span-2"><p className="text-6xl portrait:text-4xl poppins-thin">View All <br/><span className="poppins-semibold">Club Events</span></p></div>
        <div className="text-center flex justify-center items-center gap-2">
            <Link to={`/events`} className=" text-black text-3xl px-3 py-1.5 hover:text-white hover:bg-slate-300 border border-black hover:underline">View Events</Link>
            <Link to={`/clubs`} className=" text-black text-3xl px-3 py-1.5 hover:text-white hover:bg-slate-300 border border-black hover:underline">View Clubs</Link>
            </div>
    </div>
  )
}

export default ClubEventsHome