import AbstractView from "./AbstractView";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Dashboard");
    }

    async getHtml() {
        return `
            <h1> Welcome to Main Dashboard </h1>
            <p> Hello JavaScript Frontend I don't want to meet you</p>
        `
    }
}