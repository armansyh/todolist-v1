exports.makeDate = () => {
	const date = new Date();
	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	const day = date.toLocaleDateString("en-US", options);
	return day;
};

// module.exports = makeDate;
// makeDate = () => {
// 	const date = new Date();
// 	const options = {
// 		weekday: "long",
// 		year: "numeric",
// 		month: "long",
// 		day: "numeric",
// 	};
// 	const day = date.toLocaleDateString("en-US", options);
// 	return day;
// };
