import app from "./app.js";
import dbConnection from "./config/db.js";

app.get("/reset", async (req, res) => {
	try {
		await dbConnection.sync({ force: true });
		res.status(200).send({ message: "Db reset successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Failed to reset db", error });
	}
});

// connect to db
const port = 3000;

dbConnection
	.authenticate()
	.then(() => {
		console.log("Db connected successfully.");
		return dbConnection.sync({ force: true });
	})
	.then(() => {
		console.log("Db synchronized.");
		app.listen(port, () => {
			console.log(`App is running on port ${port}...`);
		});
	})
	.catch((error) => {
		console.error("Unable to connect to the db:", error);
	});
