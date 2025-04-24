import express from "express";
import { promises as fs } from "fs";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.status(200).json({ message: "Welcome to default route" });
});

app.post("/register", async (req, res) => {
	try {
		const { name, email, password } = req.body;
		console.log(name);
		console.log(email);
		console.log(password);
		let fileContent = await fs.readFile("register.json", { encoding: "utf-8" });
		let existingData = fileContent ? JSON.parse(fileContent) : "[]";

		if (!Array.isArray(existingData)) {
			existingData = [];
		}

		existingData.push({ name, email, password });

		await fs.writeFile("register.json", JSON.stringify(existingData, null, 2));

		res.status(200).json({ message: "data endpoint hit successfully" });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ message: error.message });
	}
});

app.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const fdata = await fs.readFile("register.json", { encoding: "utf-8" });
		const users = JSON.parse(fdata);

		const user = users.find(
			(user) => user.email === email && user.password === password
		);

		if (user) {
			res.status(200).json({ message: "User login successfully" });
		} else {
			res.status(404).json({ message: "Invalid credentials" });
		}
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

app.get("/admin/data", async (req, res) => {
	try {
		const data = await fs.readFile("register.json", { encoding: "utf-8" });
		console.log(data);
		const response = JSON.parse(data);
		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
});

app.get("/admin/showByEmail/:email", async (req, res) => {
	const email = req.params.email;
	console.log(email);

	const data = await fs.readFile("register.json", "utf-8");
	const response = JSON.parse(data);

	let mail = response.find((ele) => ele.email === email);
	if (mail) {
		return res.status(200).json(mail);
	}
	res.status(404).json({ message: "Email not found" });
});

app.delete("/admin/deleteByEmail/:email", async (req, res) => {
	try {
		const email = req.params.email;

		const data = await fs.readFile("register.json", "utf-8");
		const response = JSON.parse(data);

		const beforeLen = response.length;

		let mail = response.filter((ele) => ele.email != email);
		const afterLen = mail.length;

		await fs.writeFile("register.json", JSON.stringify(mail, null, 2));

		if (beforeLen > afterLen) {
			return res
				.status(200)
				.json({ message: "User deleted successfully", email: email });
		}
		return res.status(404).json({ message: "User not found" });
	} catch (error) {
		return res.status(404).json({ error: error.message });
	}
});

app.patch("/admin/updateByEmail/:email", async (req, res) => {
	const email = req.params.email;
	const { name, password } = req.body;

	const data = await fs.readFile("register.json", "utf-8");
	const response = JSON.parse(data);

	const obj = {
		name: name,
		password: password,
		email: email,
	};

	let userMail = response.filter((ele) => ele.email != email);
	userMail.push(obj);
	await fs.writeFile("register.json", JSON.stringify(userMail, null, 2));

	res.status(200).json({ userMail });
});

app.listen(3000, () => {
	console.log(`Server is running on 3000`);
});
