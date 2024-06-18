import BlogComponent from '../components/BlogComponent'
import ClubEventsHome from '../components/ClubEventsHome'
import Hero from '../components/Hero'
import Highlights from '../components/Highlights'
import NoticeHome from '../components/NoticeHome'


function Homepage() {

  return (
    <div>
        <Hero/>
        <NoticeHome/>
        <ClubEventsHome/>
        <Highlights/>
        <BlogComponent/>
    </div>
  )
}

export default Homepage