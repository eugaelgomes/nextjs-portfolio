import { NextResponse } from 'next/server'
import { getAllPosts, getAllProjects } from '@/lib/content'

export async function GET() {
  const posts = getAllPosts()
  const projects = getAllProjects()
  
  const baseUrl = 'https://gaelgomes.dev'
  const currentDate = new Date().toUTCString()
  
  const rssItems = [
    // Posts do blog
    ...posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${post.publishedAt.toUTCString()}</pubDate>
      <author>hello@gaelgomes.dev (Gael Gomes)</author>
      <category><![CDATA[Blog]]></category>
      ${post.tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('')}
    </item>`),
    
    // Projetos
    ...projects.map(project => `
    <item>
      <title><![CDATA[Projeto: ${project.title}]]></title>
      <description><![CDATA[${project.description}]]></description>
      <link>${baseUrl}/projetos/${project.slug}</link>
      <guid isPermaLink="true">${baseUrl}/projetos/${project.slug}</guid>
      <pubDate>${project.publishedAt.toUTCString()}</pubDate>
      <author>hello@gaelgomes.dev (Gael Gomes)</author>
      <category><![CDATA[Projetos]]></category>
      ${project.technologies.map(tech => `<category><![CDATA[${tech}]]></category>`).join('')}
    </item>`)
  ].join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Gael Gomes - Desenvolvedor Full Stack</title>
    <description>Blog e projetos de Gael Gomes, desenvolvedor full stack especializado em React, Next.js, Node.js e tecnologias modernas.</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>pt-BR</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <pubDate>${currentDate}</pubDate>
    <ttl>60</ttl>
    <image>
      <url>${baseUrl}/og-image.png</url>
      <title>Gael Gomes - Desenvolvedor Full Stack</title>
      <link>${baseUrl}</link>
      <width>1200</width>
      <height>630</height>
      <description>Logo do Gael Gomes</description>
    </image>
    <managingEditor>hello@gaelgomes.dev (Gael Gomes)</managingEditor>
    <webMaster>hello@gaelgomes.dev (Gael Gomes)</webMaster>
    <category>Technology</category>
    <category>Web Development</category>
    <category>Programming</category>
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