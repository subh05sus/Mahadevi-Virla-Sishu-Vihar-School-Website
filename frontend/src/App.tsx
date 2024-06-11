import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import SignIn from "./pages/SignIn";
import { useAppContext } from "./contexts/AppContext";
import Homepage from "./pages/Homepage";
import CreateBlog from "./pages/CreateBlog";
import BlogsPage from "./pages/BlogsPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import CarouselImagesPage from "./pages/CarouselImagesPage";
import NotFoundPage from "./pages/NotFoundPage";
import ScrollToTop from "./ScrollToTop";
import SearchAndDeleteBlogs from "./pages/SearchAndDeleteBlogs";
import AdminPanel from "./pages/AdminPanel";
import UploadFeatured from "./pages/UploadFeatured";
import CreateNotice from "./components/CreateNotice";
import NoticeDetails from "./components/NoticeDetails";
import NoticeList from "./components/NoticeList";
import AddHighlightForm from "./pages/AddHighlight";
import HighlightDetailsPage from "./pages/HighlightDetailspage";


function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Layout  page="HomePage"><Homepage /></Layout>} />
        {/* <Route path="/" element={<HomePage/>}/> */}
        {!isLoggedIn &&
          <Route path="/admin" element={<Layout  page=''><SignIn /></Layout>} />
        }

        <Route path="/blogs" element={<Layout  page=''><BlogsPage /></Layout>} />
        <Route path="/blogs/:id" element={<Layout  page=''><BlogDetailsPage /></Layout>} />

        <Route path="/notices" element={<Layout page=''><NoticeList /></Layout>} />
        <Route path="/notices/:id" element={<Layout page=''><NoticeDetails /></Layout>} />

        <Route path="/highlights/:id" element={<Layout page=''><HighlightDetailsPage /></Layout>} />


        {isLoggedIn && (
          <>
            <Route path="/admin" element={<Layout  page=''><AdminPanel /></Layout>} />
            <Route path="/create-blog" element={<Layout  page=''><CreateBlog /></Layout>} />
            <Route path="/review-blogs" element={<Layout  page=''><SearchAndDeleteBlogs /></Layout>} />
            <Route path="/carousel" element={<Layout  page=''><CarouselImagesPage /></Layout>} />
            <Route path="/upload-featured" element={<Layout page=''><UploadFeatured/></Layout>} />
        <Route path="/notices/create" element={<Layout page=''><CreateNotice /></Layout>} />
        <Route path="/add-highlight" element={<Layout page=''><AddHighlightForm /></Layout>} />
          </>
        )}
        <Route path="*" element={<Layout  page=''><NotFoundPage /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
