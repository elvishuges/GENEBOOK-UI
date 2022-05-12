import { app, BrowserWindow, nativeTheme } from "electron";
import path from "path";
import os from "os";
const fs = require("fs");
const { ipcMain } = require("electron");

// my
ipcMain.handle("fileAPI:writeText", async (event, arg) => {
  console.log("Hello Everyone", arg); // prints "ping"
  try {
    let json = {
      items: [
        {
          name: "knife",
          title: "Kitchen knife",
          description: "Simple pointed knife. Can be used to unlock locks.",
          image: "knife",
          audio: "knife",
          location: "room",
          requiresToShow: {
            items: [],
            actions: [],
            conditions: [
              (gc) =>
                getPlayer(gc).performedActions.includes("defeated_thief") &&
                !getPlayer(gc).performedActions.includes("took_knife"),
            ],
          },
        },
        {
          name: "bat",
          title: "Baseball bat",
          description: "A little heavy, but tough enough to defend itself.",
          image: "bat",
          audio: "bat",
          location: "room",
          requiresToShow: {
            items: [],
            actions: [],
            conditions: [
              (gc) =>
                getActor(gc, "thief").status.active == true &&
                !getPlayer(gc).performedActions.includes("took_bat"),
            ],
          },
        },
      ],
    };
    fs.writeFile("test.json", json, function (err) {
      if (err) {
        console.log(err);
      }
    });
  } catch (e) {
    console.log("Failed to save the file !", e);
  }
});

// end my

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

try {
  if (platform === "win32" && nativeTheme.shouldUseDarkColors === true) {
    require("fs").unlinkSync(
      path.join(app.getPath("userData"), "DevTools Extensions")
    );
  }
} catch (_) {}

let mainWindow;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, "icons/icon.png"), // tray icon
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  });

  mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on("devtools-opened", () => {
      mainWindow.webContents.closeDevTools();
    });
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
