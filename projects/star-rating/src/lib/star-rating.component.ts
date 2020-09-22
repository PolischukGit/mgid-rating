import { ChangeDetectionStrategy, Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { ThemePalette } from '@angular/material/core/common-behaviors/color';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type TLabelPosition = 'before' | 'after';

@Component({
  selector: 'mgid-star-rating',
  template: `
    <div class="stars-wrapper">
      <div class="fl-container">
        <span class="label-container"
              *ngIf="label && (labelPosition === 'before' || !labelPosition)"
              [style.fontSize]="(+labelSize || 20) + 'px'">
          {{ratingValue}}
        </span>
        <ng-container *ngFor="let star of stars; let ind = index">
          <mgid-star-item
            [index]="ind"
            [value]="+hoverStarValue || ratingValue"
            [static]="static"
            [color]="color"
            [size]="size"
            [halfIcon]="halfIcon"
            [fullIcon]="fullIcon"
            [emptyIcon]="emptyIcon"
            (mouseClick)="mouseClick($event)"
            (mouseEnter)="mouseEnter($event)"
            (mouseLeave)="mouseEnter()"></mgid-star-item>
        </ng-container>
        <span class="label-container"
              *ngIf="label && labelPosition === 'after'"
              [style.fontSize]="(+labelSize || 20) + 'px'">
          {{ratingValue}}
        </span>
      </div>
    </div>
  `,
  styles: [`
    .stars-wrapper {
      display: inline-block;
    }
    .fl-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .label-container {
      display: inline-block;
      text-align: center;
      padding: 0 10px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarRatingComponent),
      multi: true
    }
  ]
})
export class StarRatingComponent implements ControlValueAccessor {

  /**
   * Star rating library options (all optional)
   * */

  @Input() starsQuantity: number;
  @Input() color: ThemePalette;
  @Input() size: number;
  @Input() value: number;
  @Input() label: boolean;
  @Input() labelSize: number;
  @Input() labelPosition: TLabelPosition;
  @Input() emptyIcon: string;
  @Input() halfIcon: string;
  @Input() fullIcon: string;
  @Input() static: boolean;

  @Output() valueChange = new EventEmitter<number>();

  formControlValue: number;
  hoverStarValue: number;

  get stars(): any[] {
    const value = Math.ceil(this.ratingValue);
    const quantity = +this.starsQuantity || 5;
    return Array(value > quantity ? value : quantity);
  }

  get ratingValue(): number {
    return +this.formControlValue || +this.value || 0;
  }

  mouseEnter(index = 0): void {
    this.hoverStarValue = index;
  }

  mouseClick(index: number): void {
    if (Number.isNaN(this.formControlValue)) {
      this.valueChange.emit(index);
    } else {
      this.formControlValue = index;
      this.onChange(index);
    }
  }

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.formControlValue = +value;
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

}
