export interface BlogPost {
  slug: string
  title: string
  description: string
  content: string
  publishedAt: Date
  updatedAt: Date
  author: {
    name: string
    email: string
    url: string
  }
  tags: string[]
  featured: boolean
}

export interface Project {
  slug: string
  title: string
  description: string
  content: string
  publishedAt: Date
  updatedAt: Date
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
}

export interface SiteContent {
  posts: BlogPost[]
  projects: Project[]
}

// Dados mock para demonstração - substitua por dados reais do seu CMS/database
export const siteContent: SiteContent = {
  posts: [
    {
      slug: 'primeiro-post',
      title: 'Bem-vindo ao meu blog',
      description: 'Primeiro post do blog onde falo sobre desenvolvimento e tecnologia.',
      content: '<p>Conteúdo do primeiro post...</p>',
      publishedAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      author: {
        name: 'Gael Gomes',
        email: 'hello@gaelgomes.dev',
        url: 'https://gaelgomes.dev'
      },
      tags: ['desenvolvimento', 'web', 'react'],
      featured: true
    },
    {
      slug: 'next-js-e-typescript',
      title: 'Desenvolvendo com Next.js e TypeScript',
      description: 'Guia completo sobre como usar Next.js com TypeScript para criar aplicações modernas.',
      content: '<p>Conteúdo sobre Next.js e TypeScript...</p>',
      publishedAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
      author: {
        name: 'Gael Gomes',
        email: 'hello@gaelgomes.dev',
        url: 'https://gaelgomes.dev'
      },
      tags: ['nextjs', 'typescript', 'tutorial'],
      featured: false
    }
  ],
  projects: [
    {
      slug: 'portfolio-nextjs',
      title: 'Portfolio com Next.js',
      description: 'Meu portfolio pessoal desenvolvido com Next.js, TypeScript e Tailwind CSS.',
      content: '<p>Descrição detalhada do projeto...</p>',
      publishedAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-03-01'),
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      githubUrl: 'https://github.com/eugaelgomes/gaels',
      liveUrl: 'https://gaelgomes.dev',
      featured: true
    },
    {
      slug: 'app-exemplo',
      title: 'Aplicação de Exemplo',
      description: 'Uma aplicação full-stack com React e Node.js.',
      content: '<p>Descrição detalhada do projeto...</p>',
      publishedAt: new Date('2024-02-15'),
      updatedAt: new Date('2024-02-15'),
      technologies: ['React', 'Node.js', 'PostgreSQL'],
      githubUrl: 'https://github.com/eugaelgomes/app-exemplo',
      featured: false
    }
  ]
}

// Funções helper
export const getAllPosts = (): BlogPost[] => {
  return siteContent.posts.sort((a, b) => 
    b.publishedAt.getTime() - a.publishedAt.getTime()
  )
}

export const getFeaturedPosts = (): BlogPost[] => {
  return getAllPosts().filter(post => post.featured)
}

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return siteContent.posts.find(post => post.slug === slug)
}

export const getAllProjects = (): Project[] => {
  return siteContent.projects.sort((a, b) => 
    b.updatedAt.getTime() - a.updatedAt.getTime()
  )
}

export const getFeaturedProjects = (): Project[] => {
  return getAllProjects().filter(project => project.featured)
}

export const getProjectBySlug = (slug: string): Project | undefined => {
  return siteContent.projects.find(project => project.slug === slug)
}