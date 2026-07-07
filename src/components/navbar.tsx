import { Github, Terminal } from 'lucide-react';
import { Link } from 'wouter';

export default function Navbar() {

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto p-6 w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
          <Terminal className="w-5 h-5 text-primary" />
          <span className="font-display font-bold tracking-wider">MxSend</span>
        </Link>
        <div className="flex items-center flex-wrap justify-end gap-3">
          <a
            href="https://github.com/Maxessien/mx-send-tauri"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            Source
          </a>
          <Link
            href="/downloads"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)]"
          >
            Download
          </Link>
        </div>
      </div>
    </nav>
  );
}
