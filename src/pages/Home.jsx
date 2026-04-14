import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import UpcomingList from "../components/home/UpcomingList";
import Footer from "../components/layout/Footer";
import ScrollToTopButton from "../components/ui/ScrollToTopButton";

export default function Home() {
  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Navbar />
      <Sidebar />

      <main className="xl:pl-64 pt-20">
        <UpcomingList />
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}