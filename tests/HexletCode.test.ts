import { expect, test, vi } from 'vitest'
import path from 'path'
import fs from 'fs'
import HexletCode from '../src/index.js'

const template = { name: 'rob', job: 'hexlet', gender: 'm' }

const getFixturePath = (filename: string) => path.join(__dirname, '__fixtures__', filename)
const readFile = (filename: string) => fs.readFileSync(getFixturePath(filename), 'utf-8')

test('formFor returns default form without options', () => {
  const result = HexletCode.formFor(template, {}, () => {})
  expect(result).toBe(readFile('FormDefault.html'))
})

test('formFor uses provided URL in action attribute', () => {
  const result = HexletCode.formFor(template, { url: '/users' }, () => {})
  expect(result).toBe(readFile('FormUrl.html'))
})

test('formFor always uses POST method', () => {
  const result1 = HexletCode.formFor(template, {}, () => {})
  const result2 = HexletCode.formFor(template, { url: '/update' }, () => {})
  expect(result1).toContain('method="post"')
  expect(result2).toContain('method="post"')
})

test('generates text input by default', () => {
  const html = HexletCode.formFor(template, {}, f => f.input('name'))
  expect(html).toContain(readFile('InputDefault.html'))
})

test('generates textarea when specified', () => {
  const html = HexletCode.formFor(template, {}, f =>
    f.input('job', { as: 'textarea' }))
  expect(html).toContain(readFile('TextAreaDeafult.html'))
})

test('overrides default textarea attributes', () => {
  const html = HexletCode.formFor(template, {}, f =>
    f.input('job', { as: 'textarea', rows: 50, cols: 50 }))

  expect(html).toContain(
    readFile('TextAreaAttributes.html'),
  )
})

test('test textarea', () => {
  const html = HexletCode.formFor(template, {}, f =>
    f.input('job', { as: 'textarea' }))
  expect(html).toBe(readFile('FormTextArea.html'))
})

test('throws error for non-existent field', () => {
  expect(() => {
    HexletCode.formFor(template, {}, f => f.input('age')) // Поле 'age' отсутствует
  }).toThrowError('Field \'age\' does not exist in the template.')
})

test('throws error for non-existent field', () => {
  const html = HexletCode.formFor(template, {}, f => f.submit('Save'))

  expect(html).toContain(readFile('InputSubmit.html'))
})
