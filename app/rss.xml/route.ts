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
    
    // Filtra apenas repos públicos com descrição e não forks
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
  const currentDate = new Date().toUTCString()
  
  const rssItems = repos.map(repo => `
    <item>
      <title><![CDATA[${repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}]]></title>
      <description><![CDATA[${repo.description}]]></description>
      <link>${repo.html_url}</link>
      <guid isPermaLink="true">${repo.html_url}</guid>
      <pubDate>${new Date(repo.updated_at).toUTCString()}</pubDate>
      <author>hello@gaelgomes.dev (Gael Gomes)</author>
      <category><![CDATA[Projetos]]></category>
      ${repo.language ? `<category><![CDATA[${repo.language}]]></category>` : ''}
      ${repo.topics.map(topic => `<category><![CDATA[${topic}]]></category>`).join('')}
    </item>`).join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Gael Gomes - Projetos e Repositórios</title>
    <description>Projetos e repositórios de Gael Gomes, Estudante full stack especializado em React, Next.js, Node.js e tecnologias modernas.</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>pt-BR</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <pubDate>${currentDate}</pubDate>
    <ttl>3600</ttl>
    <image>
      <url>${baseUrl}/profile_picture-gael_gomes.webp</url>
      <title>Gael Gomes - Estudante Full Stack</title>
      <link>${baseUrl}</link>
      <width>400</width>
      <height>400</height>
      <description>Foto de perfil do Gael Gomes</description>
    </image>
    <managingEditor>hello@gaelgomes.dev (Gael Gomes)</managingEditor>
    <webMaster>hello@gaelgomes.dev (Gael Gomes)</webMaster>
    <category>Technology</category>
    <category>Web Development</category>
    <category>Programming</category>
    <category>Open Source</category>
    <copyright>© ${new Date().getFullYear()} Gael Gomes. Todos os direitos reservados.</copyright>
    <docs>https://www.rssboard.org/rss-specification</docs>
    ${rssItems}
  </channel>
</rss>`.trim()

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  })
}