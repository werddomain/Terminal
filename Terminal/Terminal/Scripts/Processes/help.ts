class Help implements IProcess {
	constructor() { }

	start(app: App, args?: string[]) {
		if (args == null || args.length == 0) {
			
			var keys = app.commands.keys().join("\t");
			app.term.echo("Here is the list of avaliable commands:");
			app.term.echo("");
			app.term.echo(keys);
			app.term.echo("");
			app.term.echo("You can type [[;yellow;]help ][[b;yellow;]<command>] to get more info about the command.");


		}
		else {
			if (app.commands.containsKey(args[0]))
				app.term.echo(app.commands.getValue(args[0]).help());
			else
				app.term.error("[[b;white;]Help]> Commands [[b;]'" + args[0] + "'] is not found.");
		}
	}
	stop() { }
	help(): string {
		return "you're kidding. [[b;yellow;]Right?]";
	}
}
processesList.add("help", new Help());