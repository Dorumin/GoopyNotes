type Arg = string | number;
type Args = Record<string, Arg>;

export default class I18nMessage {
    message: string;

    constructor(message: string) {
        this.message = message;
    }

    text(args: Args = {}): string {
        return this.message.replace(/{(\w+)}/g, (full, name) => {
            if (!args.hasOwnProperty(name)) {
                if (process.env.NODE_ENV !== 'production') {
                    throw new Error('Message expected argument '
                        + 'not passed to .text():\n'
                        + full);
                } else {
                    return full;
                }
            }

            return args[name].toString();
        });
    }
}
