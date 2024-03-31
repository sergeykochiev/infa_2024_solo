import { BannerType } from "src/common/types/types";

export class Banner {
    constructor(
        public id: number,
        public type: BannerType,
        public name?: string,
    ) {}
}