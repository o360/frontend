import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

import Cropper = require('cropperjs');

@Component({
  moduleId: module.id,
  selector: 'bs-profile-image-crop',
  templateUrl: 'profile-image-crop.component.html'
})
export class UserProfileImageCropComponent implements OnInit, OnChanges {
  protected _file: any;
  protected _cropperModal: ModalDirective;
  protected _cropper: Cropper;
  protected _cropped: any;
  protected _imageCropped: EventEmitter<any> = new EventEmitter<any>();

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

  public get cropped(): any {
    return this._cropped;
  }

  @Output()
  public get imageCropped(): any {
    return this._imageCropped;
  }

  constructor(private _element: ElementRef) {
  }

  public ngOnInit() {
    if (this._file) {
      let image = this._element.nativeElement.querySelector('img');
      image.src = this._file;
      this._createCropper(image);
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this._file) {
      if (!this._cropper) {
        let image = this._element.nativeElement.querySelector('img');
        image.src = this._file;
        this._createCropper(image);
      } else {
        this._cropper.replace(this._file);
      }
    }
  }

  public load() {
    this._cropperModal.show();
  }

  public savePicture() {
    this._imageCropped.emit(this._cropped);
    this._cropperModal.hide();
  }

  protected _createCropper(image: any) {
    this._cropper = new Cropper(image, {
      minCanvasWidth: 300,
      minContainerWidth: 300,
      minCanvasHeight: 200,
      minContainerHeight: 200,
      minCropBoxHeight: 10,
      minCropBoxWidth: 10,
      viewMode: 2,
      autoCropArea: 0.5,
      aspectRatio: 1 / 1,
      crop: (e) =>
        this._cropped = this._cropper.getCroppedCanvas().toDataURL('image/jpeg')
    });
  }
}
