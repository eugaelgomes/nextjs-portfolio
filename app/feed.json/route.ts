import { NextResponse } from 'next/server'

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  topics: string[];
  html_url: string;
  updated_at: string;
  created_at: string;
}

async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      'https://api.github.com/users/eugaelgomes/repos?sort=updated&per_page=20',
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'gaelgomes.dev'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Filtra apenas repos públicos com descrição
    return data.filter((repo: GitHubRepo) => 
      !repo.name.includes('.github') && 
      repo.description && 
      repo.description.length > 10
    );
  } catch (error) {
    console.error('Erro ao buscar repositórios:', error);
    return [];
  }
}

export async function GET() {
  const repos = await getGitHubRepos();
  
  const baseUrl = 'https://gaelgomes.dev'
  
  const feedItems = repos.map(repo => ({
    id: repo.html_url,
    url: repo.html_url,
    title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    content_html: `<p>${repo.description}</p><p><strong>Linguagem:</strong> ${repo.language || 'N/A'}</p><p><strong>Tags:</strong> ${repo.topics.join(', ')}</p>`,
    content_text: repo.description || 'Projeto no GitHub',
    summary: repo.description || 'Projeto no GitHub',
    date_published: new Date(repo.created_at).toISOString(),
    date_modified: new Date(repo.updated_at).toISOString(),
    author: {
      name: 'Gael Gomes',
      email: 'hello@gaelgomes.dev',
      url: 'https://gaelgomes.dev'
    },
    tags: ['projetos', 'github', repo.language, ...repo.topics].filter(Boolean),
    external_url: repo.html_url,
    _github: {
      id: repo.id,
      language: repo.language,
      topics: repo.topics
    }
  }))

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Gael Gomes - Projetos e Repositórios',
    description: 'Projetos e repositórios de Gael Gomes, Estudante de Engenharia de Software com foco em React, Next.js, Node.js e tecnologias modernas.',
    home_page_url: baseUrl,
    feed_url: `${baseUrl}/feed.json`,
    language: 'pt-BR',
    icon: `${baseUrl}/profile_picture-gael_gomes.webp`,
    favicon: `${baseUrl}/favicon.ico`,
    authors: [
      {
        name: 'Gael Gomes',
        email: 'hello@gaelgomes.dev',
        url: baseUrl
      }
    ],
    items: feedItems.sort((a, b) => 
      new Date(b.date_modified).getTime() - new Date(a.date_modified).getTime()
    )
  }

  return NextResponse.json(feed, {
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  })
}