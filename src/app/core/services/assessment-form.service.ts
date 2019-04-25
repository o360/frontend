import { Injectable } from '@angular/core';
import { IElementAnswer } from '../models/assessment-model';

@Injectable()
export class AssessmentFormService {
  private _answersAreEqual: boolean = true;

  public get answersAreEqual(): boolean {
    return this._answersAreEqual;
  }

  public set answersAreEqual(value: boolean) {
    this._answersAreEqual = value;
  }

  /**
   * Comparing form answers to equals by values
   * @param answers
   * @param changedAnswers
   */
  public equals (answers: IElementAnswer[], changedAnswers: IElementAnswer[]) {
    this.answersAreEqual = JSON.stringify(answers) === JSON.stringify(changedAnswers);
  }

  /**
   * Reset equals flag to init value
   */
  public reset() {
    this.answersAreEqual = true;
  }
}
