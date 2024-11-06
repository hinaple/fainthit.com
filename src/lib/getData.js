import request from "./request";

const Cached = {};

export default async (types = []) => {
    types = types.map((t) => t.toUpperCase());
    let data = {};
    const needed = types.filter((t) => {
        const cache = Cached[t];
        if (
            !cache ||
            !cache?.expiredAt ||
            cache.expiredAt <= new Date().getTime()
        )
            return true;
        else data[t] = cache.data;
    });
    if (needed.length)
        data = {
            ...data,
            ...(await request(needed.join(",")).then((d) => {
                Object.entries(d).forEach(([key, value]) => {
                    Cached[key] = {
                        data: value,
                        expiredAt: new Date().getTime() + 5 * 60 * 1000,
                    };
                });
                return d;
            })),
        };
    return data;
};
