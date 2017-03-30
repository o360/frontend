// import {Injectable, EventEmitter} from '@angular/core';

// @Injectable()
export class Utils {
  // private static _emitters: {[ID: string]: EventEmitter<any>} = {};

  static generateId() {
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
    }

  // static get(ID: string): EventEmitter<any> {
  //   if (!this._emitters[ID])
  //     this._emitters[ID] = new EventEmitter();
  //   return this._emitters[ID];
  // }
}
