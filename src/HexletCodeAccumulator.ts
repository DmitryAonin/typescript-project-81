import { ITemplate, ITemplateOptions, InputOptions, RequestOptions } from './interfaces'

export class HexletCodeAccumulator {
  private template!: ITemplate
  public templateOptions: ITemplateOptions[] = []
  public options: RequestOptions

  constructor(template: ITemplate, options: RequestOptions) {
    this.template = template
    this.options = options
  }

  input(fieldName: string, attributes: InputOptions & ITemplate = {}): void {
    if (!this.template || !(fieldName in this.template)) {
      throw new Error(`Field '${fieldName}' does not exist in the template.`)
    }

    const fieldValue = this.template[fieldName]
    const fieldType = attributes.as ?? 'input'
    delete attributes.as

    this.templateOptions.push({ fieldName, fieldValue, attributes, fieldType })
  }

  submit(value: string): void {
    this.templateOptions.push({ fieldName: 'input', fieldValue: value, fieldType: 'submit' })
  }
}
