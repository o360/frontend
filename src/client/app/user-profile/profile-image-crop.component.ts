import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

import Cropper = require('cropperjs');

@Component({
  moduleId: module.id,
  selector: 'bs-profile-image-crop',
  templateUrl: 'profile-image-crop.component.html'
})
export class UserProfileImageCropComponent implements OnChanges {
  protected _file: any;
  protected _cropperModal: ModalDirective;

  protected _cropper: any;
  protected _details: any;
  @Output() doule = new EventEmitter();


  @ViewChild('cropperModal')
  public set cropperModal(value: ModalDirective) {
    this._cropperModal = value;
  }

  public get file(): any {
    return this._file;
  }

  @Input()
  public set file(value: any) {
    this._file = value;
  }

  constructor(private _element: ElementRef) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this._file) {
      this._cropper = new Cropper(this._element.nativeElement.querySelector('img'), {
        aspectRatio: 16 / 9,
        crop: (e: any) => {
          console.log(e);
        }
      });
      console.log(this._cropper);
    }
  }

  public load() {
    this._cropperModal.show();
  }

  public cropImage() {
    this.doule.emit(this._cropper.getCroppedCanvas().toDataURL('image/jpeg'));
  }
}
