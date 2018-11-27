import { ALLIANCE_NEUTRAL } from "Constants";

/**
 * Manages alliances with other users.
 */
export class AllianceManager {
  /**
   * Gets an alliance for a user.
   * @param username The user to get the alliance of.
   * @returns The alliance of the user if in memory, otherwise ALLIANCE_NEUTRAL.
   */
  public get(username: string): AllianceConstant {
    return _.get(Memory, `warfare.alliance.${username}`, ALLIANCE_NEUTRAL);
  }

  /**
   * Sets an alliance for a user.
   * @param username The user to set the alliance of.
   * @param alliance The alliance value to set.
   */
  public set(username: string, alliance: AllianceConstant) {
    _.set(Memory, `warfare.alliance.${username}`, alliance);
  }

  /**
   * Gets creeps in room whose owner has alliance.
   * @param room The room to search.
   * @param alliance The alliance to compare with creeps' owner's alliance.
   * @param compare The function used to compare the alliances.
   * @returns The creeps found.
   */
  public getCreeps(room: Room, alliance: AllianceConstant, compare: (a: number, b: number) => boolean = _.eq): Creep[] {
    return _.filter(room.find(FIND_CREEPS), creep => compare(this.get(creep.owner.username), alliance));
  }
}
