import { expect, test, describe } from 'vitest'
import path from 'path'
import fs from 'fs'
import HexletCode from '../src/index.js'

const template = { name: 'rob', job: 'hexlet', gender: 'm' }

const getFixturePath = (filename: string) => path.join(__dirname, '__fixtures__', filename)
const readFile = (filename: string) => fs.readFileSync(getFixturePath(filename), 'utf-8')

describe('formFor', () => {
  test('returns complete form with all elements', () => {
    const result = HexletCode.formFor(template, { url: '/users' }, (f) => {
      f.input('name')
      f.input('job', { as: 'textarea', rows: 50, cols: 50 })
      f.submit('Save')
    })
    
    expect(result).toBe(readFile('FormComplete.html'))
  })

  test('returns default form without options', () => {
    const result = HexletCode.formFor(template, {}, () => {})
    expect(result).toBe(readFile('FormDefault.html'))
  })

  test('always uses POST method', () => {
    const result1 = HexletCode.formFor(template, {}, () => {})
    const result2 = HexletCode.formFor(template, { url: '/update' }, () => {})
    expect(result1).toContain('method="post"')
    expect(result2).toContain('method="post"')
  })
})

describe('error handling', () => {
  test('throws error for non-existent field', () => {
    expect(() => {
      HexletCode.formFor(template, {}, f => f.input('age'))
    }).toThrowError('Field \'age\' does not exist in the template.')
  })
})
