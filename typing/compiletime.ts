//@ts-nocheck

import { WarObjectType } from "../objEdit"
import { abilityAndHeroDataKeys, AbilityData, HeroAbilityData } from "./ability"
import { BuffDataInput, buffDataKeys } from "./buff"
import { DestructableData, destructableDataKeys } from "./destructable"
import { DoodadData, doodadDataKeys } from "./doodad"
import { itemDataKeys } from "./item"
import { TargetType, unitAndHeroDataKeys } from "./unit"
import { UpgradeData, upgradeDataKeys } from "./upgrade"

compiletime(() => {
    FourCC = (id: string): number => string.unpack(">I4", id)[0]

    const divNum = (val: number, by: number) => (val - (val % by)) / by

    const rawToStr = (id: rawcode) => {
        let result
        if (typeof id === "number") result = string.pack(">I4", id)
        else result = id
        return result
    }

    IdGenerator = class {
        private i1: integer
        private i2: integer
        private i3: integer
        private i4: integer

        constructor(start: rawcode) {
            if (typeof start === "string") start = FourCC(start)
            this.i1 = start % 256
            this.i2 = divNum(start % 65536, 256)
            this.i3 = divNum(start % 16777216, 65536)
            this.i4 = divNum(start, 16777216)
        }

        isInvalid(char: integer) {
            return char < 48 || (char > 57 && char < 97)
        }

        next() {
            const max_char = "~".charCodeAt(0)
            const endChar = "!".charCodeAt(0)
            if (this.i1 < max_char) {
                this.i1++
                while (this.isInvalid(this.i1)) this.i1++
            } else if (this.i2 < max_char) {
                this.i1 = endChar
                this.i2++
                while (this.isInvalid(this.i2)) this.i2++
            } else if (this.i3 < max_char) {
                this.i1 = endChar
                this.i2 = endChar
                this.i3++
                while (this.isInvalid(this.i3)) this.i3++
            } else if (this.i4 < max_char) {
                this.i1 = endChar
                this.i2 = endChar
                this.i3 = endChar
                this.i4++
                while (this.isInvalid(this.i4)) this.i4++
            } else {
                error("Переполнение ID разрядной сетки", 2)
            }
            let id = this.i1 + this.i2 * 256 + this.i3 * 65536 + this.i4 * 16777216
            return rawToStr(id)
        }
    }

    UNIT_ID_START = new IdGenerator("x000")
    HERO_ID_START = new IdGenerator("HM00")
    ABIL_ID_START = new IdGenerator("AM00")
    BUFF_ID_START = new IdGenerator("BM00")
    ITEM_ID_START = new IdGenerator("IM00")
    UPGD_ID_START = new IdGenerator("RM00")

    WeapsOn = {}
    DeathType = {}
    SpellDetail = {}
    WeapsOn.None = 0
    WeapsOn[WeapsOn.None] = "None"
    WeapsOn.OnlyAttackOne = 1
    WeapsOn[WeapsOn.OnlyAttackOne] = "OnlyAttackOne"
    WeapsOn.OnlyAttackTwo = 2
    WeapsOn[WeapsOn.OnlyAttackTwo] = "OnlyAttackTwo"
    WeapsOn.BothAttacks = 3
    WeapsOn[WeapsOn.BothAttacks] = "BothAttacks"

    DeathType.CannotRevive_NotDecompose = 0
    DeathType[DeathType.CannotRevive_NotDecompose] = "CannotRevive_NotDecompose"
    DeathType.CanRevive_NotDecompose = 1
    DeathType[DeathType.CanRevive_NotDecompose] = "CanRevive_NotDecompose"
    DeathType.CannotRevive_Decompose = 2
    DeathType[DeathType.CannotRevive_Decompose] = "CannotRevive_Decompose"
    DeathType.CanRevive_Decompose = 3
    DeathType[DeathType.CanRevive_Decompose] = "CanRevive_Decompose"

    unitDataKeys = new Set([
        "ua1m",
        "backSw1",
        "dmgpt1",
        "dmgplus1",
        "RngBuff1",
        "umh1",
        "cool1",
        "rangeN1",
        "spillDist1",
        "targs1",
        "weapType1",
        "targCount1",
        "showUI1",
        "Farea1",
        "Qarea1",
        "Harea1",
        "splashTargs1",
        "spillRadius1",
        "ua1z",
        "atkType1",
        "weapTp1",
        "uma1",
        "dmgUp1",
        "Qfact1",
        "Hfact1",
        "sides1",
        "dice1",
        "damageLoss1",
        "ua2m",
        "backSw2",
        "dmgpt2",
        "dmgplus2",
        "RngBuff2",
        "umh2",
        "cool2",
        "rangeN2",
        "spillDist2",
        "targs2",
        "weapType2",
        "targCount2",
        "showUI2",
        "Farea2",
        "Qarea2",
        "Harea2",
        "splashTargs2",
        "spillRadius2",
        "ua2z",
        "atkType2",
        "weapTp2",
        "uma2",
        "dmgUp2",
        "Qfact2",
        "Hfact2",
        "sides2",
        "dice2",
        "damageLoss2",
        "WeapsOn",
        "acquire",
        "def",
        "minRange",
        "targType",
        "defUp",
        "armor",
        "defType",
        "DeathType",
        "blend",
        "castbsw",
        "run",
        "walk",
        "castpt",
        "death",
        "selZ",
        "fatLOS",
        "selCircOnWater",
        "maxPitch",
        "maxRoll",
        "modelScale",
        "scaleBull",
        "elevRad",
        "elevPts",
        "animProps",
        "Attachmentanimprops",
        "Specialart",
        "unitShadow",
        "shadowH",
        "shadowX",
        "shadowY",
        "shadowW",
        "impactZ",
        "impactSwimZ",
        "Art",
        "ScoreScreenIcon",
        "orientInterp",
        "ubpx",
        "ubpy",
        "occH",
        "customTeamColor",
        "propWin",
        "Attachmentlinkprops",
        "buildingShadow",
        "shadowOnWater",
        "launchX",
        "launchY",
        "launchZ",
        "launchSwimZ",
        "Boneprops",
        "fogRad",
        "Casterupgradeart",
        "file",
        "fileVerFlags",
        "red",
        "green",
        "blue",
        "teamColor",
        "Targetart",
        "scale",
        "spd",
        "moveHeight",
        "maxSpd",
        "moveFloor",
        "minSpd",
        "repulse",
        "repulseGroup",
        "repulseParam",
        "repulsePrio",
        "turnRate",
        "movetp",
        "MovementSoundLabel",
        "unitSound",
        "LoopingSoundFadeOut",
        "LoopingSoundFadeIn",
        "RandomSoundLabel",
        "buffRadius",
        "buffType",
        "collision",
        "tilesetSpecific",
        "campaign",
        "special",
        "useClickHelper",
        "hostilePal",
        "dropItems",
        "inEditor",
        "tilesets",
        "abilList",
        "auto",
        "Hotkey",
        "Name",
        "EditorSuffix",
        "Description",
        "Tip",
        "Ubertip",
        "Casterupgradename",
        "Casterupgradetip",
        "DependencyOr",
        "Sellunits",
        "Builds",
        "Sellitems",
        "Requires",
        "Requiresamount",
        "upgrades",
        "stockInitial",
        "regenMana",
        "reptm",
        "bldtm",
        "stockStart",
        "mana0",
        "stockRegen",
        "type",
        "stockMax",
        "HP",
        "manaN",
        "cargoSize",
        "canFlee",
        "bountyplus",
        "bountysides",
        "bountydice",
        "points",
        "formation",
        "lumberbountyplus",
        "lumberbountydies",
        "lumberbountydice",
        "prio",
        "fmade",
        "sight",
        "nsight",
        "race",
        "regenHP",
        "hideOnMinimap",
        "canSleep",
        "RegenType",
        "lumbercost",
        "lumberRep",
        "goldcost",
        "goldRep",
        "fused",
        "level",
        "isbldq"
    ])

    heroUnitDataKeys = new Set([
        "heroAbilList",
        "Propernames",
        "nameCount",
        "Revivetip",
        "Awakentip",
        "Reviveat",
        "Requirescount",
        "Requires",
        "hideHeroMinimap",
        "hideHeroBar",
        "hideHeroDeathMsg",
        "AGI",
        "STR",
        "INT",
        "Primary",
        "AGIplus",
        "INTplus",
        "STRplus"
    ])

    unitAndHeroDataKeys = unitDataKeys

    heroUnitDataKeys.forEach(v => {
        unitAndHeroDataKeys.add(v)
    })

    unitDataOutputKeys = new Set([
        "RngBuff1",
        "spillDist1",
        "showUI1",
        "Farea1",
        "Qarea1",
        "Harea1",
        "splashTargs1",
        "spillRadius1",
        "dmgUp1",
        "Qfact1",
        "Hfact1",
        "damageLoss1",
        "RngBuff2",
        "spillDist2",
        "showUI2",
        "Farea2",
        "Qarea2",
        "Harea2",
        "splashTargs2",
        "spillRadius2",
        "dmgUp2",
        "Qfact2",
        "Hfact2",
        "damageLoss2",
        "blend",
        "fatLOS",
        "elevRad",
        "elevPts",
        "impactZ",
        "impactSwimZ",
        "ScoreScreenIcon",
        "orientInterp",
        "occH",
        "customTeamColor",
        "propWin",
        "Attachmentlinkprops",
        "launchX",
        "launchY",
        "launchZ",
        "launchSwimZ",
        "Boneprops",
        "fogRad",
        "Casterupgradeart",
        "fileVerFlags",
        "maxSpd",
        "moveFloor",
        "minSpd",
        "LoopingSoundFadeOut",
        "LoopingSoundFadeIn",
        "RandomSoundLabel",
        "buffRadius",
        "buffType",
        "tilesetSpecific",
        "campaign",
        "special",
        "useClickHelper",
        "hostilePal",
        "inEditor",
        "tilesets",
        "EditorSuffix",
        "type",
        "prio"
    ])

    itemDataKeys = new Set([
        "armor",
        "file",
        "scale",
        "Art",
        "ubpx",
        "ubpy",
        "selSize",
        "colorR",
        "colorG",
        "colorB",
        "abilList",
        "Hotkey",
        "Name",
        "Description",
        "Tip",
        "Ubertip",
        "Requires",
        "Requiresamount",
        "stockInitial",
        "pickRandom",
        "stockStart",
        "stockRegen",
        "powerup",
        "class",
        "uses",
        "stockMax",
        "droppable",
        "perishable",
        "sellable",
        "pawnable",
        "cooldownID",
        "usable",
        "morph",
        "drop",
        "prio",
        "ignoreCD",
        "HP",
        "lumbercost",
        "goldcost",
        "Level",
        "oldLevel"
    ])

    destructableDataKeys = new Set([
        "armor",
        "targType",
        "fogVis",
        "flyH",
        "occH",
        "texID",
        "texFile",
        "maxRoll",
        "maxPitch",
        "useMMColor",
        "showInMM",
        "selectable",
        "radius",
        "fogRadius",
        "selcircsize",
        "selSize",
        "shadow",
        "fatLOS",
        "lightweight",
        "file",
        "numVar",
        "portraitmodel",
        "fixedRot",
        "colorR",
        "colorG",
        "colorB",
        "MMRed",
        "MMGreen",
        "MMBlue",
        "deathSnd",
        "cliffHeight",
        "walkable",
        "pathTex",
        "pathTexDeath",
        "UserList",
        "tilesetSpecific",
        "category",
        "maxScale",
        "minScale",
        "canPlaceRandScale",
        "onWater",
        "onCliffs",
        "canPlaceDead",
        "useClickHelper",
        "tilesets",
        "Name",
        "EditorSuffix",
        "repairTime",
        "buildTime",
        "HP",
        "lumberRep",
        "goldRep"
    ])

    doodadDataKeys = new Set([
        "animInFog",
        "numVar",
        "showInFog",
        "shadow",
        "maxRoll",
        "maxPitch",
        "defScale",
        "useMMColor",
        "showInMM",
        "floats",
        "visRadius",
        "selSize",
        "file",
        "fixedRot",
        "vertR",
        "vertG",
        "vertB",
        "MMRed",
        "MMGreen",
        "MMBlue",
        "soundLoop",
        "walkable",
        "pathTex",
        "UserList",
        "tilesetSpecific",
        "category",
        "useClickHelper",
        "maxScale",
        "minScale",
        "canPlaceRandScale",
        "onWater",
        "onCliffs",
        "ignoreModelClick",
        "tilesets",
        "Name"
    ])

    abilityDataKeys = new Set([
        "Animnames",
        "Missileart",
        "MissileHoming",
        "Targetattach",
        "Targetattach1",
        "Targetattach2",
        "Targetattach3",
        "Targetattach4",
        "Targetattach5",
        "Targetattachcount",
        "CasterArt",
        "Areaeffectart",
        "SpecialArt",
        "Specialattach",
        "Art",
        "Unart",
        "abpx",
        "abpy",
        "aubx",
        "auby",
        "Missilespeed",
        "Casterattach",
        "Casterattach1",
        "Casterattachcount",
        "Missilearc",
        "TargetArt",
        "EffectArt",
        "LightningEffect",
        "Effectsound",
        "Effectsoundlooped",
        "Hotkey",
        "Unhotkey",
        "Name",
        "Tip",
        "Ubertip",
        "Untip",
        "Unubertip",
        "Order",
        "Unorder",
        "Orderon",
        "Orderoff",
        "EditorSuffix",
        "checkDep",
        "Requires",
        "Requiresamount",
        "Cast",
        "HeroDur",
        "Dur",
        "BuffID",
        "Cost",
        "Area",
        "hero",
        "item",
        "Cool",
        "priority",
        "Rng",
        "targs",
        "race",
        "levels",
        "EfctID",
        "DataA",
        "DataB",
        "DataC",
        "DataD",
        "DataE",
        "DataF",
        "DataG",
        "DataH",
        "DataI",
        "UnitID"
    ])

    heroAbilityDataKeys = new Set(["Researchtip", "Researchubertip"])

    // abilityAndHeroDataKeys = new Set([...abilityDataKeys, ...heroAbilityDataKeys])

    abilityAndHeroDataKeys = abilityDataKeys

    heroAbilityDataKeys.forEach(v => {
        abilityAndHeroDataKeys.add(v)
    })

    buffDataKeys = new Set([
        "Missileart",
        "MissileHoming",
        "Targetattach",
        "Targetattach1",
        "Targetattach2",
        "Targetattach3",
        "Targetattach4",
        "Targetattach5",
        "Targetattachcount",
        "LightningEffect",
        "SpecialArt",
        "Specialattach",
        "Buffart",
        "Missilespeed",
        "Effectattach",
        "Missilearc",
        "Spelldetail",
        "TargetArt",
        "EffectArt",
        "Effectsound",
        "Effectsoundlooped",
        "EditorName",
        "Bufftip",
        "Buffubertip",
        "EditorSuffix",
        "race",
        "isEffect"
    ])

    upgradeDataKeys = new Set([
        "gbpx",
        "gbpy",
        "effect",
        "base",
        "mod",
        "class",
        "global",
        "race",
        "timebase",
        "timemod",
        "lumberbase",
        "lumbermod",
        "goldbase",
        "goldmod",
        "maxlevel",
        "inherit",
        "Art",
        "Hotkey",
        "Name",
        "Tip",
        "Ubertip",
        "EditorSuffix",
        "Requires",
        "Requiresamount"
    ])

    const getDataKeys = (objType: WarObjectType) => {
        if (objType == "unit") return unitAndHeroDataKeys
        else if (objType == "item") return itemDataKeys
        else if (objType == "destructable") return destructableDataKeys
        else if (objType == "doodad") return doodadDataKeys
        else if (objType == "ability") return abilityAndHeroDataKeys
        else if (objType == "buff") return buffDataKeys
        else if (objType == "upgrade") return upgradeDataKeys
    }

    SpellDetail.Low = 0
    SpellDetail[SpellDetail.Low] = "Low"
    SpellDetail.Medium = 1
    SpellDetail[SpellDetail.Medium] = "Medium"
    SpellDetail.High = 2
    SpellDetail[SpellDetail.High] = "High"

    const validateArr = <T extends any>(arr: List<T>): string => arr.join(',')
    
    const validateLevelArr = <T extends Object>(arr: [ string, LevelProp<T> ], levels: integer): [string, Primitive][] => {
        const key = arr[0]
        const value = arr[1]
        const result = []
        for (let i = 0; i < levels; i++) {
            result[i] = []
            result[i][0] = `${key}${i}`
            let validValue: Primitive
            if (typeof value == 'function') {
                validValue = value(i)
            } else if (typeof value == 'object') {
                if (typeof value[i] == 'object') {
                    validValue = validateArr(value)
                } else {
                    validValue = value[i]
                }
            } else {
                validValue = value
            }
            result[i][1] = validValue
        }
        return result
    }

    let generateObject = (objType: WarObjectType, data: any, map: WarMap) => {
        const newObject = map?.objects[objType].getObject(rawToStr(data.parentId)).clone()

        let metadata = {}

        const keys = getDataKeys(objType)

        keys.forEach(key => {
            if (!data[key] && (!(type(key) == 'table'))) {
                metadata[key] = newObject[key]
            }
        })

        for (const [key, value] of pairs(data)) {
            if (key == "id" || key == "parentId") continue
            newObject[key] = value
            metadata[key] = value
        }

        map?.objects[objType].setObject(rawToStr(data.id), newObject!)

        return metadata
    }

    generateUnit = (data: UnitDataInput, map: WarMap = currentMap): UnitData =>
        generateObject("unit", data, map)
    generateHero = (data: HeroUnitDataInput, map: WarMap = currentMap): HeroUnitData =>
        generateUnit(data, map)
    generateItem = (data: ItemDataInput, map: WarMap = currentMap): ItemData =>
        generateObject("item", data, map)
    generateDestructable = (
        data: DestructableDataInput,
        map: WarMap = currentMap
    ): DestructableData => generateObject("destructable", data, map)
    generateDoodad = (data: DoodadDataInput, map: WarMap = currentMap): DoodadData =>
        generateObject("doodad", data, map)
    generateAbility = (data: AbilityDataInput, map: WarMap = currentMap): AbilityData =>
        generateObject("ability", data, map)
    generateHeroAbility = (data: HeroAbilityDataInput, map: WarMap = currentMap): HeroAbilityData =>
        generateAbility(data, map)
    generateBuff = (data: BuffDataInput, map: WarMap = currentMap): BuffData =>
        generateObject("buff", data, map)
    generateUpgrade = (data: UpgradeDataInput, map: WarMap = currentMap): UpgradeData =>
        generateObject("upgrade", data, map)
})
