const Interpreter = require("../../interpreter.js");
module.exports = async (stageint, client) => {
    const cmds = client.cmd.stageInstanceCreate.allValues();
    const data = {guild: stageint.guild, channel: stageint, client: client};
    let chan;
    for (const cmd of cmds) {
        if (cmd?.channel?.includes("$")) {
            const id = await Interpreter(
                client,
                data,
                [],
                {name: "ChannelParser", code: cmd?.channel},
                client.db,
                true,
            );
            const channel = client.channels.cache.get(id?.code);
            chan = channel;
        } else {
            const channel = client.channels.cache.get(cmd.channel);
            chan = channel;
        }
        await Interpreter(
            client,
            data,
            [],
            cmd,
            client.db,
            false,
            chan?.id,
            {newStageInstance: stageint},
            chan,
        );
    }
};
