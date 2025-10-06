import { useState, useEffect } from "react";
import Link from "next/link";
import { FaStar, FaCodeBranch, FaExternalLinkAlt } from "react-icons/fa";

// Tipo para os dados do repositório 
interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  topics: string[];
  html_url: string;
  updated_at: string;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
}

interface ProjetosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Hook para buscar todos os repositórios do GitHub
const useAllGitHubRepos = (username: string) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllRepos = async () => {
      try {
        let allRepos: GitHubRepo[] = [];
        let page = 1;
        const perPage = 100;

        while (true) {
          const response = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=${perPage}&page=${page}`
          );
          const data = await response.json();

          if (data.length === 0) break;

          // Filtra apenas repos públicos e não-fork
          const publicRepos = data.filter(
            (repo: GitHubRepo) => 
              !repo.name.includes(".github") && 
              !repo.full_name.includes(`${username}/${username}`)
          );

          allRepos = [...allRepos, ...publicRepos];
          page++;
        }

        setRepos(allRepos);
      } catch (error) {
        console.error("Erro ao buscar repositórios:", error);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchAllRepos();
    }
  }, [username]);

  return { repos, loading };
};

const ProjetosModal: React.FC<ProjetosModalProps> = ({ isOpen, onClose }) => {
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const { repos, loading } = useAllGitHubRepos("eugaelgomes");

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Extrai todas as tags únicas dos repositórios
  const allTags = Array.from(
    new Set(repos.flatMap(repo => repo.topics))
  ).sort();

  // Filtra repositórios por tag e termo de busca
  const filteredRepos = repos.filter(repo => {
    const matchesTag = selectedTag === "all" || repo.topics.includes(selectedTag);
    const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (repo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    return matchesTag && matchesSearch;
  });

  // Formatar data
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-900 border border-gray-700 rounded-lg max-w-[90vw] w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-light text-gray-100">
              <Link href="https://github.com/eugaelgomes" target="_blank" rel="noopener noreferrer">
                @eugaelgomes
              </Link>
            </h2>
            <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
              {filteredRepos.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Filtros */}
        <div className="p-4 border-b border-gray-700 space-y-3">
          {/* Busca */}
          <div>
            <input
              type="text"
              placeholder="Buscar por nome ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag("all")}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedTag === "all"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Todos ({repos.length})
            </button>
            {allTags.map(tag => {
              const count = repos.filter(repo => repo.topics.includes(tag)).length;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedTag === tag
                      ? "bg-purple-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {tag} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Lista de repositórios */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-lg p-4 animate-pulse">
                  <div className="h-4 bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-3/4 mb-3"></div>
                  <div className="flex gap-2">
                    <div className="h-2 bg-gray-700 rounded w-16"></div>
                    <div className="h-2 bg-gray-700 rounded w-12"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRepos.map(repo => (
                <div key={repo.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors border border-gray-700">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-medium text-purple-400 truncate">
                      {repo.name.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                    </h3>
                    <Link
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      <FaExternalLinkAlt size={16} />
                    </Link>
                  </div>

                  <p className="text-gray-300 text-sm mb-3 leading-tight">
                    {repo.description || "Sem descrição disponível"}
                  </p>

                  {/* Estatísticas */}
                  <div className="flex items-center gap-4 mb-3 text-xs text-gray-400">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <FaStar size={10} />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCodeBranch size={10} />
                      {repo.forks_count}
                    </span>
                  </div>

                  {/* Tags */}
                  {repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {repo.topics.slice(0, 5).map(topic => (
                        <span
                          key={topic}
                          className="bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                      {repo.topics.length > 5 && (
                        <span className="text-gray-400 text-xs">
                          +{repo.topics.length - 5}
                        </span>
                      )}
                    </div>
                  )}

                  <p className="text-xs text-gray-500">
                    Atualizado em {formatDate(repo.updated_at)}
                  </p>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredRepos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">Nenhum repositório encontrado com os filtros aplicados.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjetosModal;
