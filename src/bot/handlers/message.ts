
export class Message {

    public static get type() {
       return "message";
    }

    public static handle(event: any) {
        console.log(`New Message: ${event.text}`);
    }

}
