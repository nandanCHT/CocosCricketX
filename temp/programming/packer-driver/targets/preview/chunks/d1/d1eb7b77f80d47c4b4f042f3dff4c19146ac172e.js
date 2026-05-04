System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, ProgressBar, Node, Label, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, LoadingCtrl;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      ProgressBar = _cc.ProgressBar;
      Node = _cc.Node;
      Label = _cc.Label;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "1a02bF6IidIg6r1Z6CMY6hp", "LoadingCtrl", undefined); // LoadingCtrl.ts


      __checkObsolete__(['_decorator', 'Component', 'ProgressBar', 'Node', 'Label']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("LoadingCtrl", LoadingCtrl = (_dec = ccclass("LoadingCtrl"), _dec2 = property(ProgressBar), _dec3 = property(Label), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Node), _dec(_class = (_class2 = class LoadingCtrl extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "progressBar", _descriptor, this);

          _initializerDefineProperty(this, "connectingLabel", _descriptor2, this);

          _initializerDefineProperty(this, "bgAnimNode", _descriptor3, this);

          _initializerDefineProperty(this, "ballAnimNode", _descriptor4, this);

          _initializerDefineProperty(this, "multiplierNode", _descriptor5, this);

          this.targetProgress = 0;
          this.currentProgress = 0;
          this.isAnimating = false;
          this.dotInterval = null;
          this.dotCount = 0;
          this.isConnected = false;
        }

        start() {
          this.node.active = false;

          if (this.progressBar) {
            this.progressBar.progress = 0;
          }

          this.hideGameNodes();
          this.showConnecting();
        } // ─── Connecting Logic ────────────────────────────────


        showConnecting() {
          if (this.connectingLabel) {
            this.connectingLabel.node.active = true;
            this.connectingLabel.string = "Connecting";
          }

          this.dotInterval = setInterval(() => {
            this.dotCount = (this.dotCount + 1) % 4;
            var dots = ".".repeat(this.dotCount);

            if (this.connectingLabel) {
              this.connectingLabel.string = "Connecting" + dots;
            }
          }, 500);
        }

        hideConnecting() {
          clearInterval(this.dotInterval);

          if (this.connectingLabel) {
            this.connectingLabel.node.active = false;
          }
        }

        hideGameNodes() {
          if (this.bgAnimNode) this.bgAnimNode.active = false;
          if (this.ballAnimNode) this.ballAnimNode.active = false;
          if (this.multiplierNode) this.multiplierNode.active = false;
        }

        showGameNodes() {
          if (this.bgAnimNode) this.bgAnimNode.active = true;
          if (this.ballAnimNode) this.ballAnimNode.active = true;
          if (this.multiplierNode) this.multiplierNode.active = true;
        }

        onPlaneData(countdownValue, status) {
          if (!this.isConnected) {
            this.isConnected = true;
            this.hideConnecting();
            this.showGameNodes();
          }

          if (status === 0) {
            this.node.active = true;
            this.currentProgress = countdownValue / 7;
            this.targetProgress = this.currentProgress;

            if (this.progressBar) {
              this.progressBar.progress = this.currentProgress;
            }

            this.isAnimating = false;
          } else {
            this.node.active = false;
          }
        }

        update(deltaTime) {
          if (!this.isAnimating || !this.progressBar) return;
          var speed = 3;
          this.currentProgress += (this.targetProgress - this.currentProgress) * deltaTime * speed;

          if (Math.abs(this.currentProgress - this.targetProgress) < 0.001) {
            this.currentProgress = this.targetProgress;
            this.isAnimating = false;
          }

          this.progressBar.progress = this.currentProgress;
        }

        onDestroy() {
          clearInterval(this.dotInterval);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "progressBar", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "connectingLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "bgAnimNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "ballAnimNode", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "multiplierNode", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d1eb7b77f80d47c4b4f042f3dff4c19146ac172e.js.map