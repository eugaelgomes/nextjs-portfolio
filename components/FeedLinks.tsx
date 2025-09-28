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
        className="flex items-center gap-1 text-xs text-gray-400 hover:text-purple-400 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="RSS Feed dos meus repositórios"
        title="Feed RSS com meus projetos do GitHub"
      >
        <FaRss className="text-xs" />
        RSS
      </Link>
      
      <Link
        href="/feed.json"
        className="flex items-center gap-1 text-xs text-gray-400 hover:text-purple-400 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="JSON Feed dos meus repositórios"
        title="Feed JSON com meus projetos do GitHub"
      >
        <span className="text-xs font-mono">JSON</span>
      </Link>
      
      <Link
        href="/sitemap.xml"
        className="flex items-center gap-1 text-xs text-gray-400 hover:text-purple-400 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Sitemap do site"
        title="Sitemap com todas as URLs do site"
      >
        <span className="text-xs font-mono">Sitemap</span>
      </Link>
    </div>
  )
}