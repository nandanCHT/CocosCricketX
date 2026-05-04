import { _decorator, Component, sp, Label, Color, Node, Animation } from "cc";
const { ccclass, property } = _decorator;

@ccclass("GameCtrl")
export class GameCtrl extends Component {
  @property(sp.Skeleton)
  bg: sp.Skeleton = null!;

  @property(sp.Skeleton)
  ball: sp.Skeleton = null!;

  @property(Label)
  multiplierLabel: Label = null!;

  @property(Node)
  wagebaNode: Node = null!;

  @property(sp.Skeleton)
  coinSpine: sp.Skeleton = null!;

  private currentStatus: number = -1;
  private lastCountdownValue: number = 0;
  private coinDelayTimer: any = null;

  private coinAnimations: string[] = [
    "amoxtomasxvis",
    "amoxtomasxvis2",
    "amoxtomasxvis3",
  ];

  start() {
    if (this.wagebaNode) {
      this.wagebaNode.active = false;
    }

    if (this.multiplierLabel) {
      this.multiplierLabel.node.active = false;
      this.multiplierLabel.string = "";
    }
    if (this.coinSpine) {
      this.coinSpine.node.active = false;
    }
  }

  updateMultiplier(value: number, status: number) {
    if (!this.multiplierLabel) return;

    // ✅ 0 se kam ya exactly 0 value pe kuch mat dikhao
    if (value <= 0) {
      this.multiplierLabel.node.active = false;
      return;
    }

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

  stopCoin() {
    if (this.coinDelayTimer) {
      clearTimeout(this.coinDelayTimer);
      this.coinDelayTimer = null;
    }
    if (this.coinSpine) {
      this.coinSpine.setCompleteListener(null);
      this.coinSpine.node.active = false;
    }
  }

  playRandomCoinAnim() {
    if (!this.coinSpine || !this.coinSpine.node.active) return;

    const randomIndex = Math.floor(Math.random() * this.coinAnimations.length);
    const animName = this.coinAnimations[randomIndex];

    this.coinSpine.setAnimation(0, animName, false);

    this.coinSpine.setCompleteListener(() => {
      this.coinSpine.setCompleteListener(null);

      this.coinDelayTimer = setTimeout(() => {
        if (this.coinSpine && this.coinSpine.node.active) {
          this.playRandomCoinAnim();
        }
      }, 2000);
    });
  }

  handleStateEntry(status: number) {
    if (!this.bg || !this.ball) return;

    if (status === 0) {
      this.stopCoin();
      this.ball.node.active = true;
      this.bg.setCompleteListener(null);
      const bgTrack = this.bg.setAnimation(0, "mtavarifoni", false);
      const ballTrack = this.ball.setAnimation(0, "mtavariball", false);
      const syncTime =
        this.lastCountdownValue > 0 ? this.lastCountdownValue - 1 : 0;
      if (bgTrack) bgTrack.trackTime = syncTime;
      if (ballTrack) ballTrack.trackTime = syncTime;

      if (this.wagebaNode) {
        this.wagebaNode.active = false;
        const anim = this.wagebaNode.getComponent(Animation);
        if (anim) anim.stop();
      }
    } else if (status === 1) {
      if (this.wagebaNode) {
        this.wagebaNode.active = false;
        const anim = this.wagebaNode.getComponent(Animation);
        if (anim) anim.stop();
      }

      this.ball.node.active = true;
      const currentTrack = this.bg.getCurrent(0);
      const isIdlePlaying =
        currentTrack &&
        currentTrack.animation &&
        currentTrack.animation.name === "mtavarifoni";

      if (isIdlePlaying) {
        this.bg.setCompleteListener(() => {
          this.bg.setCompleteListener(null);
          this.playStep2();
        });
      } else {
        this.playStep2();
      }

      if (this.coinSpine) {
        this.coinSpine.node.active = true;
        this.coinDelayTimer = setTimeout(() => {
          if (this.coinSpine && this.coinSpine.node.active) {
            this.playRandomCoinAnim();
          }
        }, 1500);
      }
    } else if (status === 2) {
      this.stopCoin();

      this.ball.node.active = false;
      this.bg.setCompleteListener(null);

      if (this.wagebaNode) {
        this.wagebaNode.setPosition(this.ball.node.position);
        this.wagebaNode.active = true;
        const spine = this.wagebaNode.getComponent(sp.Skeleton);
        if (spine) {
          spine.clearTrack(0);
          spine.setToSetupPose();
          spine.setSlotsToSetupPose();
          spine.setAnimation(0, "wageba", false);
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

  onDestroy() {
    if (this.coinDelayTimer) {
      clearTimeout(this.coinDelayTimer);
    }
  }
}
