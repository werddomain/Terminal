class ProgressBar {
	animation: boolean = false;
	timer: number;
	prompt: any;
	display: string;

	constructor(private app: App, size: number) {
		var term = app.term;
		var i = 0;
		this.prompt = term.get_prompt();
		this.display = this.progress(0, size);
		term.set_prompt(<any>this.progress);
		this.animation = true;
		(function loop() {
			this.display = this.progress(i++, size);
			term.set_prompt(this.display);
			if (i < 100) {
				this.timer = setTimeout(loop, 100);
			} else {
				term.echo(this.progress(i, size) + ' [[b;green;]OK]')
					.set_prompt(this.prompt);
				this.animation = false
			}
		})();
	}
	progress(percent: number, width: number) {
		var size = Math.round(width * percent / 100);
		var left = '', taken = '', i;
		for (i = size; i--;) {
			taken += '=';
		}
		if (taken.length > 0) {
			taken = taken.replace(/=$/, '>');
		}
		for (i = width - size; i--;) {
			left += ' ';
		}
		return '[' + taken + left + '] ' + percent + '%';
	}
	cancell(): boolean {
		if (this.animation) {
			
				clearTimeout(this.timer);
			this.animation = false;
			this.app.term.echo(this.display + ' [[b;red;]FAIL]')
					.set_prompt(this.prompt);
			
			return false;
		}
	}
}