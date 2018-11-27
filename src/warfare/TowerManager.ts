import { ALLIANCE_ALLY, ALLIANCE_ENEMY, ALLIANCE_FRIENDLY, ALLIANCE_NEUTRAL, ALLIANCE_UNFRIENDLY } from "Constants";
import { Tickable } from "Tickable";
import { AllianceManager } from "./AllianceManager";

export class TowerManager implements Tickable {
  private allianceManager: AllianceManager;

  constructor() {
    this.allianceManager = new AllianceManager();
  }

  public tick() {
    const groups = _(Game.structures)
      .filter<StructureTower>("structureType", STRUCTURE_TOWER)
      .groupBy("room.name")
      .value();

    for (const roomName in groups) {
      const group = groups[roomName];
      const room = Game.rooms[roomName];

      // Attack enemy creeps.
      const enemyCreeps = this.allianceManager.getCreeps(room, ALLIANCE_ENEMY);
      if (enemyCreeps.length > 0) {
        const target = pickTarget(enemyCreeps);
        _.forEach(group, tower => tower.attack(target));
      } else {
        // Attack unfriendly creeps.
        const unfriendlyCreeps = this.allianceManager.getCreeps(room, ALLIANCE_UNFRIENDLY);
        if (unfriendlyCreeps.length > 0) {
          const target = pickTarget(unfriendlyCreeps);
          _.forEach(group, tower => tower.attack(target));
        } else {
          // Attack neutral creeps.
          // TODO: Don't attack neutral creeps, but set those who attack to unfriendly.
          const neutralCreeps = this.allianceManager.getCreeps(room, ALLIANCE_NEUTRAL);
          if (neutralCreeps.length > 0) {
            const target = pickTarget(neutralCreeps);
            _.forEach(group, tower => tower.attack(target));
          } else {
            // Heal own creeps.
            const ownCreeps = doesNeedHealing(room.find(FIND_MY_CREEPS));
            if (ownCreeps.length > 0) {
              const target = _.sample(ownCreeps);
              _.forEach(group, tower => tower.heal(target));
            } else {
              // Heal ally creeps.
              const allyCreeps = doesNeedHealing(this.allianceManager.getCreeps(room, ALLIANCE_ALLY));
              if (allyCreeps.length > 0) {
                const target = _.sample(allyCreeps);
                _.forEach(group, tower => tower.heal(target));
              } else {
                // Heal friendly creeps.
                const friendlyCreeps = doesNeedHealing(this.allianceManager.getCreeps(room, ALLIANCE_FRIENDLY));
                if (friendlyCreeps.length > 0) {
                  const target = _.sample(friendlyCreeps);
                  _.forEach(group, tower => tower.heal(target));
                } else {
                  // Repair own structures.
                  const ownStructures = doesNeedHealing(room.find(FIND_MY_STRUCTURES));
                  if (ownStructures.length > 0) {
                    const target = _.sample(ownStructures);
                    _.forEach(group, tower => tower.repair(target));
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

function pickTarget(creeps: Creep[]): Creep {
  let found = _.find(creeps, creep => _.some(creep.body, "type", HEAL));
  if (found !== undefined) {
    return found;
  } else {
    found = _.find(creeps, creep => _.some(creep.body, "type", RANGED_ATTACK));
    if (found !== undefined) {
      return found;
    } else {
      found = _.find(creeps, creep => _.some(creep.body, "type", ATTACK));
      if (found !== undefined) {
        return found;
      } else {
        return _.sample(creeps);
      }
    }
  }
}

function doesNeedHealing<T extends Creep | Structure>(objects: _.List<T>): T[] {
  return _.filter(objects, object => object.hits < object.hitsMax);
}
