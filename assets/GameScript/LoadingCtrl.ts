// LoadingCtrl.ts
import { _decorator, Component, ProgressBar, Node, Label } from "cc";
const { ccclass, property } = _decorator;

@ccclass("LoadingCtrl")
export class LoadingCtrl extends Component {
  @property(ProgressBar)
  progressBar: ProgressBar = null!;

  @property(Label)
  connectingLabel: Label = null!;

  @property(Node)
  bgAnimNode: Node = null!;

  @property(Node)
  ballAnimNode: Node = null!;

  @property(Node)
  multiplierNode: Node = null!;

  private targetProgress: number = 0;
  private currentProgress: number = 0;
  private isAnimating: boolean = false;
  private dotInterval: any = null;
  private dotCount: number = 0;
  private isConnected: boolean = false;

  start() {
    this.node.active = false;
    if (this.progressBar) {
      this.progressBar.progress = 0;
    }

    this.hideGameNodes();
    this.showConnecting();
  }

  // ─── Connecting Logic ────────────────────────────────
  showConnecting() {
    if (this.connectingLabel) {
      this.connectingLabel.node.active = true;
      this.connectingLabel.string = "Connecting";
    }

    this.dotInterval = setInterval(() => {
      this.dotCount = (this.dotCount + 1) % 4;
      const dots = ".".repeat(this.dotCount);
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

  onPlaneData(countdownValue: number, status: number) {
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

  update(deltaTime: number) {
    if (!this.isAnimating || !this.progressBar) return;
    const speed = 3;
    this.currentProgress +=
      (this.targetProgress - this.currentProgress) * deltaTime * speed;
    if (Math.abs(this.currentProgress - this.targetProgress) < 0.001) {
      this.currentProgress = this.targetProgress;
      this.isAnimating = false;
    }
    this.progressBar.progress = this.currentProgress;
  }

  onDestroy() {
    clearInterval(this.dotInterval);
  }
}
