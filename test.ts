import { generateUnit, UNIT_ID_START } from "./objEdit"
import { UnitData } from "./typing/unit"


export const Footman: UnitData = compiletime(() => {
    return generateUnit({
        parentId: 'hfoo',
        id: UNIT_ID_START.next(),
        Name: "Custom Footman"
    })
})