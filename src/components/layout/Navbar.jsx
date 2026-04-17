import { Bell, BellRing, PersonStanding, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#131313]/70 backdrop-blur-xl">
      <div className="flex items-center justify-between px-8 py-4 max-w-screen-2xl mx-auto">
        <div className="font-headline text-2xl font-bold text-white">
          THE DIGITAL CURATOR
        </div>

        <div className="hidden md:flex space-x-8">
          <a className="font-headline text-gray-400 hover:text-white">Releases</a>
          <a className="font-headline text-gray-400 hover:text-white">Calendar</a>
          <a className=" font-headline text-white border-b-2 border-[#7B61FF]">
            Upcoming
          </a>
        </div>
        <div className="flex items-center space-x-6">
          <button className="text-[#e2e2e2] hover:text-[#c9bfff] transition-colors">
            <Bell data-icon="notifications"/>
          </button>
          <button class="text-on-surface hover:text-primary transition-colors">
            <span>BELL</span>
          </button>
          <button className="text-[#e2e2e2] hover:text-[#c9bfff] transition-colors">
            <User data-icon="person"/>
          </button>
          <button className="text-on-surface hover:text-primary transition-colors">
            <span>USER</span>
          </button>
        </div>
      </div>
    </nav>
  );
}