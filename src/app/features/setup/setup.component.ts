import { Component, HostListener, inject } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'

import { SettingsService } from '../../core/settings/settings.service'
import { KbdComponent } from '../../libs/ui/kbd/kbd.component'

@Component({
  selector: 'app-setup',
  host: { class: 'flex flex-col gap-4' },
  imports: [ReactiveFormsModule, KbdComponent],
  template: `
    <h1 class="text-white bold text-xl">Setup</h1>
    <form class="flex flex-col gap-2" [formGroup]="form">
      <label for="raindropToken" class="text-blue-200">Raindrop Token</label>
      <input
        formControlName="raindropToken"
        placeholder="Token goes here ..."
        id="raindropToken"
        type="password"
        class="bg-gray-800 p-2 rounded-t-md text-white w-full outline-0"
      />
    </form>

    <div class="flex gap-4">
      <button
        (click)="cancel()"
        class="bg-gray-800 p-2 rounded-md text-white w-full flex gap-2 items-center justify-center"
      >
        <kbd app-kbd>C</kbd>
        <kbd app-kbd>X</kbd>
        Cancel
      </button>

      <button
        (click)="save()"
        class="bg-gray-700 p-2 rounded-md text-white w-full flex gap-2 items-center justify-center"
      >
        <kbd app-kbd>C</kbd>
        <kbd app-kbd>S</kbd>
        Save
      </button>
    </div>
  `,
})
export class SetupComponent {
  protected readonly settings = inject(SettingsService)
  protected readonly router = inject(Router)

  @HostListener('document:keydown.control.x')
  protected controlX() {
    this.cancel()
  }

  @HostListener('document:keydown.control.s')
  protected controlS() {
    this.save()
  }

  protected readonly form = new FormGroup({
    raindropToken: new FormControl<string>(
      this.settings.get('raindropToken') || '',
    ),
  })

  cancel() {
    this.router.navigate(['/'])
  }

  save() {
    this.settings.set('raindropToken', this.form.value.raindropToken || '')
    this.router.navigate(['/'])
  }
}
