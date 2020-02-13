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

export class FilterType {
  public static readonly String: string = 'string';
  public static readonly Number: string = 'number';
  public static readonly Select: string = 'select';
}

export class Filter {
  public name: string;
  public field: string;
  public type: string;
  public values?: any[];
  public value?: any;
}
