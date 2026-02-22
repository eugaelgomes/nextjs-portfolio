"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import {
  FaLinkedinIn,
  FaProjectDiagram,
  FaGithub,
  FaDatabase,
  FaCloud,
} from "react-icons/fa";
import { FaFilePdf, FaMobileScreen, FaServer } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

import ProjetosModal from "./modals/projects";
import FeedLinks from "../components/FeedLinks";

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
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
        );
        const data = await response.json();

        // Filtra apenas repos públicos e com descrição
        const filteredRepos = data.filter(
          (repo: GitHubRepo) =>
            !repo.name.includes(".github") && repo.description,
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
          `https://api.github.com/users/${username}`,
        );
        const userData = await userResponse.json();
        setStats(userData);

        // Busca repositórios para calcular linguagens
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`,
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

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
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
    <div className="min-h-screen lg:h-screen bg-white dark:bg-gray-900 overflow-hidden flex flex-col lg:flex-row relative">
      {/* Left Side - Main Content */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 xl:px-12 py-4 lg:py-6 relative z-10">
        <div className="max-w-xl">
          {/* Profile Section */}
          <div className="flex flex-row items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <Image
                src="/profile_picture-gael_gomes.webp"
                alt="Gael Gomes"
                width={100}
                height={100}
                className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-lg object-cover outline-2 outline-purple-600"
                priority
              />
            </div>

            {/* Name and Title */}
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-900 dark:text-gray-100 mb-1">
                Gael Gomes
              </h1>
              <h2 className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-300 font-mono">
                Estudante Eng. de Software, {calculateAge()} anos
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-justify text-gray-700 dark:text-gray-200 mb-3 sm:mb-4 leading-relaxed">
            Curioso, tento ser autodidata e movido a café e código ☕💻.
            Graduando em Engenharia de Software, Analista de Prompt/CS em uma HR
            Tech e estudos com foco em desenvolvimento full-stack e IA. Tô
            sempre criando, reciclando e fazendo novos projetos devs com viés de
            aprendizado. Colocando em prática, ou, aprendendo com a prática as
            stacks e ferramentas.
          </p>

          {/* Contact Links */}
          <div className="flex gap-2 sm:gap-3 flex-wrap mb-3 sm:mb-4">
            <Link
              href="mailto:hello@gaelgomes.dev"
              className="text-gray-600 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors border-b border-gray-400 dark:border-gray-600 hover:border-purple-600 dark:hover:border-purple-400 text-xs flex items-center"
            >
              <MdEmail className="inline-block mr-1 text-sm" />
              Email
            </Link>
            <Link
              href="https://github.com/eugaelgomes"
              className="text-gray-600 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors border-b border-gray-400 dark:border-gray-600 hover:border-purple-600 dark:hover:border-purple-400 text-xs flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="inline-block mr-1 text-sm" />
              GitHub
            </Link>
            <Link
              href="https://linkedin.com/in/gael-rene-gomes/"
              className="text-gray-600 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors border-b border-gray-400 dark:border-gray-600 hover:border-purple-600 dark:hover:border-purple-400 text-xs flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="inline-block mr-1 text-sm" />
              LinkedIn
            </Link>
            <Link
              href="https://drive.google.com/drive/folders/18-vSkqabL7tgtjnjxL2HhBNQ1hSUngbK?usp=sharing"
              className="text-gray-600 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors border-b border-gray-400 dark:border-gray-600 hover:border-purple-600 dark:hover:border-purple-400 text-xs flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFilePdf className="inline-block mr-1 text-sm" />
              Currículo
            </Link>
            <button
              onClick={() => setModalOpen(true)}
              className="text-gray-600 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors border-b border-gray-400 dark:border-gray-600 hover:border-purple-600 dark:hover:border-purple-400 text-xs flex items-center"
              title="Abrir modal com meus projetos"
            >
              <FaProjectDiagram className="inline-block mr-1 text-sm" />
              Meus Projetos
            </button>
          </div>

          {/* Education Section */}
          <div className="mb-3 sm:mb-4">
            <h3 className="text-sm sm:text-base font-light text-purple-600 dark:text-purple-400 mb-2">
              Formação
            </h3>
            <div className="space-y-1 sm:space-y-1.5">
              <div className="border-l-2 border-purple-500 pl-2">
                <h4 className="text-gray-800 dark:text-gray-200 font-semibold text-xs">
                  Engenharia de Software
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-xs">
                  FBV • 2024 - 2028 | {"cursando"}
                </p>
              </div>
              <div className="border-l-2 border-purple-500 pl-2">
                <h4 className="text-gray-800 dark:text-gray-200 font-semibold text-xs">
                  Técnico em Desenvolvimento de Sistemas
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-xs">
                  Escola Técnico Advogado Gil Rodrigues • 2020 - 2022
                </p>
              </div>
            </div>
          </div>

          {/* GitHub Stats */}
          <div className="mt-3 sm:mt-4">
            <h3 className="text-sm sm:text-base font-light text-purple-600 dark:text-purple-400 mb-2">
              GitHub Stats
            </h3>

            {statsLoading ? (
              // Loading placeholder
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="text-center">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-1 animate-pulse"></div>
                    <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            ) : stats ? (
              <>
                {/* Stats Numbers */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-3">
                  <div className="text-center bg-gray-100/80 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg p-1.5 border border-gray-200 dark:border-gray-500">
                    <div className="text-sm sm:text-base lg:text-lg font-light text-gray-800 dark:text-gray-200">
                      {stats.public_repos}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 font-mono">
                      Repositórios
                    </div>
                  </div>
                  <div className="text-center bg-gray-100/80 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg p-1.5 border border-gray-200 dark:border-gray-500">
                    <div className="text-sm sm:text-base lg:text-lg font-light text-gray-800 dark:text-gray-200">
                      {stats.followers}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 font-mono">
                      Seguidores
                    </div>
                  </div>
                  <div className="text-center bg-gray-100/80 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg p-1.5 border border-gray-200 dark:border-gray-500">
                    <div className="text-sm sm:text-base lg:text-lg font-light text-gray-800 dark:text-gray-200">
                      {Object.keys(languages).length}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 font-mono">
                      Linguagens
                    </div>
                  </div>
                  <div className="text-center bg-gray-100/80 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg p-1.5 border border-gray-200 dark:border-gray-500">
                    <div className="text-sm sm:text-base lg:text-lg font-light text-gray-800 dark:text-gray-200">
                      {stats.following}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 font-mono">
                      Seguindo
                    </div>
                  </div>
                </div>

                {/* Top Languages */}
                {Object.keys(languages).length > 0 && (
                  <div>
                    <h3 className="text-sm sm:text-base font-light text-purple-600 dark:text-purple-400 mb-1.5">
                      Top Linguagens
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(languages)
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 3)
                        .map(([lang, count]) => (
                          <span
                            key={lang}
                            className="bg-gray-200/80 dark:bg-gray-900/50 backdrop-blur-sm text-gray-800 dark:text-white text-xs font-semibold px-2 py-0.5 rounded-full font-mono shadow-sm"
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
      <div className="flex-1 bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white flex flex-col justify-center px-4 sm:px-6 lg:px-8 xl:px-12 py-4 lg:py-6 relative z-10">
        <div className="max-w-lg h-full flex flex-col">
          {/* Skills */}
          <div className="mb-6 lg:mb-8">
            <h3 className="text-base text-purple-600 dark:text-purple-400 sm:text-lg font-light mb-2 sm:mb-3">
              Stacks
            </h3>
            <div className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 p-1.5 rounded-lg bg-gray-900/5 dark:bg-white/5 backdrop-blur-sm border border-gray-300/50 dark:border-slate-700/50">
                <span className="flex items-center font-mono text-gray-600 dark:text-gray-400 text-xs">
                  <FaMobileScreen className="inline-block mr-1" />
                  Frontend
                </span>
                <span className="text-gray-900 dark:text-white text-xs">
                  React • Next.js • Vite.js • Vue • Tailwind CSS
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 p-1.5 rounded-lg bg-gray-900/5 dark:bg-white/5 backdrop-blur-sm border border-gray-300/50 dark:border-slate-700/50">
                <span className="flex items-center font-mono text-gray-600 dark:text-gray-400 text-xs">
                  <FaServer className="inline-block mr-1" />
                  Backend
                </span>
                <span className="text-gray-900 dark:text-white text-xs">
                  Node.js • Python • Typescript • Javascript • Express
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 p-1.5 rounded-lg bg-gray-900/5 dark:bg-white/5 backdrop-blur-sm border border-gray-300/50 dark:border-slate-700/50">
                <span className="flex items-center font-mono text-gray-600 dark:text-gray-400 text-xs">
                  <FaDatabase className="inline-block mr-1" />
                  Database
                </span>
                <span className="text-gray-900 dark:text-white text-xs">
                  PostgreSQL • MySQL
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 p-1.5 rounded-lg bg-gray-900/5 dark:bg-white/5 backdrop-blur-sm border border-gray-300/50 dark:border-slate-700/50">
                <span className="flex items-center font-mono text-gray-600 dark:text-gray-400 text-xs">
                  <FaCloud className="inline-block mr-1" />
                  Cloud
                </span>
                <span className="text-gray-900 dark:text-white text-xs">
                  Digital Ocean • Vercel • Docker • Render • Containers • VMs
                </span>
              </div>
            </div>
          </div>

          {/* Selected Projects */}
          <div className="relative flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <h3 className="text-base text-purple-600 dark:text-purple-400 sm:text-lg font-light">
                Repositórios / Projetos Públicos
              </h3>
              {/* Scroll indicator - only visible on desktop */}
              <div className="hidden lg:flex items-center text-gray-600 dark:text-slate-400 text-xs">
                <span className="mr-1">Dê scroll para ver tudo</span>
                <div className="w-3 h-3 border border-gray-500 dark:border-slate-500 rounded-sm flex items-center justify-center">
                  <div className="w-1 h-1 bg-purple-600 dark:bg-purple-400 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>

            {/* Scrollable container */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-slate-600 scrollbar-track-gray-200 dark:scrollbar-track-slate-800 space-y-2 pr-2">
              {loading ? (
                // Loading placeholder
                <>
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="border-l-2 border-gray-300 dark:border-slate-700 pl-2 p-1.5 rounded-lg bg-gray-900/5 dark:bg-white/5 backdrop-blur-sm"
                    >
                      <div className="h-3 bg-gray-300 dark:bg-slate-700 rounded mb-1 animate-pulse"></div>
                      <div className="h-2 bg-gray-300 dark:bg-slate-700 rounded w-3/4 animate-pulse"></div>
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
                    className="block border-l-2 border-gray-300 dark:border-slate-700 hover:border-purple-600 dark:hover:border-purple-400 pl-2 p-1.5 rounded-lg bg-gray-900/5 dark:bg-white/5 backdrop-blur-sm hover:bg-gray-900/10 dark:hover:bg-white/10 transition-all group"
                  >
                    <h4 className="text-rose-600 dark:text-rose-400 group-hover:text-rose-500 dark:group-hover:text-rose-300 font-medium text-xs transition-colors">
                      {repo.name
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mb-1 leading-tight">
                      {repo.description
                        ? repo.description.length > 120
                          ? repo.description.substring(0, 120) + "..."
                          : repo.description
                        : "Projeto em desenvolvimento"}
                    </p>
                    <div className="flex flex-wrap gap-1 text-xs">
                      {repo.language && (
                        <>
                          <span className="text-gray-600 dark:text-slate-400">
                            Lang:
                          </span>
                          <span className="text-gray-600 dark:text-slate-400">
                            {repo.language}
                          </span>
                        </>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1 text-xs">
                      {repo.topics.length > 0 && (
                        <>
                          <span className="text-gray-600 dark:text-slate-400">
                            Tags:
                          </span>
                          <span className="text-gray-600 dark:text-slate-400">
                            {repo.topics.slice(0, 3).join(" • ")}
                          </span>
                        </>
                      )}
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 sm:mt-6 flex-shrink-0">
            <div className="flex gap-50 sm:gap-8 items-center">
              <FeedLinks className="justify-start" />
              <p className="text-gray-600 dark:text-slate-400 text-xs font-mono">
                © {year} Gael Gomes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Projetos */}
      {modalOpen && (
        <ProjetosModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
};

export default Home;
