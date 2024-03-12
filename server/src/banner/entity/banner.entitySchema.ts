import { EntitySchema } from "typeorm"
import { Banner } from "./banner.entity"
import { BannerType } from "src/pull/entity/pull.entity"

export const BannerSchema = new EntitySchema<Banner>({
    name: 'Banner',
    target: Banner,
    columns: {
        id: {
            type: Number,
            primary: true
        },
        name: {
            type: String,
            nullable: true,
            default: null
        },
        type: {
            type: 'enum',
            enum: BannerType
        }
    }
})