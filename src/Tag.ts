import { ITemplate } from './interfaces'

class Tag {
  private tagName: string
  private attributes: ITemplate
  private text: string

  constructor(tagName: string, attributes: ITemplate = {}, text = '') {
    this.tagName = tagName
    this.attributes = attributes
    this.text = text
  }

  private generateAttributes(): string {
    return Object.entries(this.attributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ')
  }

  public toString() {
    const attributes = this.generateAttributes()

    const openTag = `<${this.tagName}${attributes ? ' ' + attributes : ''}>`

    const closingTags = ['br', 'img', 'input']

    if (closingTags.includes(this.tagName)) {
      return openTag
    }

    return `${openTag}${this.text}</${this.tagName}>`
  }
}

export default Tag
