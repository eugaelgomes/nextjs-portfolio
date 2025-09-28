"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa6";
import { FaProjectDiagram } from "react-icons/fa";

// Tipos para as stats do GitHub
interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  topics: string[];
  html_url: string;
  updated_at: string;
}

// Hook para buscar repositórios do GitHub
const useGitHubRepos = (username: string) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
        );
        const data = await response.json();

        // Filtra apenas repos públicos e com descrição
        const filteredRepos = data
          .filter(
            (repo: GitHubRepo) =>
              !repo.name.includes(".github") && repo.description
          ); // Remove slice - mostra todos

        setRepos(filteredRepos);
      } catch (error) {
        console.error("Erro ao buscar repositórios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  return { repos, loading };
};

// Hook para buscar stats do GitHub
const useGitHubStats = (username: string) => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [languages, setLanguages] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Busca dados do usuário
        const userResponse = await fetch(
          `https://api.github.com/users/${username}`
        );
        const userData = await userResponse.json();
        setStats(userData);

        // Busca repositórios para calcular linguagens
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`
        );
        const reposData = await reposResponse.json();

        // Conta linguagens mais usadas
        const langCount: { [key: string]: number } = {};
        reposData.forEach((repo: GitHubRepo) => {
          if (repo.language) {
            langCount[repo.language] = (langCount[repo.language] || 0) + 1;
          }
        });

        setLanguages(langCount);
      } catch (error) {
        console.error("Erro ao buscar stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [username]);

  return { stats, languages, loading };
};

export default function Home() {
  // Busca os repositórios do GitHub
  const { repos, loading } = useGitHubRepos("eugaelgomes");
  // Busca as stats do GitHub
  const {
    stats,
    languages,
    loading: statsLoading,
  } = useGitHubStats("eugaelgomes");
  const year = new Date().getFullYear();

  // Calcula idade de forma simples
  const calculateAge = () => {
    const today = new Date();
    const birthDate = new Date(2003, 11, 5); // Dezembro é mês 11 (0-indexed)
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <div className="md:h-screen lg:h-screen bg-white overflow-hidden flex flex-col lg:flex-row">
      {/* Left Side - Main Content */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 lg:px-12 py-4 lg:py-0">
        <div className="max-w-xl">
          {/* Profile Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <Image
                src="/profile_picture-gael_gomes.webp"
                alt="Gael Gomes"
                width={100}
                height={100}
                className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full object-cover outline-2 outline-purple-400"
                priority
              />
            </div>

            {/* Name and Title */}
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-black mb-1">
                Gael Gomes
              </h1>
              <h2 className="text-sm sm:text-base lg:text-lg text-slate-900 font-mono">
                Desenvolvedor Full Stack, {calculateAge()} anos
              </h2>
            </div>
          </div>

          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-5 leading-relaxed">
            Especialista em criar soluções digitais elegantes e funcionais.
            Transformo ideias complexas em interfaces simples e intuitivas.
          </p>

          {/* Contact Links */}
          <div className="flex gap-3 sm:gap-4 flex-wrap mb-4 sm:mb-5">
            <Link
              href="mailto:hello@gaelgomes.dev"
              className="text-slate-900 hover:text-black transition-colors border-b border-slate-900 hover:border-black text-xs sm:text-sm flex items-center"
            >
              <MdEmail className="inline-block mr-1 text-sm" />
              Email
            </Link>
            <Link
              href="https://github.com/eugaelgomes"
              className="text-slate-900 hover:text-black transition-colors border-b border-slate-900 hover:border-black text-xs sm:text-sm flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="inline-block mr-1 text-sm" />
              GitHub
            </Link>
            <Link
              href="https://linkedin.com/in/gael-rene-gomes/"
              className="text-slate-900 hover:text-black transition-colors border-b border-slate-900 hover:border-black text-xs sm:text-sm flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="inline-block mr-1 text-sm" />
              LinkedIn
            </Link>
            <Link
              href="https://drive.google.com/drive/folders/18-vSkqabL7tgtjnjxL2HhBNQ1hSUngbK?usp=sharing"
              className="text-slate-900 hover:text-black transition-colors border-b border-slate-900 hover:border-black text-xs sm:text-sm flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFilePdf className="inline-block mr-1 text-sm" />
              Currículo
            </Link>
            <Link
              href="https://gaelgomes.dev/projetos"
              className="text-slate-900 hover:text-black transition-colors border-b border-slate-900 hover:border-black text-xs sm:text-sm flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaProjectDiagram className="inline-block mr-1 text-sm" />
              Meus Projetos
            </Link>
          </div>

          {/* Education Section */}
          <div className="mb-4 sm:mb-5">
            <h3 className="text-base sm:text-lg font-light text-black mb-2 sm:mb-3">
              Formação
            </h3>
            <div className="space-y-1.5 sm:space-y-2">
              <div className="border-l-2 border-slate-200 pl-2 sm:pl-3">
                <h4 className="text-slate-900 font-semibold text-xs">
                  Engenharia de Software
                </h4>
                <p className="text-gray-600 text-xs">FBV • 2024 - 2028</p>
              </div>
              <div className="border-l-2 border-slate-200 pl-2 sm:pl-3">
                <h4 className="text-slate-900 font-semibold text-xs">
                  Técnico em Desenvolvimento de Sistemas
                </h4>
                <p className="text-gray-600 text-xs">
                  Escola Técnico Advogado Gil Rodrigues • 2020 - 2022
                </p>
              </div>
            </div>
          </div>

          {/* GitHub Stats */}
          <div className="mt-4 sm:mt-5">
            <h3 className="text-base sm:text-lg font-light text-black mb-3 sm:mb-4">
              GitHub Stats
            </h3>

            {statsLoading ? (
              // Loading placeholder
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="text-center">
                    <div className="h-5 bg-gray-200 rounded mb-1 animate-pulse"></div>
                    <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            ) : stats ? (
              <>
                {/* Stats Numbers */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                  <div className="text-center">
                    <div className="text-base sm:text-lg lg:text-xl font-light text-black">
                      {stats.public_repos}
                    </div>
                    <div className="text-xs text-slate-900 font-mono">
                      Repos
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-base sm:text-lg lg:text-xl font-light text-black">
                      {stats.followers}
                    </div>
                    <div className="text-xs text-slate-900 font-mono">
                      Seguidores
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-base sm:text-lg lg:text-xl font-light text-black">
                      {Object.keys(languages).length}
                    </div>
                    <div className="text-xs text-slate-900 font-mono">
                      Linguagens
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-base sm:text-lg lg:text-xl font-light text-black">
                      {stats.following}
                    </div>
                    <div className="text-xs text-slate-900 font-mono">
                      Seguindo
                    </div>
                  </div>
                </div>

                {/* Top Languages */}
                {Object.keys(languages).length > 0 && (
                  <div>
                    <h4 className="text-xs sm:text-sm font-light text-black mb-2">
                      Top Linguagens
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(languages)
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 3)
                        .map(([lang, count]) => (
                          <span
                            key={lang}
                            className="bg-purple-400 text-slate-900 text-xs font-semibold px-2 py-0.5 rounded-full font-mono"
                          >
                            {lang} ({count})
                          </span>
                        ))}
                    </div>
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>

      {/* Right Side - Skills & Projects */}
      <div className="flex-1 bg-black text-white flex flex-col justify-center px-4 sm:px-8 lg:px-12 py-4 lg:py-0">
        <div className="max-w-lg">
          {/* Skills */}
          <div className="mb-8 lg:mb-10">
            <h3 className="text-lg text-purple-500 sm:text-xl font-light mb-4 sm:mb-6">
              Tecnologias
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                <span className="font-mono text-slate-400 text-xs sm:text-sm">
                  Frontend
                </span>
                <span className="text-white text-xs sm:text-sm">
                  React / Next.js / TypeScript
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                <span className="font-mono text-slate-400 text-xs sm:text-sm">
                  Backend
                </span>
                <span className="text-white text-xs sm:text-sm">
                  Node.js / Python / APIs
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                <span className="font-mono text-slate-400 text-xs sm:text-sm">
                  Database
                </span>
                <span className="text-white text-xs sm:text-sm">
                  PostgreSQL / MongoDB
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                <span className="font-mono text-slate-400 text-xs sm:text-sm">
                  Cloud
                </span>
                <span className="text-white text-xs sm:text-sm">
                  AWS / Vercel / Docker
                </span>
              </div>
            </div>
          </div>

          {/* Selected Projects */}
          <div className="relative">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg text-purple-500 sm:text-xl font-light">
                Do meu Github
              </h3>
              {/* Scroll indicator - only visible on desktop */}
              <div className="hidden lg:flex items-center text-slate-600 text-xs">
                <span className="mr-1">Dê scroll para ver tudo</span>
                <div className="w-3 h-3 border border-slate-500 rounded-sm flex items-center justify-center">
                  <div className="w-1 h-1 bg-slate-500 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
            
            {/* Scrollable container */}
            <div className="lg:max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900 space-y-3 sm:space-y-4 pr-2">
              {loading ? (
                // Loading placeholder
                <>
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="border-l-2 border-slate-900 pl-2 sm:pl-3"
                    >
                      <div className="h-3 bg-slate-800 rounded mb-1 animate-pulse"></div>
                      <div className="h-2 bg-slate-800 rounded w-3/4 animate-pulse"></div>
                    </div>
                  ))}
                </>
              ) : (
                repos.map((repo) => (
                  <Link
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border-l-2 border-slate-900 hover:border-slate-700 pl-2 sm:pl-3 transition-colors group"
                  >
                    <h4 className="text-rose-700 group-hover:text-rose-300 font-medium text-xs sm:text-sm transition-colors">
                      {repo.name
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </h4>
                    <p className="text-slate-400 text-xs mb-1">
                      {repo.description
                        ? repo.description.length > 150
                          ? repo.description.substring(0, 150) + "..."
                          : repo.description
                        : "Projeto em desenvolvimento"}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {repo.language && (
                        <>
                          <span className="text-slate-500 text-xs">Lang:</span>
                          <span className="text-slate-500 text-xs">
                            {repo.language}
                          </span>
                        </>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {repo.topics.length > 0 && (
                        <>
                          <span className="text-slate-500 text-xs">Tags:</span>
                          <span className="text-slate-500 text-xs">
                            {repo.topics.join(" • ")}
                          </span>
                        </>
                      )}
                    </div>
                  </Link>
                ))
              )}
            </div>
            
            {/* Bottom fade indicator */}
            <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
          </div>

          {/* Footer */}
          <div className="mt-8 sm:mt-10">
            <p className="text-slate-400 text-xs font-mono">
              © {year} Gael Gomes — Disponível para novos projetos e freelancer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
