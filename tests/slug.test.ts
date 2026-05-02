import { describe, expect, it } from 'vitest'
import { slugify } from '../src/lib/slug'

describe('slugify', () => {
  it('lowercases and joins words with hyphens', () => {
    expect(slugify('Practical example')).toBe('practical-example')
    expect(slugify('Harness-Specific Relevance')).toBe('harness-specific-relevance')
  })

  it('drops backticks so code-marked headings still slugify cleanly', () => {
    expect(slugify('Codex `AGENTS.md` starter')).toBe('codex-agents-md-starter')
  })

  it('collapses runs of non-alphanumeric characters', () => {
    expect(slugify('Side  by — side / comparison')).toBe('side-by-side-comparison')
  })

  it('trims leading and trailing hyphens', () => {
    expect(slugify('  ::Setup guide::  ')).toBe('setup-guide')
  })

  it('returns an empty string for input with no slug-safe characters', () => {
    expect(slugify('---')).toBe('')
    expect(slugify('')).toBe('')
  })

  it('produces stable output for identical input', () => {
    const value = 'Real estate funnel with Claude Cowork'
    expect(slugify(value)).toBe(slugify(value))
  })
})
