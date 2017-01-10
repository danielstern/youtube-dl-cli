var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));
var validUrl = require('valid-url');
var youtubedl = require('youtube-dl');

let url = argv._[0];
let filename = argv._[1];

if (!validUrl.isUri(url)){
        console.error("You must pass a valid URI, the following is not a valid uri::", url);
        console.info("Try adding https:// to the beginning of your URL");
        throw new Error("INVURL:: Invalid URL");
}

console.info("Downloading video:: ", url);

youtubedl.getInfo(url, [], function(err, info) {
    if (err) throw err;

    console.log('title:', info.title);
    const fileNameLocal = filename || `${info.title}.mp4`;

    var video = youtubedl(url,
        // Optional arguments passed to youtube-dl.
        ['--format=18'],
        // Additional options can be given for calling `child_process.execFile()`.
        { cwd: __dirname });

    video.on('info', function(info) {
        console.log('Download started');
        console.log('filename: ' + info._filename);
        console.log('size: ' + info.size);
    });

    video.pipe(fs.createWriteStream(fileNameLocal));

    video.on('complete', function complete(info) {
        console.info("Download successfully completed");
    })

});





// Will be called when the download starts.

