
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Workflow from './components/Workflow';
import OpenSource from './components/OpenSource';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/30">
      <div className="ambient-bg"></div>
      
      <Navbar />
      
      <main className="flex-grow pt-36 pb-16 px-4 md:px-6">
        <Hero />
        <Features />
        <Workflow />
        <OpenSource />
      </main>
      
      <Footer />
    </div>
  );
}
