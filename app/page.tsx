"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import {
  FaLinkedinIn,
  FaProjectDiagram,
  FaGithub,
} from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

import ProjetosModal from "./modals/projects";



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



const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  // Busca os repositórios do GitHub
  const { repos, loading } = useGitHubRepos("eugaelgomes");


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
    <div className="min-h-screen lg:h-screen bg-white overflow-x-hidden overflow-y-auto lg:overflow-hidden flex flex-col lg:flex-row relative">
      {/* Left Side - Main Content */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24 py-4 lg:py-6 relative z-10">
        <div className="max-w-xl xl:max-w-2xl 2xl:max-w-3xl">
          {/* Profile Section */}
          <div className="flex flex-row items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <Image
                src="/profile_picture-gael_gomes.webp"
                alt="Gael Gomes"
                width={100}
                height={100}
                className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 xl:w-22 xl:h-22 2xl:w-24 2xl:h-24 rounded-lg object-cover outline-2 outline-purple-600"
                priority
              />
            </div>

            {/* Name and Title */}
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-3xl 2xl:text-4xl font-light text-gray-900 dark:text-gray-100 mb-1">
                Gael Gomes
              </h1>
              <h2 className="text-xs sm:text-sm lg:text-base xl:text-base 2xl:text-lg text-gray-600 dark:text-gray-300 font-mono">
                Estudante Eng. de Software, {calculateAge()} anos
              </h2>
            </div>
          </div>

          <div className="text-xs sm:text-sm xl:text-sm 2xl:text-base text-justify text-gray-700 dark:text-gray-200 mb-3 sm:mb-4 xl:mb-5 leading-relaxed space-y-2">
            <p>
              Estudante de Engenharia de Software na FBV Wyden e Técnico em
              Desenvolvimento de Sistemas. Atualmente, atuo como Analista de
              Prompt de IA e Dados na @Recrut.AI, desenvolvendo agentes de IA
              para automatizar processos de recrutamento e seleção.
            </p>
            <p>
              Criando a Weave, uma plataforma inteligente de gestão de projetos e
              antecipação de riscos que integra metodologias ágeis com IA
              proativa.
            </p>
          </div>

          {/* Contact Links */}
          <div className="flex gap-2 sm:gap-3 xl:gap-3 flex-wrap mb-3 sm:mb-4 xl:mb-5">
            <Link
              href="mailto:hello@gaelgomes.dev"
              className="text-gray-600 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors border-b border-gray-400 dark:border-gray-600 hover:border-purple-600 dark:hover:border-purple-400 text-xs flex items-center"
            >
              <MdEmail className="inline-block mr-1 text-sm xl:text-base" />
              Email
            </Link>
            <Link
              href="https://github.com/eugaelgomes"
              className="text-gray-600 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors border-b border-gray-400 dark:border-gray-600 hover:border-purple-600 dark:hover:border-purple-400 text-xs xl:text-sm flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="inline-block mr-1 text-sm xl:text-base" />
              GitHub
            </Link>
            <Link
              href="https://linkedin.com/in/gael-rene-gomes/"
              className="text-gray-600 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors border-b border-gray-400 dark:border-gray-600 hover:border-purple-600 dark:hover:border-purple-400 text-xs xl:text-sm flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="inline-block mr-1 text-sm xl:text-base" />
              LinkedIn
            </Link>
            <a
              href="/cv_gael-rene-gomes-silva.pdf"
              download="cv_gael-rene-gomes-silva.pdf"
              className="text-gray-600 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors border-b border-gray-400 dark:border-gray-600 hover:border-purple-600 dark:hover:border-purple-400 text-xs xl:text-sm flex items-center"
            >
              <FaFilePdf className="inline-block mr-1 text-sm xl:text-base" />
              Currículo
            </a>
            <button
              onClick={() => setModalOpen(true)}
              className="text-gray-600 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors border-b border-gray-400 dark:border-gray-600 hover:border-purple-600 dark:hover:border-purple-400 text-xs xl:text-sm flex items-center"
              title="Abrir modal com meus projetos"
            >
              <FaProjectDiagram className="inline-block mr-1 text-sm xl:text-base" />
              Meus Projetos
            </button>
          </div>

          {/* Education Section */}
          <div className="mb-3 sm:mb-4">
            <h3 className="text-sm sm:text-base xl:text-base 2xl:text-lg font-light text-purple-600 dark:text-purple-400 mb-2">
              Formação
            </h3>
            <div className="space-y-1 sm:space-y-1.5">
              <div className="border-l-2 border-purple-500 pl-2">
                <h4 className="text-gray-800 dark:text-gray-200 font-semibold text-xs xl:text-sm">
                  Engenharia de Software
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-xs xl:text-sm">
                  FBV • 2024 - 2028 | {"cursando"}
                </p>
              </div>
              <div className="border-l-2 border-purple-500 pl-2">
                <h4 className="text-gray-800 dark:text-gray-200 font-semibold text-xs xl:text-sm">
                  Técnico em Desenvolvimento de Sistemas
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-xs xl:text-sm">
                  Escola Técnico Advogado Gil Rodrigues • 2020 - 2022
                </p>
              </div>
            </div>
          </div>

          {/* Stacks Section */}
          <div className="mt-3 sm:mt-4">
            <h3 className="text-sm sm:text-base xl:text-base 2xl:text-lg font-light text-purple-600 dark:text-purple-400 mb-2">
              Stacks
            </h3>
            <div className="flex flex-wrap gap-y-1.5 mt-2">
              {[
                "React", "Next.js", "Vite.js", "Vue", "Tailwind CSS",
                "Node.js", "Python", "TypeScript", "JavaScript", "Express",
                "PostgreSQL", "MySQL", "Digital Ocean", "Vercel", "Docker",
                "Render", "Containers", "VMs"
              ].map((tech, i, arr) => (
                <span key={tech} className="whitespace-nowrap text-gray-600 dark:text-gray-400 text-xs xl:text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  {tech}{i < arr.length - 1 && <span className="text-gray-400/50 dark:text-gray-500/50 mx-2">•</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Skills & Projects */}
      <div className="flex-1 bg-white text-gray-800 flex flex-col justify-center px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24 py-4 lg:py-6 relative z-10">
        <div className="max-w-lg xl:max-w-xl 2xl:max-w-2xl h-full flex flex-col">

          {/* Weave Highlight */}
          <div 
            className="relative flex-1 flex flex-col min-h-0 mb-4 sm:mb-6 p-2 rounded-xl overflow-hidden bg-cover bg-center bg-no-repeat group"
            style={{ backgroundImage: "url('/weave.png')" }}
          >
            {/* Overlay em gradiente para proteger apenas os textos (topo e base) */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 opacity-90 group-hover:opacity-70 transition-opacity"></div>
            
            <div className="relative z-10 flex flex-col flex-1 justify-between">
              <div className="flex items-center justify-between">
                <h4 className="text-md sm:text-lg font-bold text-white drop-shadow-lg">
                  Weave
                </h4>
                <a
                  href="https://weavenotes.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white hover:text-purple-300 underline transition-colors drop-shadow-lg"
                >
                  Conheça o Weave
                </a>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="text-[10px] sm:text-xs font-mono text-white drop-shadow-lg">#IA-Proativa</span>
                <span className="text-[10px] sm:text-xs font-mono text-white drop-shadow-lg">#Gestão-Ágil</span>
              </div>
            </div>
          </div>

          {/* Selected Projects */}
          <div className="relative flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <h3 className="text-base text-purple-600 dark:text-purple-400 sm:text-md xl:text-md font-light">
                Repositórios públicos
              </h3>
              {/* Scroll indicator - only visible on desktop */}
              <div className="hidden lg:flex items-center text-gray-600 dark:text-slate-400 text-xs">
                <span className="mr-1 text-[10px]">Dê scroll para ver tudo</span>
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
