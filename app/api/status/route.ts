import { NextResponse } from 'next/server'
import { getAllPosts, getAllProjects } from '@/lib/content'

export async function GET() {
  const posts = getAllPosts()
  const projects = getAllProjects()
  
  const status = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    site: {
      url: 'https://gaelgomes.dev',
      title: 'Gael Gomes - Desenvolvedor Full Stack'
    },
    content: {
      posts: {
        total: posts.length,
        featured: posts.filter(p => p.featured).length,
        latest: posts[0] ? {
          title: posts[0].title,
          publishedAt: posts[0].publishedAt.toISOString()
        } : null
      },
      projects: {
        total: projects.length,
        featured: projects.filter(p => p.featured).length,
        latest: projects[0] ? {
          title: projects[0].title,
          updatedAt: projects[0].updatedAt.toISOString()
        } : null
      }
    },
    feeds: {
      rss: '/rss.xml',
      json: '/feed.json'
    },
    seo: {
      sitemap: '/sitemap.xml',
      robots: '/robots.txt'
    }
  }

  return NextResponse.json(status, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
    }
  })
}