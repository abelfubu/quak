// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

// fn open(url: &str) {}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_store::Builder::new().build())
        .enable_macos_default_menu(false)
        .plugin(tauri_plugin_opener::init())
        // .invoke_handler(tauri::generate_handler![open])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
