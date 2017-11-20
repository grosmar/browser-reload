# browser-reload
1. Watching given folder
2. On change runs command (to recompile, etc)
3. Notify every client to reload the page
4. Client automatically reloads the page

Very useful, when you cannot use hot swap, and need to force reloading the page.

# Install
```npm install```

# Usage
## 1. Start server:
```node browser-reload.js --dir <YOUR_DIR_TO_WATCH> --cmd <YOUR_COMMAND_TO_RUN_ON_CHANGE> --port <SERVER_PORT_TO_LISTEN>```

## 2. Embed client script to your page
```<script src='http://localhost:<SERVER_PORT_TO_LISTEN>/browser-reload-client.js'></script>```

