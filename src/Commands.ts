import { AllianceManager } from "warfare/AllianceManager";

const allianceManager = new AllianceManager();

global.getAlliance = allianceManager.get;
global.setAlliance = allianceManager.set;
