export interface InputOptions {
  as?: 'input' | 'textarea'
}

export type ITemplate = Record<string, string>

export interface RequestOptions {
  url?: string
  method?: string
}

export interface ITemplateOptions {
  fieldName: string
  fieldValue: string
  attributes?: Record<string, unknown>
  fieldType: 'textarea' | 'input' | 'submit'
}
