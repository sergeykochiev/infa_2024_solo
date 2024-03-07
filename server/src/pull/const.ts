export const fetchData = {
    hoyoUrl: 'https://api-os-takumi.mihoyo.com/common/gacha_record/api/getGachaLog',
    hoyoParams: {
        lang: 'en',
        size: 20,
        authkey_ver: 1,
        game_biz: 'hkrpg_global'
    }
} as const