module.exports = async d => {
    const data = d.util.aoiFunc(d);

    const [userId = d.author?.id, sep = ' , '] = data.inside.splits;

    const mutual = d.client.guilds.cache.filter(x => x.members.cache.has(userId));

    data.result = mutual.map(x => x.id).join(sep);

    return {
        code: d.util.setCode(data)
    }
}