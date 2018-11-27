import { Tickable } from "Tickable";
import { TowerManager } from "./TowerManager";

/**
 * Manages warfare.
 */
export class WarfareManager implements Tickable {
  private towerManager: TowerManager;

  constructor() {
    this.towerManager = new TowerManager();
  }

  public tick() {
    this.towerManager.tick();
  }
}
