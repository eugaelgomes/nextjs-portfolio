import { MetadataRoute } from 'next'

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
        },
        next: { revalidate: 3600 } // Cache por 1 hora
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
    console.error('Erro ao buscar repositórios para sitemap:', error);
    return [];
  }
}
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://gaelgomes.dev'
  const currentDate = new Date()
  
  // URLs estáticas do seu site
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projetos`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/rss.xml`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/feed.json`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.3,
    },
  ]

  // URLs dos repositórios do GitHub
  const repos = await getGitHubRepos()
  const repoRoutes = repos.map((repo) => ({
    url: repo.html_url,
    lastModified: new Date(repo.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    ...staticRoutes,
    ...repoRoutes,
  ]
}