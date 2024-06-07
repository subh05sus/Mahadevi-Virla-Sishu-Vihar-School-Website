import Footer from "../components/Footer";
import GoToTopButton from "../components/GoToTopButton";
import Header from "../components/Header";
// import SearchBar from "../components/SearchBar";

interface Props {
  children: React.ReactNode;
  page: string;
}

const Layout = ({ children, page }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header bgHandle={page} />

      <div className={`lg:container portrait:px-4 portrait:w-full mx-auto py-10 flex-1 ${page==="HomePage" && `pt-16`}`}>{children}</div>
      <GoToTopButton />
      <Footer />
    </div>
  );
};

export default Layout;
