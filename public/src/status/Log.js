export default class Log {
    static bind() {
    }

    static default(message) {
        console.log('UX::LOG', message);
    }
}