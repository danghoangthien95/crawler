var express = require('express'),
	request = require('request'),
	cheerio = require('cheerio'),
	app = express();
 
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views' , './views');

app.listen(3000, function (req, res) {
	// body...
	console.log('server start');
});

var arr = [];
app.get('/', function (req, res) {
	// body...
	// var domain = [];
	for (let i = 12500; i < 32533; i++) {
		request("http://online.gov.vn/WebsiteDisplay.aspx?DocId=" + i , function (err, response, body) {
			// body...
			if(err) {
				console.log('Error ', err);
				res.send('co loi xay ra');
			} else {
				$ = cheerio.load(body);
				if (body.indexOf("reg-subtitle") == -1) {
					console.log('ko ton tai');console.log('index: ' + i);
				} else {
					let domain = $(body).find("span#ctl00_ContentPlaceHolder1_lblDomain");
					var domainText;
					domain.each(function(i, e){
						domainText = $(this).text();
					});
					arr.push(domainText);
					console.log(arr);
					// console.log('index: ' + i);

				}
			}
		});
	}
	res.render('test', {arr: arr})	
});