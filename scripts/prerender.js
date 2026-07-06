#!/usr/bin/env node

/**
 * Pre-rendering Script
 * 
 * Generates pre-rendered HTML pages for better initial load performance
 * and eliminates the white screen/pop-in effect
 * 
 * This script runs after build and creates static HTML files
 */

const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

const DIST_DIR = path.join(__dirname, '../dist')
const PORT = 5173

/**
 * Start a simple HTTP server to serve dist folder
 */
function startServer() {
  return new Promise((resolve) => {
    const server = spawn('npx', ['http-server', DIST_DIR, '-p', PORT, '-c-1'], {
      stdio: 'ignore'
    })
    
    // Give server time to start
    setTimeout(() => resolve(server), 1000)
  })
}

/**
 * Render pages and save HTML
 */
async function prerenderPages() {
  const puppeteer = require('puppeteer')
  
  const pages = [
    { url: '/', filename: 'index.html' },
    { url: '/#home', filename: 'home.html' },
    { url: '/#about', filename: 'about.html' },
    { url: '/#portfolio', filename: 'portfolio.html' },
    { url: '/#contact', filename: 'contact.html' },
  ]
  
  let browser
  
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    
    console.log('📄 Pre-rendering pages...')
    
    for (const page of pages) {
      try {
        const browserPage = await browser.newPage()
        
        // Set viewport to desktop size
        await browserPage.setViewport({ width: 1280, height: 720 })
        
        // Navigate to page
        await browserPage.goto(`http://localhost:${PORT}${page.url}`, {
          waitUntil: 'networkidle2',
          timeout: 30000
        })
        
        // Wait for animations to settle
        await browserPage.waitForTimeout(2000)
        
        // Get HTML content
        const html = await browserPage.content()
        
        // Save to file
        const filePath = path.join(DIST_DIR, page.filename)
        fs.writeFileSync(filePath, html, 'utf-8')
        
        console.log(`✅ Pre-rendered: ${page.filename}`)
        
        await browserPage.close()
      } catch (error) {
        console.warn(`⚠️  Failed to pre-render ${page.filename}:`, error.message)
      }
    }
    
    console.log('✅ Pre-rendering complete!')
  } catch (error) {
    console.error('❌ Pre-rendering error:', error)
    throw error
  } finally {
    if (browser) await browser.close()
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting pre-rendering process...\n')
  
  try {
    // Check if puppeteer is installed
    try {
      require('puppeteer')
    } catch {
      console.log('📦 Puppeteer not found. Skipping pre-rendering.')
      console.log('   To enable pre-rendering, install: npm install puppeteer --save-dev')
      return
    }
    
    // Start server
    console.log('🌐 Starting local server on port', PORT)
    const server = await startServer()
    
    // Prerender pages
    await prerenderPages()
    
    // Stop server
    server.kill()
    console.log('\n✨ Pre-rendering finished!')
  } catch (error) {
    console.error('Error during pre-rendering:', error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  main()
}

module.exports = { prerenderPages }
