import { RegexProtocol } from './regex-protocol.regex';

export class OnlyLowercaseLettersRegex implements RegexProtocol {
  execute(str: string): string {
    return str.replace(/[^a-z]/g, '');
  }
}
