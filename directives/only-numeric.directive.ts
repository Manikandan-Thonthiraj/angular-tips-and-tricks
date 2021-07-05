import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from "@angular/core";

/**
 * How to Use
 * 
 * <input numeric type="text" decimals="2" negative="1" />
 * 
 * Reference = https://gist.github.com/ahmeti/5ca97ec41f6a48ef699ee6606560d1f7
 */ 
@Directive({
  selector: "[onlyNumeric]"
})
export class OnlyNumericDirective implements OnInit {
  @Input("decimals") decimals: number = 0;
  @Input('negative') negative: number = 0;
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

  private checkAllowNegative(value: string) {
    if (this.decimals <= 0) {
      return String(value).match(new RegExp(/^-?\d+$/));
    } else {
      var regExpString =
        "^-?\\s*((\\d+(\\.\\d{0," +
        this.decimals +
        "})?)|((\\d*(\\.\\d{1," +
        this.decimals +
        "}))))\\s*$";
      return String(value).match(new RegExp(regExpString));
    }
  }

  private check(value: string) {
    if (this.decimals <= 0) {
      return String(value).match(new RegExp(/^\d+$/));
    } else {
      var regExpString =
        "^\\s*((\\d+(\\.\\d{0," +
        this.decimals +
        "})?)|((\\d*(\\.\\d{1," +
        this.decimals +
        "}))))\\s*$";
      return String(value).match(new RegExp(regExpString));
    }
  }

  private run(oldValue) {
    setTimeout(() => {
      let currentValue: string = this.el.nativeElement.value;
      let allowNegative = this.negative > 0 ? true : false;

      if (allowNegative) {
        if (
          !["", "-"].includes(currentValue) &&
          !this.checkAllowNegative(currentValue)
        ) {
          this.el.nativeElement.value = oldValue;
        }
      } else {
        if (currentValue !== "" && !this.check(currentValue)) {
          this.el.nativeElement.value = oldValue;
        }
      }
    });
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.renderer.setAttribute(this.el.nativeElement, "inputmode", "numeric");
    this.renderer.setAttribute(this.el.nativeElement, "autocomplete", "off");
  }

  @HostListener("keydown", ["$event"])
  @HostListener("keyup", ["$event"])
  @HostListener("paste", ["$event"])
  @HostListener('input', ['$event']) 
  onInputChange(event) {
    let allowDecimals = this.decimals <= 0 ? false : true;
    let allowNegative = this.negative > 0 ? true : false;
    if (!allowDecimals && !allowNegative) {
      const initialValue = this.el.nativeElement.value;
      this.el.nativeElement.value = initialValue.replace(/[^0-9]*/g, '');
      if (initialValue !== this.el.nativeElement.value) {
        event.stopPropagation();
      }
    } else {
      this.run(this.el.nativeElement.value);
    }
  }
}
