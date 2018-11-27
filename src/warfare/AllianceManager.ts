import { ALLIANCE_NEUTRAL } from "Constants";

export class AllianceManager {
  /** Gets an alliance for a user. */
  public get(username: string): AllianceConstant {
    return _.get(Memory, `warfare.alliance.${username}`, ALLIANCE_NEUTRAL);
  }

  /** Sets an alliance for a user. */
  public set(username: string, alliance: AllianceConstant) {
    _.set(Memory, `warfare.alliance.${username}`, alliance);
  }

  public getCreeps(room: Room, alliance: AllianceConstant, compare: (a: number, b: number) => boolean = _.eq): Creep[] {
    return _.filter(room.find(FIND_CREEPS), creep => compare(this.get(creep.owner.username), alliance));
  }
}
