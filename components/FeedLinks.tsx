import Link from "next/link";
import { FaRss } from "react-icons/fa";

interface FeedLinksProps {
  className?: string;
}

export default function FeedLinks({ className = "" }: FeedLinksProps) {
  return (
    <div className={`flex gap-3 items-center ${className}`}>
      <Link
        href="/rss.xml"
        className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-800 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="RSS Feed"
      >
        <FaRss className="text-xs" />
        RSS
      </Link>
      
      <Link
        href="/feed.json"
        className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-800 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="JSON Feed"
      >
        <span className="text-xs font-mono">JSON</span>
      </Link>
      
      <Link
        href="/sitemap.xml"
        className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-800 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Sitemap"
      >
        <span className="text-xs font-mono">Sitemap</span>
      </Link>
    </div>
  )
}