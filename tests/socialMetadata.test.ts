import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
const meta = (name: string) => {
  const tags = html.match(/<meta\b[^>]*>/g) ?? []
  const tag = tags.find((value) => value.includes(`property="${name}"`) || value.includes(`name="${name}"`))
  const content = tag?.match(/content="([^"]*)"/)?.[1]
  assert.ok(content, `missing metadata: ${name}`)
  return content
}

test('social image is a real PNG with the dimensions advertised to crawlers', () => {
  const url = new URL(meta('og:image'))
  assert.equal(url.protocol, 'https:')
  const png = readFileSync(new URL(`../public${url.pathname}`, import.meta.url))
  assert.deepEqual(png.subarray(0, 8), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
  assert.equal(png.toString('ascii', 12, 16), 'IHDR')
  assert.equal(png.readUInt32BE(16), Number(meta('og:image:width')))
  assert.equal(png.readUInt32BE(20), Number(meta('og:image:height')))
  assert.equal(meta('og:image:type'), 'image/png')
  assert.equal(meta('og:image:secure_url'), url.href)
  assert.equal(meta('twitter:image'), url.href)
  assert.ok(meta('og:image:alt').trim().length > 0)
  assert.ok(meta('twitter:image:alt').trim().length > 0)
})

test('canonical, structured data, and social URLs identify the same website', () => {
  const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1]
  assert.ok(canonical)
  assert.equal(new URL(canonical).protocol, 'https:')
  assert.equal(meta('og:url'), canonical)
  const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]
  assert.ok(json, 'structured data must be available without client-side rendering')
  const website = JSON.parse(json)
  assert.equal(website['@context'], 'https://schema.org')
  assert.equal(website['@type'], 'WebSite')
  assert.equal(website.url, canonical)
  assert.equal(website.image, meta('og:image'))
  assert.equal(meta('twitter:card'), 'summary_large_image')
})
