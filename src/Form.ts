import Input from './Input'
import { ITemplateOptions, RequestOptions } from './interfaces'
import Tag from './Tag'
import Textarea from './Textarea'

export class Form {
  static getHtml(fieldsOptions: ITemplateOptions[], options: RequestOptions): string {
    const action = options.url ?? '#'
    const method = options.method ?? 'post'
    const fieldsHtml = fieldsOptions.map((field) => {
      switch (field.fieldType) {
        case 'input':
          return new Input ({ name: field.fieldName, type: 'text', value: field.fieldValue, ...field.attributes }, true).toString()
        case 'submit':
          return new Input({ type: 'submit', value: field.fieldValue }).toString()
        case 'textarea':
          return new Textarea ({ ...field.attributes, name: field.fieldName }, field.fieldValue, true).toString()
      }
    })

    return new Tag('form', { method: method, action: action }, fieldsHtml.join('')).toString()
  }
}
