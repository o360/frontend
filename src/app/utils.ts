/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* tslint:disable:no-parameter-reassignment */
export class Utils {
  /**
   * Generate
   * @returns {string}
   */
  public static generateId() {
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);

      return v.toString(16);
    });
  }

  /**
   * Transliterate a string
   * @returns {string}
   */
  public static transliterate(value: string) {
    this._keys = Object.keys(this._transliterationHashMap).sort((a, b) => b.length - a.length);
    let out: string = '';
    while (value) {
      let key: string = this._peek(value);
      if (key) {
        out += Object.keys(this._transliterationHashMap)[Object.values(this._transliterationHashMap).indexOf(key)];
        // TODO for what asignation here?
        value = value.slice(key.length);
      } else {
        out += value[0];
        // TODO and there ?
        value = value.slice(1);
      }
    }

    return out;
  }

  public static getNext<T>(arr: T[], start?: (value: T) => boolean, predicate?: (value: T) => boolean): T {
    let tempArr = arr;

    if (start) {
      tempArr = tempArr.slice(arr.findIndex(start) + 1, arr.length);

    }
    if (predicate) {
      tempArr = tempArr.filter(predicate);
    }

    return tempArr[0];
  }

  public static isFunction(value: any): boolean {
    let getType = {};

    return value && getType.toString.call(value) === '[object Function]';
  }

  public static seconds(value: number): number {
    return value * 1000;
  }

  public static minutes(value: number): number {
    return Utils.seconds(value * 60);
  }

  protected static _peek(str: string) {
    for (let i = 0; i < this._keys.length; i++) {
      if (this._startsWith(this._keys[i], str)) {
        return this._keys[i];
      }
    }

    return '';
  }

  protected static _startsWith(start: string, str: string) {
    for (let i = 0; i < start.length; i++) {
      if (start[i] !== str[i]) {
        return false;
      }
    }

    return true;
  }

  private static _keys: string[];

  private static _transliterationHashMap: object = {
    'А': 'A',
    'а': 'a',
    'Б': 'B',
    'б': 'b',
    'В': 'V',
    'в': 'v',
    'Г': 'G',
    'г': 'g',
    'Д': 'D',
    'д': 'd',
    'Е': 'E',
    'е': 'e',
    'Ё': 'E',
    'ё': 'e',
    'Ж': 'Zh',
    'ж': 'zh',
    'З': 'Z',
    'з': 'z',
    'И': 'I',
    'и': 'i',
    'Й': 'Y',
    'й': 'y',
    'К': 'K',
    'к': 'k',
    'Л': 'L',
    'л': 'l',
    'М': 'M',
    'м': 'm',
    'Н': 'N',
    'н': 'n',
    'О': 'O',
    'о': 'o',
    'П': 'P',
    'п': 'p',
    'Р': 'R',
    'р': 'r',
    'С': 'S',
    'с': 's',
    'Т': 'T',
    'т': 't',
    'У': 'U',
    'у': 'u',
    'Ф': 'F',
    'ф': 'f',
    'Х': 'Kh',
    'х': 'kh',
    'Ц': 'Ts',
    'ц': 'ts',
    'Ч': 'Ch',
    'ч': 'ch',
    'Ш': 'Sh',
    'ш': 'sh',
    'Щ': 'Sch',
    'щ': 'sch',
    'ь': '',
    'Ы': 'Y',
    'ы': 'y',
    'ъ': '',
    'Э': 'E',
    'э': 'e',
    'Ю': 'Yu',
    'ю': 'yu',
    'Я': 'Ya',
    'я': 'ya',
    'A': 'А',
    'a': 'а',
    'B': 'Б',
    'b': 'б',
    'C': 'С',
    'c': 'с',
    'D': 'Д',
    'd': 'д',
    'E': 'Е',
    'e': 'е',
    'F': 'Ф',
    'f': 'ф',
    'G': 'Г',
    'g': 'г',
    'H': 'Х',
    'h': 'х',
    'I': 'И',
    'i': 'и',
    'J': 'Ж',
    'j': 'ж',
    'K': 'К',
    'k': 'к',
    'L': 'Л',
    'l': 'л',
    'M': 'М',
    'm': 'м',
    'N': 'Н',
    'n': 'н',
    'O': 'О',
    'o': 'о',
    'P': 'П',
    'p': 'п',
    'R': 'Р',
    'r': 'р',
    'S': 'С',
    's': 'с',
    'T': 'Т',
    't': 'т',
    'U': 'У',
    'u': 'у',
    'V': 'В',
    'v': 'в',
    'W': 'В',
    'w': 'в',
    'X': 'Кс',
    'x': 'кс',
    'Y': 'Й',
    'y': 'й',
    'Z': 'З',
    'z': 'з',
    'sh': 'ш',
    'Sh': 'Ш',
    'Sch': 'Щ',
    'sch': 'щ',
    'ch': 'ч',
    'Ch': 'Ч',
    'ts': 'ц',
    'Ts': 'Ц',
    'zh': 'ж',
    'Zh': 'Ж',
    'Kh': 'Х',
    'kh': 'х'
  };
}
