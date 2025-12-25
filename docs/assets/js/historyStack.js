export class HistoryStack {
    constructor() {
        this.stack = [];
    }

    save(state) {
        this.stack.push([...state]);
    }

    undo() {
        return this.stack.pop();
    }
}
