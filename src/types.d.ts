type AllianceConstant = ALLIANCE_ENEMY | ALLIANCE_UNFRIENDLY | ALLIANCE_NEUTRAL | ALLIANCE_FRIENDLY | ALLIANCE_ALLY;
type ALLIANCE_ENEMY = -2;
type ALLIANCE_UNFRIENDLY = -1;
type ALLIANCE_NEUTRAL = 0;
type ALLIANCE_FRIENDLY = 1;
type ALLIANCE_ALLY = 2;

interface Memory {
  warfare: {
    alliance: {
      [username: string]: AllianceConstant;
    };
  };
}

declare namespace NodeJS {
  interface Global {
    // Console commands.
    getAlliance: (username: string) => AllianceConstant;
    setAlliance: (username: string, alliance: AllianceConstant) => void;
  }
}
