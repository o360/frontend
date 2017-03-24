// import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
// import { UserModel } from '../models/user-model';
//
//
// @Component({
//   // changeDetection: ChangeDetectionStrategy.OnPush,
//   selector: 'user-item',
//   styles: [
//     require('./user-item.css')
//   ],
//   template: require('./user-item.html')
// })
//
// export class TaskItemComponent {
//   @Input() user: UserModel;
//   @Output() delete = new EventEmitter(false);
//   @Output() update = new EventEmitter(false);
//
//   editing: boolean = false;
//   name: string = '';
//
//   editName(): void {
//     this.editing = true;
//     this.name = this.user.name;
//   }
//
//   saveName(): void { // TODO
//     if (this.editing) {
//       const name: string = this.name.trim();
//       if (name.length && name !== this.user.name) {
//         this.update.emit({name});
//       }
//       this.stopEditing();
//     }
//   }
//
//   stopEditing(): void {
//     this.editing = false;
//   }
// }
