import { NextResponse } from 'next/server'
import { getAllPosts, getAllProjects } from '@/lib/content'

export async function GET() {
  const posts = getAllPosts()
  const projects = getAllProjects()
  
  const baseUrl = 'https://gaelgomes.dev'
  
  const feedItems = [
    // Posts do blog
    ...posts.map(post => ({
      id: `${baseUrl}/blog/${post.slug}`,
      url: `${baseUrl}/blog/${post.slug}`,
      title: post.title,
      content_html: post.content,
      content_text: post.description,
      summary: post.description,
      date_published: post.publishedAt.toISOString(),
      date_modified: post.updatedAt.toISOString(),
      author: {
        name: post.author.name,
        email: post.author.email,
        url: post.author.url
      },
      tags: ['blog', ...post.tags]
    })),
    
    // Projetos
    ...projects.map(project => ({
      id: `${baseUrl}/projetos/${project.slug}`,
      url: `${baseUrl}/projetos/${project.slug}`,
      title: `Projeto: ${project.title}`,
      content_html: project.content,
      content_text: project.description,
      summary: project.description,
      date_published: project.publishedAt.toISOString(),
      date_modified: project.updatedAt.toISOString(),
      author: {
        name: 'Gael Gomes',
        email: 'hello@gaelgomes.dev',
        url: 'https://gaelgomes.dev'
      },
      tags: ['projetos', ...project.technologies],
      external_url: project.liveUrl,
      _github_url: project.githubUrl
    }))
  ]

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Gael Gomes - Desenvolvedor Full Stack',
    description: 'Blog e projetos de Gael Gomes, desenvolvedor full stack especializado em React, Next.js, Node.js e tecnologias modernas.',
    home_page_url: baseUrl,
    feed_url: `${baseUrl}/feed.json`,
    language: 'pt-BR',
    icon: `${baseUrl}/og-image.png`,
    favicon: `${baseUrl}/favicon.ico`,
    authors: [
      {
        name: 'Gael Gomes',
        email: 'hello@gaelgomes.dev',
        url: baseUrl
      }
    ],
    items: feedItems.sort((a, b) => 
      new Date(b.date_published).getTime() - new Date(a.date_published).getTime()
    )
  }

  return NextResponse.json(feed, {
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  })
}