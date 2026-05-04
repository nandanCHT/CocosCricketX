System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, _dec, _class, _crd, ccclass, SocketManager;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      director = _cc.director;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7ffbaVECP9E+rQt/Fg+oYxd", "SocketManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director']);

      ({
        ccclass
      } = _decorator);

      _export("SocketManager", SocketManager = (_dec = ccclass("SocketManager"), _dec(_class = class SocketManager extends Component {
        constructor(...args) {
          super(...args);
          this.socket = null;
        }

        start() {
          this.connectSocket();
        }

        connectSocket() {
          const params = new URLSearchParams(window.location.search);
          const token = params.get("id") || "test_token";
          const gameId = params.get("game_id") || "1"; // @ts-ignore

          this.socket = io("https://crcketx.unicon.vip", {
            transports: ["websocket"],
            query: {
              token: token,
              game_id: gameId
            }
          });
          this.socket.on("connect", () => {
            console.log("✅ Socket Connected!");
          });
          this.socket.on("plane", data => {
            console.log("✈️ Plane data:", data); // Format: "1776407201365:1.06:1"

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
          this.socket.on("connect_error", err => {
            console.log("🔴 Error:", err.message);
          });
        }

        updateMultiplierInScene(value, status) {
          const scene = director.getScene();
          if (!scene) return;
          const canvas = scene.getChildByName("Canvas");
          if (!canvas) return;
          const gameCtrl = canvas.getComponent("GameCtrl");

          if (gameCtrl) {
            gameCtrl.updateMultiplier(value, status);
          }

          const loadingNode = canvas.getChildByName("Loading");

          if (loadingNode) {
            const loadingCtrl = loadingNode.getComponent("LoadingCtrl");

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

      }) || _class)); // mnnnnnnn
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


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=f9497726e959645b6f59b9d8bca7338ad8ba373e.js.map