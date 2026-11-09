import assert from 'node:assert/strict'
import { readFileSync, statSync } from 'node:fs'
import test from 'node:test'

test('tree texture is a compact WebP with an editable vector master', () => {
  const texture = readFileSync(new URL('../public/images/sakura-tree.webp', import.meta.url))
  assert.equal(texture.toString('ascii', 0, 4), 'RIFF')
  assert.equal(texture.toString('ascii', 8, 12), 'WEBP')
  assert.ok(texture.length < 300_000)
  assert.ok(statSync(new URL('../docs/artwork/sakura-tree.svg', import.meta.url)).size > 0)
})
