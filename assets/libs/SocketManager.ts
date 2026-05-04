import { _decorator, Component, director } from "cc";
const { ccclass } = _decorator;

@ccclass("SocketManager")
export class SocketManager extends Component {
  private socket: any = null;

  start() {
    this.connectSocket();
  }

  connectSocket() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("id") || "test_token";
    const gameId = params.get("game_id") || "1";

    // @ts-ignore
    this.socket = io("https://crcketx.unicon.vip", {
      transports: ["websocket"],
      query: {
        token: token,
        game_id: gameId,
      },
    });

    this.socket.on("connect", () => {
      console.log("✅ Socket Connected!");
    });

    this.socket.on("plane", (data: string) => {
      console.log("✈️ Plane data:", data);

      // Format: "1776407201365:1.06:1"
      const parts = data.split(":");

      if (parts.length >= 3) {
        const multiplierValue = parseFloat(parts[1]); // → 1.06
        const status = parseInt(parts[2]);

        if (!isNaN(multiplierValue)) {
          this.updateMultiplierInScene(multiplierValue, status);
        }
      }
    });

    this.socket.on("disconnect", () => {
      console.log("❌ Disconnected!");
    });

    this.socket.on("connect_error", (err: any) => {
      console.log("🔴 Error:", err.message);
    });
  }

  updateMultiplierInScene(value: number, status: number) {
    const scene = director.getScene();
    if (!scene) return;

    const canvas = scene.getChildByName("Canvas");
    if (!canvas) return;

    const gameCtrl = canvas.getComponent("GameCtrl") as any;
    if (gameCtrl) {
      gameCtrl.updateMultiplier(value, status);
    }

    const loadingNode = canvas.getChildByName("Loading");
    if (loadingNode) {
      const loadingCtrl = loadingNode.getComponent("LoadingCtrl") as any;
      if (loadingCtrl) {
        loadingCtrl.onPlaneData(value, status);
      }
    }
  }

  onDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

// mnnnnnnn
// import { _decorator, Component } from "cc";
// const { ccclass } = _decorator;

// @ccclass("SocketManager")
// export class SocketManager extends Component {
//   private socket: any = null;

//   start() {
//     this.connectSocket();
//   }

//   connectSocket() {
//     const params = new URLSearchParams(window.location.search);
//     const token = params.get("id") || "test_token";
//     const gameId = params.get("game_id") || "1";

//     this.socket = io("https://crcketx.unicon.vip", {
//       transports: ["websocket"],
//       query: {
//         token: token,
//         game_id: gameId,
//       },
//     });

//     this.socket.on("connect", () => {
//       console.log("✅ Socket Connected!");
//     });

//     this.socket.on("disconnect", () => {
//       console.log("❌ Disconnected!");
//     });
//     this.socket.on("connect_error", (err: any) => {
//       console.log("🔴 Error:", err.message);
//     });
//   }

//   onDestroy() {
//     if (this.socket) {
//       this.socket.disconnect();
//     }
//   }
// }
