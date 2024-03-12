import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BannerSchema } from './entity/banner.entitySchema';
import { Repository } from 'typeorm';
import { Banner } from './entity/banner.entity';

@Injectable()
export class BannerService {
    constructor(
        @InjectRepository(BannerSchema)
        private readonly bannerRepository: Repository<Banner>
    ) {}

    async getAll(): Promise<Array<Banner>> {
        return await this.bannerRepository.find()
    }

    async save(banner: Banner): Promise<void> {
        await this.bannerRepository.save(banner)
    }
}
