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

import { EventModel, EventState } from './event-model';

describe('EventModel class', () => {
  let model: EventModel;

  beforeEach(() => {
    model = new EventModel();
  });

  it('should be defined', () => {
    expect(EventModel).toBeDefined();
    expect(model).toBeDefined();
    expect(model instanceof EventModel).toBeTruthy();
  });

  it('should have define state of assessment made by user', () => {
    model.start = '2017-06-23T11:03:45';
    model.end = '2017-06-23T11:03:45';
    model.userInfo = {
      totalFormsCount: 2,
      answeredFormsCount: 0
    };
    expect(model.state).toEqual(EventState.NotStarted);

    model.userInfo.answeredFormsCount = 1;
    expect(model.state).toEqual(EventState.PartiallyFilled);

    model.userInfo.answeredFormsCount = 2;
    expect(model.state).toEqual(EventState.FullFilled);
  });

  it('should have a properties by default', () => {
    expect(model.notifications).toEqual([]);
  });
});
