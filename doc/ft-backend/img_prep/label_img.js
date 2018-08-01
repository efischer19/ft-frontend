const { execSync } = require('child_process');
const { createServer } = require('http');
const { readdirSync, readFile } = require('fs');

//parse CLI options and load input file list
if (process.argv.length != 4) {
  console.log('usage: "node <this file> <input dir> <output_dir>"');
  return;
}
const inputDir = process.argv[2];
const outputDir = process.argv[3];
console.log('loading images from ' + inputDir);
const files = readdirSync(inputDir);
const flength = files.length;
console.log('loaded ' + flength + ' images.');

// global variables
var labels = {};
var picDex = 0;

// status and final bash commands ftn
var logCurrent = (index) => {
  if (index < flength) {
    console.log('waiting to label image ' + (index + 1) + ' of ' + flength);
  } else {
    console.log('all images labelled, congrats!');
    server.close();
    var prefix = outputDir + '/' + new Date().toISOString().substr(0, 10) + '_';
    execSync('mkdir -p ' + outputDir + '/original');
    execSync('mkdir -p ' + outputDir + '/small');
    for (const [old, knew] of Object.entries(labels)) {
      var splitfile = old.split('.');
      var ext = splitfile[splitfile.length - 1].toLowerCase();
      var filename = prefix + knew + '.' + ext;
      var filename_small = prefix + knew + '.small.' + ext;
      var filename_orig = prefix + knew + '.original.' + ext;
      execSync('cp ' + inputDir + '/' + old + ' ' + filename_orig);
      // this resize command will use 640 and 360 as *maximum* width/height, respectively; and preserve aspect ratio
      // https://www.imagemagick.org/script/command-line-processing.php#geometry
      execSync('convert ' + filename_orig + ' -resize 640x360 ' + filename_small);
      execSync('convert ' + filename_orig + ' -resize 1280x720 ' + filename);
      execSync('exiftool -all= -overwrite_original ' + filename);
      execSync('exiftool -all= -overwrite_original ' + filename_small);
      execSync("exiftool -s -s -s -orientation " + filename_orig + " | grep Rotate | cut -d ' ' -f 2 | xargs -I '{}' convert " + filename + " -rotate +'{}' " + filename);
      execSync("exiftool -s -s -s -orientation " + filename_orig + " | grep Rotate | cut -d ' ' -f 2 | xargs -I '{}' convert " + filename_small + " -rotate +'{}' " + filename_small);
    }
    execSync('mv ' + outputDir + '/*.original.* ' + outputDir + '/original');
    execSync('mv ' + outputDir + '/*.small.* ' + outputDir + '/small');
    process.exit();
  }
};

// helper to drop favicon requests from browser
var ignoreFavicon = (req, resp) => {
  if (req.url === '/favicon.ico') {
    resp.writeHead(200, {'Content-Type': 'image/x-icon'} );
    resp.end();
    return 1;
  }
  return 0;
};

// main (browser) loop, shows input pictures one by one
var server = createServer((req, resp) => {
  if (ignoreFavicon(req, resp)) { return; }
  readFile(inputDir + '/' + files[picDex], (err, content) => {
    if (err) {
      console.log(err);
    }
    resp.writeHead(200,{'Content-type':'image/jpg'});
    resp.end(content);
    process.stdout.write('label for ' + files[picDex] + ': ');
  });
}).listen(4444);

// main console loop, reads from stdin for each file's label
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', (text) => {
  labels[files[picDex]] = text.trim();
  picDex++;
  logCurrent(picDex);
});

// loops are all defined, let's begin
console.log('server is live at http://localhost:4444, hit it to see the first picture');
logCurrent(picDex);
