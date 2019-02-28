interface IProcess {
	start: (app: App, args?:string[]) => void;
	stop: () => void;
	help: () => string;
}