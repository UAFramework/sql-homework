import dotenvFlow from "dotenv-flow";

dotenvFlow.config();

export default {
	dbUrl: createDatabaseUrl(),
	logLevel: process.env.LOG_LEVEL ?? "info",
	port: parseInt(process.env.PORT ?? "3000", 10),
	production: process.env.NODE_ENV === "production",
};

function createDatabaseUrl() {
	if (process.env.DATABASE_URL) {
		return process.env.DATABASE_URL;
	}
	
	const host = process.env.DB_HOST ?? "dpg-cmehpfun7f5s73frr2k0-a.frankfurt-postgres.render.com";
	const name = process.env.DB_NAME ?? "exemple_postgresssql_sana";
	const password = process.env.DB_PASS ?? process.env.DB_PASSWORD ?? "9jFvKN5g9NTnbWb0h9RwfvG77BC84dON";
	const username = process.env.DB_USER ?? process.env.DB_USERNAME ?? "sana";
	const port = process.env.DB_PORT ?? "5432";

	return `postgres://${username}:${password}@${host}:${port}/${name}`;
}