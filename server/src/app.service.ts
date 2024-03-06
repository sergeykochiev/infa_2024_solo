import { Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';
import { PullService } from './pull/pull.service';
import { GameAccountService } from './gameacc/gameacc.service';
import { BannerType } from './pull/entity/pull.entity';
import { GameAccount } from './gameacc/entity/gameacc.entity';
import { fetchData } from './pull/const';
import { User } from './user/entity/user.entity';

@Injectable()
export class AppService {}
