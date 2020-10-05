export class Sender {
    client

    constructor(client) {
        this.client = client
    }

    async send(event) {
        const to = [event.email]
        const from = this.from()
        const subject = this.subject()
        const body = this.body(event)

        return this.client.sendEmail({
            Destination: {
                ToAddresses: to
            },
            Source: from,
            Message: {
                Subject: {
                    Data: subject
                },
                Body:{
                    Html: {
                        Data: body
                    }
                }
            }
        }).promise();
    }

    private from() {
        return process.env.EMAIL_SENDER_ADDRESS
    }

    private subject() {
        return process.env.EMAIL_SUBJECT
    }

    private body(event) {
        return this.minify(`
            <html>
                <body>
                    <h3>Hi ${event.firstname},</h3>
                    <dl>You have been ${JSON.stringify(event.answer)}</dl>
                </body>
            </html>
        `)
    }

    private minify(s: string): string {
        const removeNewLines = /\r?\n|\r/gi
        const removeWhiteSpace = />\s*</gi
        return s
            .replace(removeNewLines, '')
            .replace(removeWhiteSpace, '><')
            .trim()    
    }
}