// Helldivers 2 Stratagem Data
// Updated from the latest in-game information

// Category types:
// General: Essential stratagems like Resupply, Reinforcement, etc.
// Support Weapons: Weapons that need to be carried and operated
// Supply: Vehicles and exosuits
// Backpack: Items that go into the backpack slot
// Defense: Sentries, emplacements, and other defensive items
// Mines: Deployable mine fields
// Orbital: Orbital strikes from the Patriotic Administration Center
// Eagle: Air strikes from Eagle cruisers

// Helper function for icon paths
function getStratagemIconPath(name) {
  // Convert the stratagem name to a lowercase slug
  const slug = name.toLowerCase().replace(/[\s\/\-]+/g, '_').replace(/[^\w]/g, '');
  return `icons/stratagems/${slug}.png`;
}

// Helper function to get backup icon URL from the wiki
function getWikiIconUrl(name) {
  // Replace spaces with underscores and add "_Icon.png"
  const formattedName = name.replace(/\s+/g, '_');
  return `https://static.wikia.nocookie.net/helldivers/images/c/c0/${formattedName}_Icon.png`;
}

const stratagemData = [
  // General Stratagems
  {
    name: "Reinforce",
    code: "UDRLU",
    type: "General",
    iconUrl: getWikiIconUrl("Reinforce"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_UP}{15}{-KC_UP}{15}"
  },
  {
    name: "SOS Beacon",
    code: "UDRU",
    type: "General",
    iconUrl: getWikiIconUrl("SOS_Beacon"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_UP}{15}{-KC_UP}{15}"
  },
  {
    name: "Resupply",
    code: "DDUR",
    type: "General",
    iconUrl: getWikiIconUrl("Resupply"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}"
  },
  {
    name: "NUX-223 Hellbomb",
    code: "DULDURDU",
    type: "General",
    iconUrl: getWikiIconUrl("NUX-223_Hellbomb"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}"
  },
  {
    name: "SEAF Artillery",
    code: "RUUD",
    type: "General",
    iconUrl: getWikiIconUrl("SEAF_Artillery"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}"
  },
  {
    name: "Super Earth Flag",
    code: "DUDU",
    type: "General",
    iconUrl: getWikiIconUrl("Super_Earth_Flag"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}"
  },
  {
    name: "Illumination Flare",
    code: "RRLL",
    type: "General",
    iconUrl: getWikiIconUrl("Illumination_Flare"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}"
  },
  {
    name: "Seismic Probe",
    code: "UULRDD",
    type: "General",
    iconUrl: getWikiIconUrl("Seismic_Probe"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}"
  },
  {
    name: "Upload Data",
    code: "LRUUU",
    type: "General",
    iconUrl: getWikiIconUrl("Upload_Data"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_UP}{15}{-KC_UP}{15}"
  },
  {
    name: "SSSD Delivery",
    code: "DDDUU",
    type: "General",
    iconUrl: getWikiIconUrl("SSSD_Delivery"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_UP}{15}{-KC_UP}{15}"
  },
  {
    name: "Eagle Rearm",
    code: "UULUR",
    type: "General",
    iconUrl: getWikiIconUrl("Eagle_Rearm"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}"
  },
  {
    name: "Hive Breaker Drill",
    code: "DDLRDD",
    type: "General",
    iconUrl: getWikiIconUrl("Hive_Breaker_Drill"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}"
  },
  
  // Support Weapons
  {
    name: "MG-43 Machine Gun",
    code: "DLDUR",
    type: "Support Weapons",
    iconUrl: getWikiIconUrl("MG-43_Machine_Gun"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}"
  },
  {
    name: "APW-1 Anti-Material Rifle",
    code: "DLRUD",
    type: "Support Weapons",
    iconUrl: getWikiIconUrl("APW-1_Anti-Material_Rifle"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}"
  },
  {
    name: "M-105 Stalwart",
    code: "DLDUUL",
    type: "Support Weapons",
    iconUrl: getWikiIconUrl("M-105_Stalwart"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}"
  },
  {
    name: "EAT-17 Expendable Anti-Tank",
    code: "DDLUR",
    type: "Support Weapons",
    iconUrl: getWikiIconUrl("EAT-17_Expendable_Anti-Tank"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}"
  },
  {
    name: "GR-8 Recoilless Rifle",
    code: "DLRRL",
    type: "Support Weapons",
    iconUrl: getWikiIconUrl("GR-8_Recoilless_Rifle"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}"
  },
  {
    name: "FLAM-40 Flamethrower",
    code: "DLUDU",
    type: "Support Weapons",
    iconUrl: getWikiIconUrl("FLAM-40_Flamethrower"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}"
  },
  {
    name: "AC-8 Autocannon",
    code: "DLDUUR",
    type: "Support Weapons",
    iconUrl: getWikiIconUrl("AC-8_Autocannon"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}"
  },
  {
    name: "MG-206 Heavy Machine Gun",
    code: "DLUDD",
    type: "Support Weapons",
    iconUrl: getWikiIconUrl("MG-206_Heavy_Machine_Gun"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}"
  },
  {
    name: "RS-422 Railgun",
    code: "DRLDUL",
    type: "Support Weapons",
    iconUrl: getWikiIconUrl("RS-422_Railgun"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}"
  },
  {
    name: "FAF-14 Spear Launcher",
    code: "DDUDD",
    type: "Support Weapons",
    iconUrl: getWikiIconUrl("FAF-14_Spear_Launcher"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}"
  },
  {
    name: "GL-21 Grenade Launcher",
    code: "DLULD",
    type: "Support Weapons",
    iconUrl: getWikiIconUrl("GL-21_Grenade_Launcher"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}"
  },
  {
    name: "LAS-98 Laser Cannon",
    code: "DLDUL",
    type: "Support Weapons",
    iconUrl: getWikiIconUrl("LAS-98_Laser_Cannon"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}"
  },
  {
    name: "ARC-3 Arc Thrower",
    code: "DRDULL",
    type: "Support Weapons",
    iconUrl: getWikiIconUrl("ARC-3_Arc_Thrower"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}"
  },
  {
    name: "LAS-99 Quasar Cannon",
    code: "DDULR",
    type: "Support Weapons",
    iconUrl: getWikiIconUrl("LAS-99_Quasar_Cannon"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}"
  },
  {
    name: "TX-14 Sterilizer",
    code: "DLDURL",
    type: "Support Weapons",
    iconUrl: getWikiIconUrl("TX-14_Sterilizer"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}"
  },
  {
    name: "MLS-4X Commando",
    code: "DLDUURL",
    type: "Support Weapons",
    iconUrl: getWikiIconUrl("MLS-4X_Commando"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}"
  },
  {
    name: "RL-77 Airburst Rocket Launcher",
    code: "DDURD",
    type: "Support Weapons",
    iconUrl: getWikiIconUrl("RL-77_Airburst_Rocket_Launcher"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}"
  },
  {
    name: "StA-X3_W.A.S.P. Launcher",
    code: "DDUDR",
    type: "Support Weapons",
    iconUrl: getWikiIconUrl("StA-X3_W.A.S.P._Launcher"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}"
  },
  
  // Supply
  {
    name: "M-102 Fast Recon Vehicle",
    code: "LDRDRDU",
    type: "Supply",
    iconUrl: getWikiIconUrl("M-102_Fast_Recon_Vehicle"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}"
  },
  {
    name: "EXO-49 Emancipator Exosuit",
    code: "LDRULD",
    type: "Supply",
    iconUrl: getWikiIconUrl("EXO-49_Emancipator_Exosuit"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}"
  },
  {
    name: "EXO-45 Patriot Exosuit",
    code: "LDRULDD",
    type: "Supply",
    iconUrl: getWikiIconUrl("EXO-45_Patriot_Exosuit"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}"
  },
  
  // Backpack Stratagems
  {
    name: "LIFT-850 Jump Pack",
    code: "DUUDU",
    type: "Backpack",
    iconUrl: getWikiIconUrl("LIFT-850_Jump_Pack"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}"
  },
  {
    name: "B-1 Supply Pack",
    code: "DLDUUD",
    type: "Backpack",
    iconUrl: getWikiIconUrl("B-1_Supply_Pack"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}"
  },
  {
    name: "AX/LAS-5 Guard Dog Rover",
    code: "DULURR",
    type: "Backpack",
    iconUrl: getWikiIconUrl("AX_LAS-5_Guard_Dog_Rover"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}"
  },
  {
    name: "AX/TX-13 Guard Dog Dog Breath",
    code: "DULURU",
    type: "Backpack",
    iconUrl: getWikiIconUrl("AX_TX-13_Guard_Dog_Dog_Breath"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_UP}{15}{-KC_UP}{15}"
  },
  {
    name: "SH-20 Ballistic Shield",
    code: "DLDDUL",
    type: "Backpack",
    iconUrl: getWikiIconUrl("SH-20_Ballistic_Shield"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}"
  },
  {
    name: "AX/AR-23 Guard Dog",
    code: "DULURD",
    type: "Backpack",
    iconUrl: getWikiIconUrl("AX_AR-23_Guard_Dog"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}"
  },
  {
    name: "SH-32 Shield Generator Pack",
    code: "DULRLR",
    type: "Backpack",
    iconUrl: getWikiIconUrl("SH-32_Shield_Generator_Pack"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}"
  },
  {
    name: "SH-51 Directional Shield Backpack",
    code: "DULRUU",
    type: "Backpack",
    iconUrl: getWikiIconUrl("SH-51_Directional_Shield_Backpack"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_UP}{15}{-KC_UP}{15}"
  },
  {
    name: "LIFT-860 Hover Pack",
    code: "DUUDLR",
    type: "Backpack",
    iconUrl: getWikiIconUrl("LIFT-860_Hover_Pack"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}"
  },
  {
    name: "B-100 Portable Hellbomb",
    code: "DRUUU",
    type: "Backpack",
    iconUrl: getWikiIconUrl("B-100_Portable_Hellbomb"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_UP}{15}{-KC_UP}{15}"
  },
  
  // Defense
  {
    name: "A/MG-43 Machine Sentry",
    code: "DURRU",
    type: "Defense",
    iconUrl: getWikiIconUrl("A_MG-43_Machine_Sentry"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_UP}{15}{-KC_UP}{15}"
  },
  {
    name: "E/FLAM-40 Flame Sentry",
    code: "DURDUU",
    type: "Defense",
    iconUrl: getWikiIconUrl("E_FLAM-40_Flame_Sentry"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_UP}{15}{-KC_UP}{15}"
  },
  {
    name: "A/G-16 Gatling Sentry",
    code: "DURL",
    type: "Defense",
    iconUrl: getWikiIconUrl("A_G-16_Gatling_Sentry"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}"
  },
  {
    name: "A/M-12 Mortar Sentry",
    code: "DURRD",
    type: "Defense",
    iconUrl: getWikiIconUrl("A_M-12_Mortar_Sentry"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}"
  },
  {
    name: "A/AC-8 Autocannon Sentry",
    code: "DURULU",
    type: "Defense",
    iconUrl: getWikiIconUrl("A_AC-8_Autocannon_Sentry"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_UP}{15}{-KC_UP}{15}"
  },
  {
    name: "A/MLS-4X Rocket Sentry",
    code: "DURRL",
    type: "Defense",
    iconUrl: getWikiIconUrl("A_MLS-4X_Rocket_Sentry"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}"
  },
  {
    name: "A/M-23 EMS Mortar Sentry",
    code: "DURDR",
    type: "Defense",
    iconUrl: getWikiIconUrl("A_M-23_EMS_Sentry"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}"
  },
  {
    name: "E/MG-101 HMG Emplacement",
    code: "DULRRL",
    type: "Defense",
    iconUrl: getWikiIconUrl("E_MG-101_HMG_Emplacement"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}"
  },
  {
    name: "A/ARC-3 Tesla Tower",
    code: "DURULR",
    type: "Defense",
    iconUrl: getWikiIconUrl("A_ARC-3_Tesla_Tower"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}"
  },
  {
    name: "E/GL-21 Grenadier Battlement",
    code: "DDLRLR",
    type: "Defense",
    iconUrl: getWikiIconUrl("E_GL-21_Grenadier_Battlement"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}"
  },
  {
    name: "E/AT-12 Anti-Tank Emplacement",
    code: "DULRRR",
    type: "Defense",
    iconUrl: getWikiIconUrl("E_AT-12_Anti-Tank_Emplacement"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}"
  },
  {
    name: "FX-12 Shield Generator Relay",
    code: "DDLRLR",
    type: "Defense",
    iconUrl: getWikiIconUrl("FX-12_Shield_Generator_Relay"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}"
  },
  
  // Mines
  {
    name: "MD-6 Anti-Personnel Minefield",
    code: "DLUR",
    type: "Mines",
    iconUrl: getWikiIconUrl("MD-6_Anti-Personnel_Minefield"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}"
  },
  {
    name: "MD-17 Anti-Tank Mines",
    code: "DLUU",
    type: "Mines",
    iconUrl: getWikiIconUrl("MD-17_Anti-Tank_Mines"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_UP}{15}{-KC_UP}{15}"
  },
  {
    name: "MD-I4 Incendiary Mines",
    code: "DLLD",
    type: "Mines",
    iconUrl: getWikiIconUrl("MD-I4_Incendiary_Mines"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}"
  },
  {
    name: "MD-8 Gas Mines",
    code: "DLLR",
    type: "Mines",
    iconUrl: getWikiIconUrl("MD-8_Gas_Mines"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}"
  },
  
  // Orbital Strikes
  {
    name: "Orbital Gatling Barrage",
    code: "RDLUU",
    type: "Orbital",
    iconUrl: getWikiIconUrl("Orbital_Gatling_Barrage"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_UP}{15}{-KC_UP}{15}"
  },
  {
    name: "Orbital Airburst Strike",
    code: "RRR",
    type: "Orbital",
    iconUrl: getWikiIconUrl("Orbital_Airburst_Strike"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}"
  },
  {
    name: "Orbital 120mm HE Barrage",
    code: "RDLRD",
    type: "Orbital",
    iconUrl: getWikiIconUrl("Orbital_120mm_HE_Barrage"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}"
  },
  {
    name: "Orbital 380mm HE Barrage",
    code: "RDUULDD",
    type: "Orbital",
    iconUrl: getWikiIconUrl("Orbital_380mm_HE_Barrage"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}"
  },
  {
    name: "Orbital Walking Barrage",
    code: "RDRDRDR",
    type: "Orbital",
    iconUrl: getWikiIconUrl("Orbital_Walking_Barrage"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}"
  },
  {
    name: "Orbital Napalm Barrage",
    code: "RRDLRU",
    type: "Orbital",
    iconUrl: getWikiIconUrl("Orbital_Napalm_Barrage"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_UP}{15}{-KC_UP}{15}"
  },
  {
    name: "Orbital Laser",
    code: "RDURD",
    type: "Orbital",
    iconUrl: getWikiIconUrl("Orbital_Laser"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}"
  },
  {
    name: "Orbital Railcannon Strike",
    code: "RUDDR",
    type: "Orbital",
    iconUrl: getWikiIconUrl("Orbital_Railcannon_Strike"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}"
  },
  {
    name: "Orbital Precision Strike",
    code: "RRU",
    type: "Orbital",
    iconUrl: getWikiIconUrl("Orbital_Precision_Strike"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_UP}{15}{-KC_UP}{15}"
  },
  {
    name: "Orbital Gas Strike",
    code: "RRDR",
    type: "Orbital",
    iconUrl: getWikiIconUrl("Orbital_Gas_Strike"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}"
  },
  {
    name: "Orbital EMS Strike",
    code: "RRLD",
    type: "Orbital",
    iconUrl: getWikiIconUrl("Orbital_EMS_Strike"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}"
  },
  {
    name: "Orbital Smoke Strike",
    code: "RRDU",
    type: "Orbital",
    iconUrl: getWikiIconUrl("Orbital_Smoke_Strike"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}"
  },
  
  // Eagle Strikes
  {
    name: "Eagle Strafing Run",
    code: "URR",
    type: "Eagle",
    iconUrl: getWikiIconUrl("Eagle_Strafing_Run"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}"
  },
  {
    name: "Eagle Airstrike",
    code: "URDR",
    type: "Eagle",
    iconUrl: getWikiIconUrl("Eagle_Airstrike"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}"
  },
  {
    name: "Eagle Cluster Bomb",
    code: "URDDR",
    type: "Eagle",
    iconUrl: getWikiIconUrl("Eagle_Cluster_Bomb"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}"
  },
  {
    name: "Eagle Napalm Airstrike",
    code: "URDU",
    type: "Eagle",
    iconUrl: getWikiIconUrl("Eagle_Napalm_Airstrike"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_UP}{15}{-KC_UP}{15}"
  },
  {
    name: "Eagle Smoke Strike",
    code: "URUD",
    type: "Eagle",
    iconUrl: getWikiIconUrl("Eagle_Smoke_Strike"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}"
  },
  {
    name: "Eagle 110mm Rockets",
    code: "URUL",
    type: "Eagle",
    iconUrl: getWikiIconUrl("Eagle_110mm_Rockets"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}"
  },
  {
    name: "Eagle 500kg Bomb",
    code: "URDDD",
    type: "Eagle",
    iconUrl: getWikiIconUrl("Eagle_500kg_Bomb"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}"
  },
  
  // Additional Stratagems
  {
    name: "CQC-1 One True Flag",
    code: "DLRRU",
    type: "General",
    iconUrl: getWikiIconUrl("CQC-1_One_True_Flag"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_DOWN}{15}{-KC_DOWN}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_UP}{15}{-KC_UP}{15}"
  },
  {
    name: "GL-52 De-Escalator",
    code: "LRULR",
    type: "Support Weapons",
    iconUrl: getWikiIconUrl("GL-52_De-Escalator"),
    macroString: "{+KC_I}{30}{-KC_I}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}{+KC_UP}{15}{-KC_UP}{15}{+KC_LEFT}{15}{-KC_LEFT}{15}{+KC_RGHT}{15}{-KC_RGHT}{15}"
  }
];

// Helper functions for macro generation

// Generate VIA macro string from stratagem code
function generateMacroString(code) {
  // Start with pressing and releasing the 'I' key
  let macroString = "{+KC_I}{30}{-KC_I}{15}";
  
  // Process each character in the code
  for (const direction of code) {
    switch (direction) {
      case 'U':
        macroString += "{+KC_UP}{15}{-KC_UP}{15}";
        break;
      case 'D':
        macroString += "{+KC_DOWN}{15}{-KC_DOWN}{15}";
        break;
      case 'L':
        macroString += "{+KC_LEFT}{15}{-KC_LEFT}{15}";
        break;
      case 'R':
        macroString += "{+KC_RGHT}{15}{-KC_RGHT}{15}";
        break;
      case 'S': // Special case for 'S' (used in some codes like Machinegun Sentry - "DRSS")
        macroString += "{+KC_DOWN}{15}{-KC_DOWN}{15}"; // For this app, we'll treat 'S' as 'Down'
        break;
    }
  }
  
  return macroString;
}

// Find stratagem by name
function findStratagemByName(name) {
  return stratagemData.find(stratagem => stratagem.name === name);
}

// Get stratagem icon URL by name
function getStratagemIconUrl(name) {
  const stratagem = findStratagemByName(name);
  return stratagem ? stratagem.iconUrl : null;
}
