System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, sp, Label, Color, Node, Animation, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, GameCtrl;

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
      sp = _cc.sp;
      Label = _cc.Label;
      Color = _cc.Color;
      Node = _cc.Node;
      Animation = _cc.Animation;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "508f8uDSd1FHps9TLrnw8hZ", "GameCtrl", undefined);

      __checkObsolete__(['_decorator', 'Component', 'sp', 'Label', 'Color', 'Node', 'Animation']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameCtrl", GameCtrl = (_dec = ccclass("GameCtrl"), _dec2 = property(sp.Skeleton), _dec3 = property(sp.Skeleton), _dec4 = property(Label), _dec5 = property(Node), _dec(_class = (_class2 = class GameCtrl extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "bg", _descriptor, this);

          _initializerDefineProperty(this, "ball", _descriptor2, this);

          _initializerDefineProperty(this, "multiplierLabel", _descriptor3, this);

          _initializerDefineProperty(this, "wagebaNode", _descriptor4, this);

          this.currentStatus = -1;
          this.lastCountdownValue = 0;
        }

        start() {
          if (this.wagebaNode) {
            this.wagebaNode.active = false;
          }

          if (this.multiplierLabel) {
            this.multiplierLabel.node.active = false;
          }
        }

        updateMultiplier(value, status) {
          if (!this.multiplierLabel) return;

          if (status === 0) {
            this.lastCountdownValue = value;
          }

          if (this.currentStatus !== status) {
            this.currentStatus = status;
            this.handleStateEntry(status);
          }

          if (status === 2) {
            this.multiplierLabel.node.active = true;
            this.multiplierLabel.color = new Color(246, 82, 100);
            this.multiplierLabel.string = value.toFixed(2) + "x";
            return;
          }

          if (status === 1) {
            this.multiplierLabel.node.active = true;
            this.multiplierLabel.color = new Color(255, 255, 255, 255);
            this.multiplierLabel.string = value.toFixed(2) + "x";
          }

          if (status === 0) {
            this.multiplierLabel.node.active = false;
          }
        }

        handleStateEntry(status) {
          if (!this.bg || !this.ball) return;

          if (status !== 2 && this.wagebaNode) {
            this.wagebaNode.active = false;
            var anim = this.wagebaNode.getComponent(Animation);
            if (anim) anim.stop();
          }

          if (status === 0) {
            this.ball.node.active = true;
            this.bg.setCompleteListener(null);
            var bgTrack = this.bg.setAnimation(0, "mtavarifoni", false);
            var ballTrack = this.ball.setAnimation(0, "mtavariball", false);
            var syncTime = this.lastCountdownValue > 0 ? this.lastCountdownValue - 1 : 0;
            if (bgTrack) bgTrack.trackTime = syncTime;
            if (ballTrack) ballTrack.trackTime = syncTime;
          } else if (status === 1) {
            this.ball.node.active = true;
            var currentTrack = this.bg.getCurrent(0);
            var isIdlePlaying = currentTrack && currentTrack.animation && currentTrack.animation.name === "mtavarifoni";

            if (isIdlePlaying) {
              this.bg.setCompleteListener(() => {
                this.bg.setCompleteListener(null);
                this.playStep2();
              });
            } else {
              this.playStep2();
            }
          } else if (status === 2) {
            this.ball.node.active = false;
            this.bg.setCompleteListener(null);

            if (this.wagebaNode) {
              this.wagebaNode.setPosition(this.ball.node.position);
              this.wagebaNode.active = true;

              var _anim = this.wagebaNode.getComponent(Animation);

              if (_anim) {
                _anim.play();
              }
            }
          }
        }

        playStep2() {
          if (!this.bg || !this.ball) return;
          this.bg.setAnimation(0, "ballflycosmosskyloop", false);
          this.ball.setAnimation(0, "ballflycosmos", false);
          this.bg.setCompleteListener(() => {
            this.playStep3();
          });
        }

        playStep3() {
          if (!this.bg || !this.ball) return;
          this.bg.setAnimation(0, "ballflystratosferaskyloop", true);
          this.ball.setAnimation(0, "ballflycosmosloop", true);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "bg", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "ball", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "multiplierLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "wagebaNode", [_dec5], {
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
//# sourceMappingURL=7622df60a04edf2f9950ddcf8c5e2c506e76f816.js.map