import { name } from '../package.json'
import { log } from './utils'

async function fetchRepo(owner: string, name: string) {
  const response = await fetch(`https://ungh.cc/repos/${owner}/${name}`)
  return response.json()
}

function parseCurrentPath() {
  const [, owner, name] = window.location.pathname.split('/')
  if (!owner || !name) {
    throw new Error('Invalid URL format')
  }
  return { owner, name }
}

function formatDate(date: string, format: 'short' | 'long' = 'short') {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: format,
    day: format === 'long' ? 'numeric' : undefined,
  })
}

function inject(date: string) {
  const container = document.createElement('span')
  container.id = name
  container.title = `Created on ${formatDate(date, 'long')}`
  container.textContent = `(${formatDate(date)})`
  container.style.color = 'var(--fgColor-disabled)'
  container.style.marginLeft = '8px'

  const root = document.querySelector('.Layout-sidebar h2')
  if (!root) {
    throw new Error('Root element not found')
  }
  root.append(container)
}

async function run() {
  const { owner, name } = parseCurrentPath()
  const { repo } = await fetchRepo(owner, name)
  log(repo)

  inject(repo.createdAt)
}

// eslint-disable-next-line unicorn/prefer-top-level-await
run()
