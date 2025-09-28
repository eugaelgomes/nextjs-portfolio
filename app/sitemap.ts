import { MetadataRoute } from 'next'
import { getAllPosts, getAllProjects } from '@/lib/content'
 
export default function sitemap(): MetadataRoute.Sitemap {
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
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
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

  // URLs dinâmicas dos posts do blog
  const posts = getAllPosts()
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // URLs dinâmicas dos projetos
  const projects = getAllProjects()
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projetos/${project.slug}`,
    lastModified: project.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...projectRoutes,
  ]
}