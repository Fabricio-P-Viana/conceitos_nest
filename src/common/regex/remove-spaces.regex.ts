import { RegexProtocol } from './regex-protocol.regex';

export class RemoveSpacesRegex implements RegexProtocol {
  execute(str: string): string {
    return str.replace(/\s+/g, '');
  }
}
