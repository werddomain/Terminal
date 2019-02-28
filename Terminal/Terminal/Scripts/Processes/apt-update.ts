
class aptUpdate implements IProcess {
	private prompt: any;
	private app: App
	private progress: ProgressBar;
	private Status: string[];
	private timer: number;
	private loopI: number;
	constructor() {
		//https://linuxcontainers.org/lxd/try-it/?id=d2055ab0-8ca4-468b-ab3f-97e7b2f2be01#introduction
		this.Status = [
			"Get: 14 http://security.ubuntu.com/ubuntu bionic-security/multiverse amd64 Packages [[b;yellow;](3324 B)]",
			"Get: 15 http://archive.ubuntu.com/ubuntu bionic/multiverse amd64 Packages [[b;yellow;](151 kB)]",
			"Get: 16 http://security.ubuntu.com/ubuntu bionic-security/multiverse Translation-en [[b;yellow;](1848 B)]",
			"Get: 17 http://archive.ubuntu.com/ubuntu bionic/multiverse Translation-en [[b;yellow;](108 kB)]",
			"Get: 18 http://archive.ubuntu.com/ubuntu bionic-updates/main amd64 Packages [[b;yellow;](527 kB)]",
			"Get: 19 http://archive.ubuntu.com/ubuntu bionic-updates/main Translation-en [[b;yellow;](197 kB)]",
			"Get: 20 http://archive.ubuntu.com/ubuntu bionic-updates/restricted amd64 Packages [[b;yellow;](6996 B)]",
			"Get: 21 http://archive.ubuntu.com/ubuntu bionic-updates/restricted Translation-en [[b;yellow;](3076 B)]",
			"Get: 22 http://archive.ubuntu.com/ubuntu bionic-updates/universe amd64 Packages [[b;yellow;](737 kB)]",
			"Get: 23 http://archive.ubuntu.com/ubuntu bionic-updates/universe Translation-en [[b;yellow;](189 kB)]",
			"Get: 24 http://archive.ubuntu.com/ubuntu bionic-updates/multiverse amd64 Packages [[b;yellow;](6384 B)]",
			"Get: 25 http://archive.ubuntu.com/ubuntu bionic-updates/multiverse Translation-en [[b;yellow;](3452 B)]",
			"Fetched 18.0 MB in 4s(4248 kB / s)",
			"Reading package lists...Done",
			"Building dependency tree",
			"Reading state information...Done",
			"All packages are up to date.",
		];
	}
	start(app: App, args?: string[]) {
		this.app = app;
		app.currentProcess = this;
		this.progress = new ProgressBar(this.app, 40, this.Status.length - 1);
		this.loopI = 0;
		this.loop();
	}
	private loop() {
		this.app.term.echo(this.Status[this.loopI]);
		this.progress.set(this.loopI);
		this.loopI++;
        if (this.loopI < this.Status.length)
            this.timer = setTimeout(() => { this.loop(); }, this.app.rnd(300, 2000));
		else {
			this.progress.close();
			this.app.currentProcess = null;
		}
	}
	stop() {
		clearTimeout(this.timer);
		this.progress.cancell();
		this.app.currentProcess = null;
	}
	help(): string {
		return "apt-update"; 
	}

}
processesList.add("apt-update", new aptUpdate());