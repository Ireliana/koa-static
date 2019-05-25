const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = 5000;
const video = path.join(__dirname, "demo.mp4");
const sliceBytes = 119637;
/**
 * @desc a simple demo-断点续传
 */
app.get("/static/testfile/demo.mp4", (req, res) => {
	const { range } = req.headers;
	const rangeArr = range.replace("bytes=", "").split("-");
	const fileSize = fs.statSync(video).size;
	let [startPos, endPos] = rangeArr;
	startPos = Number(startPos);
	endPos = Number(endPos);
	if (!endPos) {
		if (fileSize - startPos < sliceBytes) {
			endPos = fileSize - 1;
		} else {
			endPos = startPos + sliceBytes;
		}
	}
	console.log(startPos, endPos);
	res.set({
		"Accept-Ranges": "bytes",
		"Content-Type": "video/mp4; charset=UTF-8",
		"Content-Range": `bytes ${startPos}-${endPos}/${fileSize}`,
		"Content-Length": `${endPos == startPos ? 0 : endPos - startPos + 1}`,
		"Cache-Control": "no-cache",
		Connection: "keep-alive"
	});
	const stream = readVideo(video, {
		start: startPos,
		end: endPos
	});
	res.status(206);
	stream.pipe(res);
	stream.on("end", () => {
		res.send();
	});
});
app.listen(PORT, function() {
	console.log(`app now listening at ${PORT}...`);
});

function readVideo(path, option) {
	return fs.createReadStream(path, option);
}
