/**
 * Script para validar e testar os feeds RSS/JSON
 * Execute com: npm run validate-feeds
 */

const validateFeeds = async () => {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://gaelgomes.dev' 
    : 'http://localhost:3000'
  
  console.log('🔍 Validando feeds...\n')
  
  // Testa RSS Feed
  try {
    const rssResponse = await fetch(`${baseUrl}/rss.xml`)
    if (rssResponse.ok) {
      const rssContent = await rssResponse.text()
      console.log('✅ RSS Feed está funcionando')
      console.log(`   URL: ${baseUrl}/rss.xml`)
      console.log(`   Tamanho: ${(rssContent.length / 1024).toFixed(2)} KB`)
      
      // Verifica se é XML válido
      if (rssContent.includes('<rss') && rssContent.includes('</rss>')) {
        console.log('✅ XML válido')
      } else {
        console.log('❌ XML inválido')
      }
    } else {
      console.log('❌ RSS Feed não está acessível')
    }
  } catch (error) {
    console.log('❌ Erro ao acessar RSS Feed:', error)
  }
  
  console.log()
  
  // Testa JSON Feed
  try {
    const jsonResponse = await fetch(`${baseUrl}/feed.json`)
    if (jsonResponse.ok) {
      const jsonContent = await jsonResponse.json()
      console.log('✅ JSON Feed está funcionando')
      console.log(`   URL: ${baseUrl}/feed.json`)
      console.log(`   Items: ${jsonContent.items?.length || 0}`)
      console.log(`   Versão: ${jsonContent.version}`)
      
      // Verifica estrutura
      if (jsonContent.version && jsonContent.title && jsonContent.items) {
        console.log('✅ Estrutura JSON Feed válida')
      } else {
        console.log('❌ Estrutura JSON Feed inválida')
      }
    } else {
      console.log('❌ JSON Feed não está acessível')
    }
  } catch (error) {
    console.log('❌ Erro ao acessar JSON Feed:', error)
  }
  
  console.log()
  
  // Testa Sitemap
  try {
    const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`)
    if (sitemapResponse.ok) {
      const sitemapContent = await sitemapResponse.text()
      console.log('✅ Sitemap está funcionando')
      console.log(`   URL: ${baseUrl}/sitemap.xml`)
      
      // Conta URLs
      const urlCount = (sitemapContent.match(/<loc>/g) || []).length
      console.log(`   URLs: ${urlCount}`)
      
      if (sitemapContent.includes('<urlset') && sitemapContent.includes('</urlset>')) {
        console.log('✅ Sitemap XML válido')
      } else {
        console.log('❌ Sitemap XML inválido')
      }
    } else {
      console.log('❌ Sitemap não está acessível')
    }
  } catch (error) {
    console.log('❌ Erro ao acessar Sitemap:', error)
  }
  
  console.log()
  
  // Testa Robots.txt
  try {
    const robotsResponse = await fetch(`${baseUrl}/robots.txt`)
    if (robotsResponse.ok) {
      const robotsContent = await robotsResponse.text()
      console.log('✅ Robots.txt está funcionando')
      console.log(`   URL: ${baseUrl}/robots.txt`)
      
      if (robotsContent.includes('Sitemap:')) {
        console.log('✅ Sitemap referenciado no robots.txt')
      } else {
        console.log('⚠️  Sitemap não referenciado no robots.txt')
      }
    } else {
      console.log('❌ Robots.txt não está acessível')
    }
  } catch (error) {
    console.log('❌ Erro ao acessar Robots.txt:', error)
  }
  
  console.log('\n🎉 Validação concluída!')
}

// Executa apenas se chamado diretamente
if (require.main === module) {
  validateFeeds()
}

module.exports = { validateFeeds }