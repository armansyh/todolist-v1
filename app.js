const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const _ = require("lodash");

// mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect("mongodb+srv://admin-arman:997381@clusterfree.r8dwl.gcp.mongodb.net/todolistDB", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.listen(3000, function () {
	console.log("listening port 3000");
});

const itemsSchema = new mongoose.Schema({
	item: {
		type: String,
		required: [true],
	},
});

const Item = mongoose.model("Item", itemsSchema);

const listsSchema = new mongoose.Schema({
	name: String,
	item: String,
});

const List = mongoose.model("Lists", listsSchema);
// let items = ["Rapat Management", "Meeting Client", "Presentasi Proyek"];
// let workItem = [];

app.get("/", (req, res) => {
	Item.find({}, function (err, result) {
		res.render("list", { nameList: "Today", newListItem: result });
	});
	// res.sendFile(__dirname + "/index.html");
});
app.get("/:customList", (req, res) => {
	let nameList = req.params.customList;
	nameList = _.capitalize(nameList);
	List.find({ name: nameList }, function (err, result) {
		if (err) return console.log("" + err);
		res.render("list", { nameList: nameList, newListItem: result });
	});
});

app.post("/Clear", (req, res) => {
	if (req.body.submit === "Today") {
		Item.deleteMany({}, function (err) {
			if (err) return console.log("" + err);
			res.redirect("/");
		});
	} else {
		List.deleteMany({}, function (err) {
			if (err) return console.log("" + err);
			res.redirect("/" + req.body.submit);
		});
	}
});
app.post("/", (req, res) => {
	if (req.body.submit === "Today") {
		const todayItem = new Item({
			item: req.body.newItem,
		});
		todayItem.save(function (err) {
			if (err) return console.log("" + err);
			res.redirect("/");
		});
	} else {
		const list = new List({
			name: req.body.submit,
			item: req.body.newItem,
		});
		list.save();
		res.redirect("/" + req.body.submit);
	}
});

app.post("/DeleteItem", (req, res) => {
	let id = req.body.check;
	let listName = req.body.listName;
	id = id.replace("/", "");
	if (listName === "Today") {
		Item.findByIdAndDelete({ _id: id }, function (err) {
			if (err) return console.log("" + err);
			res.redirect("/");
		});
	} else {
		List.findByIdAndDelete({ _id: id }, function (err) {
			if (err) return console.log("" + err);
			res.redirect("/" + listName);
		});
	}
});
