const PDF = require('./../../process/html2pdf.js');
const fs = require('fs');
const getHTML = id => {
	return new Promise((res, rej) => {
		try{
			fs.readFile(`${__dirname}/${id}.html`, 'utf8', (error, html) => {
				if(error){
					rej(error);
				}
				res(html);
			});
		}
		catch(err){
			rej(err);
		}
	})
}
//https://github.com/marcbachmann/node-html-pdf
//landscape
const generator = async () => {
	try{
		let html = await getHTML(1);
		let process = new PDF(
			html,
			{
				orientation: 'portrait',
				format: 'A4',
				margin: '1cm',
				type: 'pdf',
				paginationOffset: 2, 
				header: {
					height: "1cm", 
					"contents": {
						default: '<span style="width:100%;color: #444;text-align:center;">بالای صفحه</span>', 
				    }
				},
				footer: {
					height: "1cm",
					"contents": {
					  default: '<span style="width:100%;color: #444;text-align:center;">{{page}}</span>/<span>{{pages}}</span>', 
					}
				},
				timeout: 800000,
				phantomPath: require('phantomjs-prebuilt').path,
				phantomArgs: ["--ignore-ssl-errors=yes", "--load-images=true"]
			}
		);
		process.toStream((error, stream) => {
			if(error){
				throw new Error(error);
			}
			let path = `${__dirname}\\res.pdf`;
			let f = fs.createWriteStream(path, {encoding: 'UTF-8'});
			if(stream && stream.pipe){
				stream.pipe(f);
				f.on('finish', () => console.log("PDF Is Ready :)"));
				f.on('error', errorOccur => {
					throw new Error(errorOccur);
				})
			}
		})
	}
	catch(err){
		console.log(err);
	}
}
generator();

const test = () => {
    console.log("test");   
}
