import { ITemplate } from './interfaces.js'
import Tag from './Tag.js'

export default class Textarea {
  stringLine: string[] = []
  defaultAttrs = { cols: '20', rows: '40' }
  constructor(public attrs: ITemplate = {}, public placeholder = '', public withLabel = false) {}

  public toString(): string {
    if (this.withLabel) {
      const name = this.attrs.name
      const capitalizedKeyForLabel = name[0].toUpperCase() + name.substring(1)
      const label = new Tag('label', { for: this.attrs.name }, capitalizedKeyForLabel).toString()
      this.stringLine.push(label)
    }
    this.stringLine.push(new Tag('textarea', { ...this.defaultAttrs, ...this.attrs }, this.placeholder).toString())
    return this.stringLine.join('')
  }
}
