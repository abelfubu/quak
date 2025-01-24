import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import { invoke } from "@tauri-apps/api/core";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule],
  styleUrl: "./app.component.css",
  template: `
    <main class="container">
      <input
        #greetInput
        (keyup.Enter)="greet(greetInput.value)"
        placeholder="Enter a name..."
      />
      <p>{{ greetingMessage() }}</p>
    </main>
  `,
})
export class AppComponent {
  greetingMessage = signal("");

  greet(name: string): void {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    invoke<string>("greet", { name }).then((text) => {
      this.greetingMessage.set(text);
    });
  }
}
