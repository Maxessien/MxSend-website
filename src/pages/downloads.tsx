import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  Download,
  Tag,
  Calendar,
  AlertCircle,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { FaWindows, FaApple, FaLinux, FaAndroid } from 'react-icons/fa';
import Navbar from '@/components/navbar';

// ─── Types ────────────────────────────────────────────────────────────────────

interface GitHubAsset {
  id: number;
  name: string;
  size: number;
  browser_download_url: string;
  download_count: number;
}

interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string;
  prerelease: boolean;
  published_at: string;
  body: string;
  html_url: string;
  assets: GitHubAsset[];
}

// ─── Platform detection ───────────────────────────────────────────────────────

type Platform = 'windows' | 'macos' | 'linux' | 'android';

interface PlatformGroup {
  platform: Platform;
  label: string;
  assets: GitHubAsset[];
}

const PLATFORM_ORDER: Platform[] = ['windows', 'macos', 'linux', 'android'];

const PLATFORM_META: Record<
  Platform,
  { label: string; Icon: React.ComponentType<{ className?: string }>; formats: string[] }
> = {
  windows: {
    label: 'Windows',
    Icon: ({ className }) => <FaWindows className={className} />,
    formats: ['.exe', '.msi'],
  },
  macos: {
    label: 'macOS',
    Icon: ({ className }) => <FaApple className={className} />,
    formats: ['.dmg', '.app.tar.gz'],
  },
  linux: {
    label: 'Linux',
    Icon: ({ className }) => <FaLinux className={className} />,
    formats: ['.deb', '.rpm', '.appimage'],
  },
  android: {
    label: 'Android',
    Icon: ({ className }) => <FaAndroid className={className} />,
    formats: ['.apk'],
  },
};

function detectPlatform(name: string): Platform | null {
  const lower = name.toLowerCase();
  if (lower.endsWith('.exe') || lower.endsWith('.msi')) return 'windows';
  if (lower.endsWith('.dmg') || lower.includes('.app.tar.gz')) return 'macos';
  if (lower.endsWith('.deb') || lower.endsWith('.rpm') || lower.endsWith('.appimage')) return 'linux';
  if (lower.endsWith('.apk')) return 'android';
  return null;
}

function groupAssetsByPlatform(assets: GitHubAsset[]): PlatformGroup[] {
  const map: Record<Platform, GitHubAsset[]> = {
    windows: [],
    macos: [],
    linux: [],
    android: [],
  };
  for (const asset of assets) {
    const p = detectPlatform(asset.name);
    if (p) map[p].push(asset);
  }
  return PLATFORM_ORDER
    .filter((p) => map[p].length > 0)
    .map((p) => ({ platform: p, label: PLATFORM_META[p].label, assets: map[p] }));
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  const mb = bytes / 1024 / 1024;
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Strip the extension label from the filename for a cleaner button label */
function assetLabel(name: string): string {
  // e.g. "MxSend_0.1.7_amd64.AppImage" → ".AppImage"
  const ext = name.match(/(\.[a-zA-Z.]+)$/)?.[1] ?? name;
  // Normalise casing
  const map: Record<string, string> = {
    '.exe': 'Setup (.exe)',
    '.msi': 'Installer (.msi)',
    '.dmg': 'Disk Image (.dmg)',
    '.app.tar.gz': 'App Bundle (.tar.gz)',
    '.deb': 'Debian Package (.deb)',
    '.rpm': 'RPM Package (.rpm)',
    '.appimage': 'AppImage',
    '.apk': 'Android APK',
  };
  return map[ext.toLowerCase()] ?? ext;
}

// ─── Fetcher ──────────────────────────────────────────────────────────────────

async function fetchReleases(): Promise<GitHubRelease[]> {
  const res = await fetch(
    'https://api.github.com/repos/Maxessien/mx-send-tauri/releases',
    { headers: { Accept: 'application/vnd.github+json' } },
  );
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const FADE_UP = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07 },
  }),
};

function PlatformSection({ group }: { group: PlatformGroup }) {
  const meta = PLATFORM_META[group.platform];
  const { Icon } = meta;

  return (
    <div className="mb-4 last:mb-0">
      {/* Platform header */}
      <div className="flex items-center gap-2 mb-3">
        <Icon className="text-muted-foreground w-4 h-4" />
        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-widest font-mono">
          {meta.label}
        </span>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      {/* Asset buttons */}
      <div className="flex flex-wrap gap-3">
        {group.assets.map((asset) => (
          <a
            key={asset.id}
            href={asset.browser_download_url}
            className="group inline-flex items-center gap-2 bg-white/[0.03] hover:bg-white/[0.07] border border-white/8 hover:border-primary/40 rounded-lg px-4 py-2.5 transition-all duration-200"
          >
            <Download className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">{assetLabel(asset.name)}</span>
            <span className="text-xs text-muted-foreground font-mono">
              {formatBytes(asset.size)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function ReleaseCard({
  release,
  index,
  isLatest,
}: {
  release: GitHubRelease;
  index: number;
  isLatest: boolean;
}) {
  const groups = groupAssetsByPlatform(release.assets);

  return (
    <motion.div
      custom={index}
      variants={FADE_UP}
      initial="hidden"
      animate="visible"
      className="rounded-2xl border border-white/8 bg-white/[0.015] overflow-hidden"
    >
      {/* Release header */}
      <div className="px-6 py-5 border-b border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-primary" />
            <span className="font-display font-bold text-lg tracking-wide">
              {release.tag_name}
            </span>
          </div>
          {isLatest && (
            <span className="inline-flex items-center gap-1 bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full tracking-wider">
              LATEST
            </span>
          )}
          {release.prerelease && (
            <span className="inline-flex items-center gap-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full tracking-wider">
              PRE-RELEASE
            </span>
          )}
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(release.published_at)}
          </span>
          <a
            href={release.html_url}
            target="_blank"
            rel="noreferrer"
            aria-label={`View ${release.tag_name} on GitHub`}
            className="flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            GitHub
          </a>
        </div>
      </div>

      {/* Platform sections */}
      {groups.length > 0 ? (
        <div className="px-6 py-5 space-y-5">
          {groups.map((g) => (
            <PlatformSection key={g.platform} group={g} />
          ))}
        </div>
      ) : (
        <div className="px-6 py-8 text-center text-sm text-muted-foreground">
          No downloadable assets for this release.
        </div>
      )}
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Downloads() {
  const { data: releases, isLoading, isError, error } = useQuery<GitHubRelease[]>({
    queryKey: ['github-releases'],
    queryFn: fetchReleases,
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-28 pb-24">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono text-primary tracking-widest">ALL RELEASES</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-4">
            Download MxSend
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
            Choose your platform below. All releases are built and signed via GitHub Actions
            and available directly from the repository.
          </p>
        </motion.div>

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="font-mono text-sm">Fetching releases from GitHub...</span>
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="flex items-start gap-4 rounded-xl border border-red-500/20 bg-red-500/5 px-6 py-5">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm mb-1">Failed to load releases</p>
              <p className="text-sm text-muted-foreground">
                {error instanceof Error ? error.message : 'Could not reach the GitHub API.'}
              </p>
              <a
                href="https://github.com/Maxessien/mx-send-tauri/releases"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-sm text-primary hover:underline"
              >
                View releases on GitHub
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* Releases list */}
        {releases && (
          <div className="space-y-6">
            {releases.map((release, i) => (
              <ReleaseCard
                key={release.id}
                release={release}
                index={i}
                isLatest={i === 0 && !release.prerelease}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
