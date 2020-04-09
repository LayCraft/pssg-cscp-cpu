import { iServiceProvider } from "./service-provider.interface";

export class ServiceProvider implements iServiceProvider {
    name: string;
    constructor(sp?: iServiceProvider) {
        if (sp) {
            this.name = sp.name || "";
        } else {
            this.name = "";
        }
    }
}
