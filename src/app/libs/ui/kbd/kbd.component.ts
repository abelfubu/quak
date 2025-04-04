import { Component } from '@angular/core'

@Component({
  selector: 'kbd[app-kbd]',
  host: {
    class:
      'text-gray-500 h-5 w-5 rounded-[2px] flex items-center justify-center bg-[#fff1]',
  },
  template: ` <ng-content /> `,
})
export class KbdComponent {}
