const http=require("http");
const url=require("url");
const fs=require("fs");
const path=require("path");
http.createServer(function(req,res){
    var urlObj=url.parse(req.url);
    var pathName=urlObj.pathname;
    //列表页
    if(pathName=='/list'){
        showList(res);
    }
    //后台登录页
    else if(pathName=="/login"){
        showLogin(res);
    }
    //后台文章列表页
    else if(pathName=="/listmanager"){
        showListm(res);
    }
    //后台添加文章页
    else if(pathName=="/addChapter"){
        showAddC(res);
    }
    //阅读全文详情页
    else if(pathName=="/chapter"){
        showDetail(res);
    }
    //添加文章
    // else if(pathName='/add'){
    //     Add(res);
    // }
    //图片响应
    else if(pathName=='login_bg.jpg' && req.method == 'POST'){
        uploadFile(req,res);
    }
    else if(pathName.indexOf('login_bg.jpg')>=0 && req.method == 'GET'){//是客户端要图片的请求
        // 一个一个的把图片都响应回去
        var imgSrc = path.join(__dirname,pathName);
        var imgContent = fs.readFileSync(imgSrc);
        res.writeHead(200,"Content-Type","image/jpg");
        res.end(imgContent);
    }
    else if(pathName=='images' && req.method == 'POST'){
        uploadFile(req,res);
    }
    else if(pathName.indexOf('images')>=0 && req.method == 'GET'){//是客户端要图片的请求
        // 一个一个的把图片都响应回去
        var imgSrc = path.join(__dirname,pathName);
        var imgContent = fs.readFileSync(imgSrc);
        res.writeHead(200,"Content-Type","image/jpg");
        res.end(imgContent);
    }
    //css响应
    else if(pathName=='css' && req.method == 'POST'){
        uploadFile(req,res);
    }
    else if(pathName.indexOf('css')>=0 && req.method == 'GET'){//是客户端要图片的请求
        // 一个一个的把图片都响应回去
        var cssSrc = path.join(__dirname,pathName);
        var cssContent = fs.readFileSync(cssSrc);
        res.writeHead(200,"Content-Type","css");
        res.end(cssContent);
    }
    //js响应
    else if(pathName=='js' && req.method == 'POST'){
        uploadFile(req,res);
    }
    else if(pathName.indexOf('js')>=0 && req.method == 'GET'){//是客户端要图片的请求
        // 一个一个的把图片都响应回去
        var jsSrc = path.join(__dirname,pathName);
        var jsContent = fs.readFileSync(jsSrc);
        res.writeHead(200,"Content-Type","js");
        res.end(jsContent);
    }
}).listen(8083);
console.log("server is listening 8083");
function showList(res){
    var listPath = path.join(__dirname,'./chapterList.html');
    var listContent = fs.readFileSync(listPath);
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(listContent);
}
function showLogin(res){
    var loginPath = path.join(__dirname,'./login.html');
    var loginContent = fs.readFileSync(loginPath);
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(loginContent);
}
function showListm(res){
    var listmPath = path.join(__dirname,'./list.html');
    var listmContent = fs.readFileSync(listmPath);
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(listmContent);
}
function showAddC(res){
    var addcPath = path.join(__dirname,'./addChapter.html');
    var addcContent = fs.readFileSync(addcPath);
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(addcContent);
}
// function showChapter(res){
//     var chapterPath = path.join(__dirname,'./chapter.html');
//     var chapterContent = fs.readFileSync(chapterPath);
//     res.writeHead(200,{'Content-Type':'text/html'});
//     res.end(chapterContent);
// }
function uploadFile(req,res){
    var dataStr = '';//用来接收数据
    req.setEncoding('binary');
    req.on("data",function(chunk){
        dataStr += chunk;
    })
    req.on("end",function(){
        
        res.end(dataStr);
    })
}

function showDetail(res){
    var chapterList = [
        {
            "chapterId": 1,
            "chapterName": "hello ,这是后台取到的数据",
            "imgPath": "images/1442457564979540.jpeg",
            "chapterDes": "注定，有些路，只能一个人走；有些事，",
            "chapterContent": "有人说，生活生活，就是生下来活下去，也有人说，生容易，活容易，生活不容易。有个朋友曾经和我说，这个世界，大多数人都没有生活，他们有的仅仅是生存。我赞同这种说法吧，只是生存，对于我们可能都是一种奢侈。每个人都在努力，努力为着这个本来不属于我们的生活和努力。对于含着金钥匙而成长的人，我们又羡慕又嫉妒。可我们没有想过，他们的先人在斩荆棘的时候，付出的艰辛和艰苦，才有了后代荣华。生活是什么,其实在我看来，生活是一种需要，在你最需要亲人的时候，亲人已经突然不在了。子欲养而亲不待，说得成其深，对于我们是一种思考。他们的离开，对于我们都是一种打击，可也是一种思考。离开时痛苦的，可是生活就是有生老病死，当你一直都习惯存在的人已经离开的时候，慢慢地，你会看透很多，这就是你面对生活所需要的。生活是什么？其实在我看来，生活就是一种打拼，当过年过节的时候你看着别人的父母带着自己的孩子快乐的回家的时候、尔你还只能在大街上流浪的时候。许多游子和打工的人或许都有这种感觉吧，为了赚钱，为了养家。当我们看到留守儿童那迷茫孤寂的眼神，不由得心痛的时候，或许你能理解那份父母为了儿女在外打拼的奔波吧。其实在我看来，生活就是一种漠然，当你真正遇到困难而朋友都不能帮你的时候、怕你还不了钱的时候。你只能自己默默面对这一切，这一切让你十分无奈，可是你明白了一个道理，借给你是道理，不借给你是合理。人之常情，所以，想怪不能怪的时候，你留下的只是无奈。</p><p>生活是什么？</p><p>其实生活就是无奈的活着，不得不无奈的活着。我们活在这个世界上，为的只是寻找一个目标，而生活，给我们的感受，却是无奈与绝望的迷茫。这时候你不能说生活是美好和美满的吧？可是正因为有痛苦，无奈与悲伤，我们才有开心的日子。也正因为有了生存，才有了生活。</p><p>无奈的生活，才给我们无奈的心情，无奈的心情才有了悠然见南山的豁达与开朗，这就是生活，这种生活才会有着无限的魅力，也只有这种魅力才能吸引我们一直向前",
            "publishTimer": "2019-08-19",
            "author": "admin",
            "views": 1022
        },
        {
            "chapterId": 2,
            "chapterName": "那些不是事",
            "imgPath": "images/1442201163344838-lp.jpg",
            "chapterDes": "人生，原本就该这样。再大的事，无非是个经历而己。明天的太阳照样升起，就像罗俊杰个人博客​的时候水来土掩，兵来将挡。任何事情都会成为过去，只要有好的心态，就可以面对人生的.",
            "chapterContent": "有人说，生活生活，就是生下来活下去，也有人说，生容易，活容易，生活不容易。有个朋友曾经和我说，这个世界，大多数人都没有生活，他们有的仅仅是生存。我赞同这种说法吧，只是生存，对于我们可能都是一种奢侈。每个人都在努力，努力为着这个本来不属于我们的生活和努力。对于含着金钥匙而成长的人，我们又羡慕又嫉妒。可我们没有想过，他们的先人在斩荆棘的时候，付出的艰辛和艰苦，才有了后代荣华。生活是什么,其实在我看来，生活是一种需要，在你最需要亲人的时候，亲人已经突然不在了。子欲养而亲不待，说得成其深，对于我们是一种思考。他们的离开，对于我们都是一种打击，可也是一种思考。离开时痛苦的，可是生活就是有生老病死，当你一直都习惯存在的人已经离开的时候，慢慢地，你会看透很多，这就是你面对生活所需要的。生活是什么？其实在我看来，生活就是一种打拼，当过年过节的时候你看着别人的父母带着自己的孩子快乐的回家的时候、尔你还只能在大街上流浪的时候。许多游子和打工的人或许都有这种感觉吧，为了赚钱，为了养家。当我们看到留守儿童那迷茫孤寂的眼神，不由得心痛的时候，或许你能理解那份父母为了儿女在外打拼的奔波吧。其实在我看来，生活就是一种漠然，当你真正遇到困难而朋友都不能帮你的时候、怕你还不了钱的时候。你只能自己默默面对这一切，这一切让你十分无奈，可是你明白了一个道理，借给你是道理，不借给你是合理。人之常情，所以，想怪不能怪的时候，你留下的只是无奈。</p><p>生活是什么？</p><p>其实生活就是无奈的活着，不得不无奈的活着。我们活在这个世界上，为的只是寻找一个目标，而生活，给我们的感受，却是无奈与绝望的迷茫。这时候你不能说生活是美好和美满的吧？可是正因为有痛苦，无奈与悲伤，我们才有开心的日子。也正因为有了生存，才有了生活。</p><p>无奈的生活，才给我们无奈的心情，无奈的心情才有了悠然见南山的豁达与开朗，这就是生活，这种生活才会有着无限的魅力，也只有这种魅力才能吸引我们一直向前",
            "publishTimer": "2019-08-19",
            "author": "admin",
            "views": 102
        },
        {
            "chapterId": 3,
            "chapterName": "只想，留住心中的那份静美",
            "imgPath": "images/1442642178239101-lp.jpg",
            "chapterDes": "在这个鸟语花香的季节,踏着早晨罗俊杰个人博客的一缕光芒在小路间走着,呼吸着这自然的清晰空气，只想，衣袂飘飘，信步于绿荫小道，或俯首听花开，或低眉赏花香，盈脉脉春意，于眼波中...",
            "chapterContent": "有人说，生活生活，就是生下来活下去，也有人说，生容易，活容易，生活不容易。有个朋友曾经和我说，这个世界，大多数人都没有生活，他们有的仅仅是生存。我赞同这种说法吧，只是生存，对于我们可能都是一种奢侈。每个人都在努力，努力为着这个本来不属于我们的生活和努力。对于含着金钥匙而成长的人，我们又羡慕又嫉妒。可我们没有想过，他们的先人在斩荆棘的时候，付出的艰辛和艰苦，才有了后代荣华。生活是什么,其实在我看来，生活是一种需要，在你最需要亲人的时候，亲人已经突然不在了。子欲养而亲不待，说得成其深，对于我们是一种思考。他们的离开，对于我们都是一种打击，可也是一种思考。离开时痛苦的，可是生活就是有生老病死，当你一直都习惯存在的人已经离开的时候，慢慢地，你会看透很多，这就是你面对生活所需要的。生活是什么？其实在我看来，生活就是一种打拼，当过年过节的时候你看着别人的父母带着自己的孩子快乐的回家的时候、尔你还只能在大街上流浪的时候。许多游子和打工的人或许都有这种感觉吧，为了赚钱，为了养家。当我们看到留守儿童那迷茫孤寂的眼神，不由得心痛的时候，或许你能理解那份父母为了儿女在外打拼的奔波吧。其实在我看来，生活就是一种漠然，当你真正遇到困难而朋友都不能帮你的时候、怕你还不了钱的时候。你只能自己默默面对这一切，这一切让你十分无奈，可是你明白了一个道理，借给你是道理，不借给你是合理。人之常情，所以，想怪不能怪的时候，你留下的只是无奈。</p><p>生活是什么？</p><p>其实生活就是无奈的活着，不得不无奈的活着。我们活在这个世界上，为的只是寻找一个目标，而生活，给我们的感受，却是无奈与绝望的迷茫。这时候你不能说生活是美好和美满的吧？可是正因为有痛苦，无奈与悲伤，我们才有开心的日子。也正因为有了生存，才有了生活。</p><p>无奈的生活，才给我们无奈的心情，无奈的心情才有了悠然见南山的豁达与开朗，这就是生活，这种生活才会有着无限的魅力，也只有这种魅力才能吸引我们一直向前",
            "publishTimer": "2019-08-19",
            "author": "admin",
            "views": 202
        },
        {
            "chapterId": 4,
            "chapterName": "所以才会美",
            "imgPath": "images/1442539025939884-lp.jpg",
            "chapterDes": "人，越简单就会越快乐;水，掺杂东西越少才会显得清澈靓丽。大自然越安静,才会体现它的本质。人生就是这样，倘若有运，不用祈求，因为祈求也是无用。倘若无运，无需悲伤，因为悲...",
            "chapterContent": "有人说，生活生活，就是生下来活下去，也有人说，生容易，活容易，生活不容易。有个朋友曾经和我说，这个世界，大多数人都没有生活，他们有的仅仅是生存。我赞同这种说法吧，只是生存，对于我们可能都是一种奢侈。每个人都在努力，努力为着这个本来不属于我们的生活和努力。对于含着金钥匙而成长的人，我们又羡慕又嫉妒。可我们没有想过，他们的先人在斩荆棘的时候，付出的艰辛和艰苦，才有了后代荣华。生活是什么,其实在我看来，生活是一种需要，在你最需要亲人的时候，亲人已经突然不在了。子欲养而亲不待，说得成其深，对于我们是一种思考。他们的离开，对于我们都是一种打击，可也是一种思考。离开时痛苦的，可是生活就是有生老病死，当你一直都习惯存在的人已经离开的时候，慢慢地，你会看透很多，这就是你面对生活所需要的。生活是什么？其实在我看来，生活就是一种打拼，当过年过节的时候你看着别人的父母带着自己的孩子快乐的回家的时候、尔你还只能在大街上流浪的时候。许多游子和打工的人或许都有这种感觉吧，为了赚钱，为了养家。当我们看到留守儿童那迷茫孤寂的眼神，不由得心痛的时候，或许你能理解那份父母为了儿女在外打拼的奔波吧。其实在我看来，生活就是一种漠然，当你真正遇到困难而朋友都不能帮你的时候、怕你还不了钱的时候。你只能自己默默面对这一切，这一切让你十分无奈，可是你明白了一个道理，借给你是道理，不借给你是合理。人之常情，所以，想怪不能怪的时候，你留下的只是无奈。</p><p>生活是什么？</p><p>其实生活就是无奈的活着，不得不无奈的活着。我们活在这个世界上，为的只是寻找一个目标，而生活，给我们的感受，却是无奈与绝望的迷茫。这时候你不能说生活是美好和美满的吧？可是正因为有痛苦，无奈与悲伤，我们才有开心的日子。也正因为有了生存，才有了生活。</p><p>无奈的生活，才给我们无奈的心情，无奈的心情才有了悠然见南山的豁达与开朗，这就是生活，这种生活才会有着无限的魅力，也只有这种魅力才能吸引我们一直向前",
            "publishTimer": "2019-08-19",
            "author": "admin",
            "views": 102
        }
    ]
    var chapterPath = path.join(__dirname,'./chapter.html');
    var chapterContent = fs.readFileSync(chapterPath);
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(chapterContent);
    
}


// function Add(res){
//     var adcPath=path.join(__dirname,'./addChapter.html');
//     var adcContent=fs.readFileSync(adcPath);
//     res.writeHead(200,{'Content-Type':'text/html'});
//     res.end(adcContent.dataStr);

// }
// function saveUser(){
// 	let myURL = new URL(path.join(__dirname,req.url));
// 	if(myURL.searchParams.get('username')){
// 		let user = myURL.searchParams.get('username')
// 		let pwd = myURL.searchParams.get('pwd')
// 		res.writeHead('200',{ 
// 				'Content-Type':'text/plain;charset=utf8'
// 			})
// 		res.end('你好,'+user)
// 	}
// 	fs.readFile(path.join(__dirname,'/login',req.url),'utf8',(err,data)=>{
// 		if(err){
// 			res.writeHead('404',{ 
// 				'Content-Type':'text/plain;charset=utf8'
// 			})
// 			res.end('页面不存在了')
// 		}else{
// 			res.end(data)			
// 		}    
//     })
// }
