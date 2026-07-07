import { motion } from 'framer-motion';
import { 
  Terminal, 
  Wifi, 
  QrCode, 
  Activity, 
  Cpu, 
  Github, 
  Download,
  ArrowRight,
  Monitor,
} from 'lucide-react';
import { FaApple, FaWindows, FaLinux, FaAndroid, FaRust } from 'react-icons/fa';
import { Link } from 'wouter';
import Navbar from '@/components/navbar';
import heroImg from '../../attached_assets/generated_images/hero-illustration.jpg';

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const STAGGER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground">
      <div className="noise-bg" />

      <Navbar />

      <main className="pt-24 pb-32">
        {/* HERO SECTION */}
        <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col lg:flex-row items-center gap-16">
          <div className="absolute inset-0 grid-bg -z-10 opacity-30" />
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={STAGGER}
            className="flex-1 text-left z-10"
          >
            <motion.div variants={FADE_UP} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-primary mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Cross-Platform P2P Protocol v1.0
            </motion.div>
            
            <motion.h1 variants={FADE_UP} className="text-5xl lg:text-7xl font-bold font-display leading-[1.1] mb-6">
              Direct transfer. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">No middlemen.</span>
            </motion.h1>
            
            <motion.p variants={FADE_UP} className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed font-sans">
              MxSend is a cross-platform, peer-to-peer file transfer app for your local area network. No internet required, no cloud, no accounts. Just a QR scan and your files fly across the room.
            </motion.p>
            
            <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/downloads"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 rounded-md font-semibold text-base hover:bg-foreground/90 transition-colors"
              >
                <Download className="w-5 h-5" />
                Download Latest Release
              </Link>
              <a 
                href="https://github.com/Maxessien/mx-send-tauri" 
                target="_blank" 
                rel="noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-foreground px-8 py-4 rounded-md font-semibold text-base hover:bg-white/10 transition-colors"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex-1 w-full relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/10 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
              <img 
                src={heroImg} 
                alt="Devices connected via MxSend" 
                className="w-full h-auto object-cover scale-[1.02] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
            </div>
            
            {/* Decorative tech elements */}
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/20 blur-3xl rounded-full" />
            <div className="absolute -left-6 -top-6 w-32 h-32 bg-secondary/20 blur-3xl rounded-full" />
          </motion.div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-24 relative z-10 border-t border-white/5 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={FADE_UP}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl font-display font-bold mb-4">Precision Workflow</h2>
              <p className="text-muted-foreground text-lg">Transferring files shouldn't involve uploading to a server just to pull it down 2 feet away. MxSend takes the shortest path: Point A to Point B.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Select Files", desc: "Drag and drop anything. Gigabytes of video, dense codebases, or a single screenshot." },
                { step: "02", title: "Scan QR", desc: "Open the app on the receiving device. Scan the code to establish an encrypted WebSocket connection." },
                { step: "03", title: "Light Speed", desc: "Files transfer at the maximum bandwidth of your local network router. No ISP bottlenecks." }
              ].map((item, i) => (
                <motion.div 
                  key={item.step}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={FADE_UP}
                  transition={{ delay: i * 0.1 }}
                  className="relative p-8 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <div className="text-4xl font-mono font-bold text-white/10 group-hover:text-primary/20 transition-colors absolute top-6 right-8">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3 mt-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="py-32 max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={FADE_UP}
            className="mb-16"
          >
            <h2 className="text-4xl font-display font-bold mb-4">Engineered for efficiency</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">Built with Rust via Tauri, MxSend runs close to the metal. It uses negligible RAM and handles massive payloads without breaking a sweat.</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={STAGGER}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <FeatureCard 
              icon={<Wifi className="text-primary" />}
              title="Local Network Only"
              desc="Stays entirely on your LAN. No cloud, no data leaves your network. Total privacy by default."
            />
            <FeatureCard 
              icon={<QrCode className="text-secondary" />}
              title="QR Code Pairing"
              desc="Scan a QR code to connect two devices instantly. No typing IP addresses, no tedious setup."
            />
            <FeatureCard 
              icon={<Activity className="text-primary" />}
              title="Real-time Progress"
              desc="Live transfer progress updates via WebSocket connections. Watch every megabyte move."
            />
            <FeatureCard 
              icon={<Cpu className="text-secondary" />}
              title="High-Performance Backend"
              desc="Built with Rust via Tauri. Fast, efficient, and incredibly lightweight on system resources."
            />
            <FeatureCard 
              icon={<Monitor className="text-primary" />}
              title="Cross-Platform"
              desc="Works natively on Windows, macOS, Linux, Android, and iOS. True interoperability."
            />
            <FeatureCard 
              icon={<Github className="text-secondary" />}
              title="Open Source"
              desc="Built in the open on GitHub. Inspect the code, verify the security, or contribute."
            />
          </motion.div>
        </section>

        {/* PLATFORMS */}
        <section className="py-24 border-y border-white/5 bg-gradient-to-b from-transparent to-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-display font-bold mb-12"
            >
              Every Platform. One Protocol.
            </motion.h2>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={STAGGER}
              className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-60"
            >
              <PlatformIcon icon={<FaApple />} label="macOS / iOS" />
              <PlatformIcon icon={<FaWindows />} label="Windows" />
              <PlatformIcon icon={<FaLinux />} label="Linux" />
              <PlatformIcon icon={<FaAndroid />} label="Android" />
            </motion.div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={FADE_UP}
            >
              <FaRust className="w-12 h-12 mx-auto text-primary mb-8" />
              <h2 className="text-5xl font-display font-bold mb-6">Own your data.</h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Stop emailing files to yourself. Stop paying for cloud storage just to move a video to your phone. Experience native LAN speeds today.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/downloads"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md font-semibold text-lg hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]"
                >
                  Download MxSend
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-background py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Terminal className="w-5 h-5" />
            <span className="font-display font-bold tracking-wider text-foreground">MxSend</span>
          </div>
          <div className="text-sm text-muted-foreground font-mono">
            Open Source • Local Network Only
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/Maxessien/mx-send-tauri" target="_blank" rel="noreferrer" aria-label="MxSend on GitHub" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <motion.div variants={FADE_UP} className="p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
      <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function PlatformIcon({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex flex-col items-center gap-4 group">
      <div className="text-5xl text-muted-foreground group-hover:text-foreground transition-colors duration-300">
        {icon}
      </div>
      <span className="font-mono text-sm tracking-wider group-hover:text-primary transition-colors duration-300">
        {label}
      </span>
    </div>
  );
}
