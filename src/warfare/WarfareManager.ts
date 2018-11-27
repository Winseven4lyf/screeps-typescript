import { Tickable } from "Tickable";
import { TowerManager } from "./TowerManager";

export class WarfareManager implements Tickable {
  private towerManager: TowerManager;

  constructor() {
    this.towerManager = new TowerManager();
  }

  public tick() {
    this.towerManager.tick();
  }
}
