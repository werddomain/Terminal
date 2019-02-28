class Cls implements IProcess {
	constructor() { }

	start(app: App, args?: string[]) {
		app.term.clear();
	}
	stop() { }
	help(): string {
		return "clear the terminal";
	}
}
processesList.add("cls", new Cls());
processesList.add("clear", new Cls());