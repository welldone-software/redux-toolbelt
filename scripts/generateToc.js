const fs = require('fs')
const path = require('path')
const toc = require('markdown-toc')

const PACKAGES_FOLDER = './packages'

fs.readdirSync(PACKAGES_FOLDER).forEach(packageName => {
  const filename = path.join(PACKAGES_FOLDER, packageName, 'README.md')
  if (fs.existsSync(filename)) {
    console.log(`Generating 'Table of Contents' for '${packageName}'...`)
    const fileContent = fs.readFileSync(filename, 'utf-8')
    const updatedContent = toc.insert(fileContent)
    fs.writeFileSync(filename, updatedContent)
  }
})

console.log('Done!')
