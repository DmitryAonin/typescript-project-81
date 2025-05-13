import { Form } from './Form.js'
import { HexletCodeAccumulator } from './HexletCodeAccumulator.js'
import { RequestOptions } from './interfaces.js'

class HexletCode {
  static formFor(template: { name: string, job: string, gender: string }, options: RequestOptions, _callback: (f: HexletCodeAccumulator) => void): string {
    const form = new HexletCodeAccumulator(template, options)
    _callback(form)
    return Form.getHtml(form.templateOptions, form.options)
  }
}

export default HexletCode
