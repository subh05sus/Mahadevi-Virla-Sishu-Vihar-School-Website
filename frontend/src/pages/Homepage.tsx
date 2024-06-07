import BlogComponent from '../components/BlogComponent'
import Hero from '../components/Hero'
import Highlights from '../components/Highlights'
import NoticeHome from '../components/NoticeHome'


function Homepage() {

  return (
    <div>
        <Hero/>
        <NoticeHome/>
        <Highlights/>
        <BlogComponent/>
    </div>
  )
}

export default Homepage