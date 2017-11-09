import { Directive, EventEmitter, HostListener, Output, Input } from '@angular/core';

@Directive({
  selector: '[fileDrop]'
})
export class FileDropDirective {
  @Input() maximumFileSize: number = 0;
  @Input() validFileExtensions: string[];
  @Output() filesDropped = new EventEmitter<FileList>();
  @Output() filesHovered = new EventEmitter<boolean>();

  constructor() { }

  /**
   * File drop listener that hooks up the drop event.
   * It emits the files dropped if the file is valid; interms of extension and size.
   * @param
   */
  @HostListener('drop', ['$event'])
  onFileDrop($event) {
    $event.preventDefault();
    let transfer = $event.dataTransfer;
    if (!this.isFileExtensionValid(transfer.files[0].name) || !this.isFileSizeValid(transfer.files[0])) {
      this.filesHovered.emit(false);
      return;
    }
    this.filesHovered.emit(true);
    this.filesDropped.emit(transfer.files);
  }

  /**
   * listener for dragover event, which emits that the file is hovered.
   * @param  
   */
  @HostListener('dragover', ['$event'])
  onFileDragover($event) {
    event.preventDefault();
    this.filesHovered.emit(true);
  }

  /**
   * listener for dragleave event.
   * @param  
   */
  @HostListener('dragleave', ['$event'])
  onFileDragLeave($event) {
    event.preventDefault();
    this.filesHovered.emit(false);
  }

  private isFileExtensionValid(fileName: string): boolean {
    if (!this.validFileExtensions || !this.validFileExtensions.length) {
      return false;
    }
    const lastPeriodIndex = fileName.lastIndexOf('.');
    return lastPeriodIndex !== -1 && this.validFileExtensions.indexOf(fileName.substring(lastPeriodIndex, fileName.length).toLowerCase()) !== -1;
  }

  private isFileSizeValid(file: File): boolean {
    return file.size <= this.maximumFileSize;
  }

}
