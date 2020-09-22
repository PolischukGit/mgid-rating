import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { ThemePalette } from '@angular/material/core/common-behaviors/color';
import { fromEvent, merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'mgid-star-item',
  template: `
    <span class="{{stateValue ? 'static-container' : 'editable-container'}}">
      <mat-icon [color]="color || 'primary'"
                [style.width]="(+size || 25) + 'px'"
                [style.fontSize]="(+size || 25) + 'px'"
                [style.height]="(+size || 25) + 'px'">{{icon}}</mat-icon>
    </span>
  `,
  styles: [`
    .static-container {
      user-select: none;
    }
    .editable-container {
      cursor: pointer;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarItemComponent implements OnDestroy {

  @Input() color: ThemePalette;
  @Input() size: number;
  @Input() index: number;
  @Input() value: number;
  @Input() emptyIcon: string;
  @Input() halfIcon: string;
  @Input() fullIcon: string;
  @Input() set static(state: boolean) {
    this.stateValue = typeof state === 'boolean' ? state : true;
    this.handlers(this.stateValue);
  }

  @Output() mouseEnter = new EventEmitter<number>();
  @Output() mouseLeave = new EventEmitter<void>();
  @Output() mouseClick = new EventEmitter<number>();

  private alive$ = new Subject<void>();
  stateValue: boolean;

  get icon(): string {
    if (this.index + 1 - this.value <= 0) {
      return this.fullIcon || 'star';
    } else if (this.index + 1 - this.value < 1) {
      return this.halfIcon || 'star_half';
    } else {
      return this.emptyIcon || 'star_border';
    }
  }

  constructor(private el: ElementRef) {}

  private handlers(staticState: boolean): void {
    this.alive$.next();
    if (!staticState) {
      merge(
        fromEvent(this.el.nativeElement, 'click'),
        fromEvent(this.el.nativeElement, 'mouseenter'),
        fromEvent(this.el.nativeElement, 'mouseleave')
      ).pipe(
        takeUntil(this.alive$)
      ).subscribe((event: MouseEvent) => {
        if (event.type === 'mouseenter') {
          this.mouseEnter.emit(this.index + 1);
        } else if (event.type === 'mouseleave') {
          this.mouseLeave.emit();
        } else if (event.type === 'click') {
          this.mouseClick.emit(this.index + 1);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.alive$.next();
    this.alive$.complete();
  }

}
