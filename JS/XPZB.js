/* ziye 

github地址 https://github.com/ziye12
TG频道地址  https://t.me/ziyescript
TG交流群   https://t.me/joinchat/AAAAAE7XHm-q1-7Np-tF3g
boxjs链接  https://raw.githubusercontent.com/ziye12/JavaScript/main/Task/ziye.boxjs.json

转载请备注个名字，谢谢
⚠️笑谱
脚本运行一次   
则运行6次视频 1次金蛋 或者 6次直播（直播默认关闭，且在视频金币达到上限后有效）




1.15 调整金蛋延迟为60秒
1.17 增加ck失效提醒，以及金币满额停止
1.27 笑谱恢复，活动id284
1.27-2 增加看直播功能，默认关闭，设置LIVE来开启  如 设置LIVE 为 60 则开启直播，并且次数达到60次停止
1.27-3 调整直播运行次数，运行一次脚本，执行6次直播


⚠️一共1个位置 1个ck  👉 2条 Secrets 
多账号换行

第一步 添加  hostname=veishop.iboxpay.com,

第二步 添加header重写 

点击 我的 获取header
iboxpayheaderVal 👉XP_iboxpayHEADER

设置直播次数 可设置 0到60  0关闭
LIVE  👉  XP_live


⚠️主机名以及重写👇

hostname=veishop.iboxpay.com
#笑谱获取header
https:\/\/veishop\.iboxpay\.com\/* url script-request-header https://raw.githubusercontent.com/ziye12/JavaScript/main/Task/iboxpay.js

############## loon
#笑谱获取header
http-request https:\/\/veishop\.iboxpay\.com\/* script-path=https://raw.githubusercontent.com/ziye12/JavaScript/main/Task/iboxpay.js, requires-header=true, tag=笑谱获取header

############## surge
#笑谱获取body
笑谱获取body = type=http-request,pattern=https:\/\/veishop\.iboxpay\.com\/*,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/ziye12/JavaScript/main/Task/iboxpay.js, script-update-interval=0


*/


const $ = Env("笑谱");
$.idx = ($.idx = ($.getval('iboxpaySuffix') || '1') - 1) > 0 ? ($.idx + 1 + '') : ''; // 账号扩展字符
const notify = $.isNode() ? require("./sendNotify") : ``;
const COOKIE = $.isNode() ? require("./iboxpayCOOKIE") : ``;
const logs = 0; // 0为关闭日志，1为开启
const notifyttt = 1// 0为关闭外部推送，1为12 23 点外部推送
const notifyInterval = 2;// 0为关闭通知，1为所有通知，2为12 23 点通知  ， 3为 6 12 18 23 点通知 

const CS=4

$.message = '', COOKIES_SPLIT = '', CASH = '', LIVE = '',ddtime = '';
let ins=0,livecs=0,RT=35000;
const iboxpayheaderArr = [];
let iboxpayheaderVal = ``;
let middleiboxpayHEADER = [];

//时间
const nowTimes = new Date(
  new Date().getTime() +
  new Date().getTimezoneOffset() * 60 * 1000 +
  8 * 60 * 60 * 1000
);


//今日0点时间戳
if ($.isNode()) {
  daytime =
    new Date(new Date().toLocaleDateString()).getTime() - 8 * 60 * 60 * 1000;
} else {
  daytime = new Date(new Date().toLocaleDateString()).getTime();
}

date = new Date(daytime);
Y = date.getFullYear() + '-';
M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
D = date.getDate();
ddtime=Y+M+D;
console.log(ddtime)




if ($.isNode()) {
 // 没有设置 XP_CASH 则默认为 0 不提现
 CASH = process.env.XP_CASH || 0;
 // 没有设置 XP_live 则默认为 0 不开启
 LIVE = process.env.XP_live || 0;
} 
if ($.isNode() && process.env.XP_iboxpayHEADER) {
  COOKIES_SPLIT = process.env.COOKIES_SPLIT || "\n";
  console.log(
    `============ cookies分隔符为：${JSON.stringify(
      COOKIES_SPLIT
    )} =============\n`
  );
  if (
    process.env.XP_iboxpayHEADER &&
    process.env.XP_iboxpayHEADER.indexOf(COOKIES_SPLIT) > -1
  ) {
    middleiboxpayHEADER = process.env.XP_iboxpayHEADER.split(COOKIES_SPLIT);
  } else {
    middleiboxpayHEADER = process.env.XP_iboxpayHEADER.split();
  } 
    
}
if (COOKIE.iboxpayheaderVal) {
  XP_COOKIES = {
"iboxpayheaderVal": COOKIE.iboxpayheaderVal.split('\n'),
  }
  Length = XP_COOKIES.iboxpayheaderVal.length;
}
if (!COOKIE.iboxpayheaderVal) {
if ($.isNode()) {
  Object.keys(middleiboxpayHEADER).forEach((item) => {
    if (middleiboxpayHEADER[item]) {
      iboxpayheaderArr.push(middleiboxpayHEADER[item]);
    }
  });  
  
} else {	
  iboxpayheaderArr.push($.getdata("iboxpayheader"));  
  // 根据boxjs中设置的额外账号数，添加存在的账号数据进行任务处理
  if ("iboxpayCASH") {
      CASH = $.getval("iboxpayCASH")|| '0';
    }
  if ("iboxpayLIVE") {
      LIVE = $.getval("iboxpayLIVE")|| '0';
    }
	
	
  let iboxpayCount = ($.getval('iboxpayCount') || '1') - 0;
  for (let i = 2; i <= iboxpayCount; i++) {
    if ($.getdata(`iboxpayheader${i}`)) {	
  iboxpayheaderArr.push($.getdata(`iboxpayheader${i}`));  
    }
  }
 }
 Length = iboxpayheaderArr.length
}


function GetCookie() {
//用户名
if ($request && $request.url.indexOf("get_context_info") >= 0) {
    const iboxpayheaderVal = JSON.stringify($request.headers);
    if (iboxpayheaderVal) $.setdata(iboxpayheaderVal, "iboxpayheader" + $.idx);
    $.log(
      `[${$.name + $.idx}] 获取header✅: 成功,iboxpayheaderVal: ${iboxpayheaderVal}`
    );
    $.msg($.name + $.idx, `获取header: 成功🎉`, ``);
    } 
}

console.log(
  `================== 脚本执行 - 北京时间(UTC+8)：${new Date(
    new Date().getTime() +
    new Date().getTimezoneOffset() * 60 * 1000 +
    8 * 60 * 60 * 1000
  ).toLocaleString()} =====================\n`
);
console.log(
  `============ 共 ${Length} 个${$.name}账号=============\n`
);
console.log(`============ 提现标准为：${CASH} =============\n`);
if (LIVE >=1 ){ 
console.log(`============ 直播次数为：${LIVE} =============\n`);
}else {
console.log(`============ 看直播关闭 =============\n`);
}
let isGetCookie = typeof $request !== 'undefined'
if (isGetCookie) {
  GetCookie()
  $.done();
} else {
  !(async () => {
    await all();
    await msgShow();
  })()
      .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
      })
      .finally(() => {
        $.done();
      })
}
async function all() {
if (!Length) {
    $.msg(
	$.name, 
	'提示：⚠️请点击前往获取https://apps.apple.com/cn/app/%E7%AC%91%E8%B0%B1/id1487075970\n', 
	'https://apps.apple.com/cn/app/%E7%AC%91%E8%B0%B1/id1487075970', 
	{"open-url": "https://apps.apple.com/cn/app/%E7%AC%91%E8%B0%B1/id1487075970"}
	);
    return;
  }
  for (let i = 0; i < Length; i++) {
	if (COOKIE.iboxpayheaderVal) {	
  iboxpayheaderVal = XP_COOKIES.iboxpayheaderVal[i];
    }
    if (!COOKIE.iboxpayheaderVal) {
  iboxpayheaderVal = iboxpayheaderArr[i];  
  }

ts = Math.round((new Date().getTime() +
    new Date().getTimezoneOffset() * 60 * 1000 +
    8 * 60 * 60 * 1000)/1000).toString();

traceid=JSON.parse(iboxpayheaderVal)["traceid"];
oldtime=traceid.substr(traceid.indexOf("161"),13);
  O = (`${$.name + (i + 1)}🔔`);
  await console.log(`-------------------------\n\n🔔开始运行【${$.name+(i+1)}】`)

 

let cookie_is_live = await user(i + 1);//用户名
    if (!cookie_is_live) {
      continue;
    }       
      await goldcoin();//金币信息
	  await coin();//账户信息	  
	  //await play();//播放
	  //let video_is_live = await video(i + 1);//视频
    //if (!video_is_live) {
   //continue;
 //}
      //await goldvideo();//金蛋视频
if (LIVE >=1 && nowTimes.getHours() >= 8 && nowTimes.getHours() <= 22) {
	  await sylist();//收益列表
if ($.sylist.resultCode && livecs<LIVE) {
	  await lives();//看直播
           }
		   
		}	  
	  	  
     }
      
  }
  
//通知
function msgShow() {
  return new Promise(async resolve => {
      if (notifyInterval != 1) {
        console.log($.name + '\n' + $.message);
      }
      if (notifyInterval == 1) {
        $.msg($.name, ``, $.message);
      }
      if (notifyInterval == 2 && (nowTimes.getHours() === 12 || nowTimes.getHours() === 23) && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= 10)) {
        $.msg($.name, ``, $.message);
      }
      if (notifyInterval == 3 && (nowTimes.getHours() === 6 || nowTimes.getHours() === 12 || nowTimes.getHours() === 18 || nowTimes.getHours() === 23) && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= 10)) {
        $.msg($.name, ``, $.message);
      }
      if (notifyttt == 1 && $.isNode() && (nowTimes.getHours() === 12 || nowTimes.getHours() === 23) && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= 10))
        await notify.sendNotify($.name, $.message);	
	resolve()
  })
}
//用户名
function user(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
if ($.isNode()) {
	tts = Math.round(new Date().getTime() +
new Date().getTimezoneOffset() * 60 * 1000 ).toString();
}else tts = Math.round(new Date().getTime() +
new Date().getTimezoneOffset() * 60 * 1000 +8 * 60 * 60 * 1000).toString();
header=iboxpayheaderVal.replace(`${oldtime}`, `${tts}`)
      let url = {
        url: `https://veishop.iboxpay.com/nf_gateway/nf_user_center_web/shopkeeper/v1/get_context_info.json`,
        headers: JSON.parse(header),		
      }
      $.get(url, async(err, resp, data) => {
        try {
          if (logs) $.log(`${O}, 用户名🚩: ${data}`);
          $.user = JSON.parse(data);
		  if($.user.resultCode == 0) {
let cookie_not_live_message = new Date(
    new Date().getTime() +
    new Date().getTimezoneOffset() * 60 * 1000 +
    8 * 60 * 60 * 1000
  ).toLocaleString()  + "❌❌❌COOKIE失效";	           
        $.msg(O, cookie_not_live_message);
if($.isNode()){      
        notify.sendNotify(O, cookie_not_live_message);
	  }	       
        resolve(false);
      } else {
        $.message +=`\n${O}`;
        $.message += `\n========== 【${$.user.data.customerInfo.nickname}】 ==========\n`;
        resolve(true);
      }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}
//金币信息  
function goldcoin(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
if ($.isNode()) {
	tts = Math.round(new Date().getTime() +
new Date().getTimezoneOffset() * 60 * 1000 ).toString();
}else tts = Math.round(new Date().getTime() +
new Date().getTimezoneOffset() * 60 * 1000 +8 * 60 * 60 * 1000).toString();
header=iboxpayheaderVal.replace(`${oldtime}`, `${tts}`)
	  let url = {
        url:`https://veishop.iboxpay.com/nf_gateway/nf_customer_activity/day_cash/v1/balance.json?source=WX_APP_KA_HTZP`,        
        headers: JSON.parse(header),
      }
      $.get(url, async(err, resp, data) => {
        try {
          if (logs) $.log(`${O}, 金币信息🚩: ${data}`);
          $.goldcoin = JSON.parse(data);
 $.message +='【金币信息】：今日金币'+$.goldcoin.data.coinSum+',预估金额'+$.goldcoin.data.balanceSum/100+'元'+'\n';
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}
//账户信息  
function coin(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
if ($.isNode()) {
	tts = Math.round(new Date().getTime() +
new Date().getTimezoneOffset() * 60 * 1000 ).toString();
}else tts = Math.round(new Date().getTime() +
new Date().getTimezoneOffset() * 60 * 1000 +8 * 60 * 60 * 1000).toString();
header=iboxpayheaderVal.replace(`${oldtime}`, `${tts}`)
	  let url = {
        url:`https://veishop.iboxpay.com/nf_gateway/nf_customer_activity/day_cash/v1/withdraw_detail.json?source=WX_APP_KA_HTZP`,        
        headers: JSON.parse(header),
      }
      $.get(url, async(err, resp, data) => {
        try {
          if (logs) $.log(`${O}, 账户信息🚩: ${data}`);
          $.coin = JSON.parse(data);
 $.message +='【账户信息】：可提余额'+$.coin.data.balance/100+',明日入账'+$.coin.data.tomorrowAmt/100+'元'+'\n';
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}
//播放
function play(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
		for (let i = 0; i < CS; i++) {
        setTimeout(() => {	
if ($.isNode()) {
	tts = Math.round(new Date().getTime() +
new Date().getTimezoneOffset() * 60 * 1000 ).toString();
}else tts = Math.round(new Date().getTime() +
new Date().getTimezoneOffset() * 60 * 1000 +8 * 60 * 60 * 1000).toString();
header=iboxpayheaderVal.replace(`${oldtime}`, `${tts}`)
		do playTime = Math.floor(Math.random()*31);
        while( playTime < 20 )
		do playTimess = Math.floor(Math.random()*41);
        while( playTimess < 30 )
		do playid = Math.floor(Math.random()*49600000000000000);
        while( playid < 10000000000000000 )
playbodyVal=`{"videoPublishId":"13${playid}","playTimeLenght":${playTime},"type":1,"videoTime":${playTimess}}`;
videoPublishId=playbodyVal.substring(playbodyVal.indexOf("videoPublishId")+17,playbodyVal.indexOf(`","pl`))
if(i==2){
videoPublishId3=playbodyVal.substring(playbodyVal.indexOf("videoPublishId")+17,playbodyVal.indexOf(`","pl`))
}
if(i==3){
videoPublishId4=playbodyVal.substring(playbodyVal.indexOf("videoPublishId")+17,playbodyVal.indexOf(`","pl`))
}
if(i==4){
videoPublishId5=playbodyVal.substring(playbodyVal.indexOf("videoPublishId")+17,playbodyVal.indexOf(`","pl`))
}
if(i==5){
videoPublishId6=playbodyVal.substring(playbodyVal.indexOf("videoPublishId")+17,playbodyVal.indexOf(`","pl`))
}
console.log(`视频ID${i+1}📍${videoPublishId}`)
      let url = {
        url: `https://veishop.iboxpay.com/nf_gateway/nf_content_service/video/ignore_tk/v1/video_channel/uplaod_play_video_recode.json`,
        headers: JSON.parse(header),
		body: playbodyVal,
      }
      $.post(url, async(err, resp, data) => {
        try {
          if (logs) $.log(`${O}, 播放ID${i+1}🚩: ${data}`);
          $.play = JSON.parse(data);
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
	  }, i * 30000);
      }	  
    },timeout)
  })
}
//视频
function video(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
		for (let i = 0; i < CS; i++) {
$.index = i+1	
        setTimeout(() => {
		
if ($.isNode()) {
	tts = Math.round(new Date().getTime() +
new Date().getTimezoneOffset() * 60 * 1000 ).toString();
}else tts = Math.round(new Date().getTime() +
new Date().getTimezoneOffset() * 60 * 1000 +8 * 60 * 60 * 1000).toString();
header=iboxpayheaderVal.replace(`${oldtime}`, `${tts}`)
		videobodyVal=`{"type":1,"videoList":[{"videoId":"${videoPublishId}","type":1,"isFinishWatch":false}],"actId":"284"}`
      let url = {
        url: `https://veishop.iboxpay.com/nf_gateway/nf_customer_activity/day_cash/v1/give_gold_coin_by_video.json`,
        headers: JSON.parse(header),
        body: videobodyVal,
      }
      $.post(url, async(err, resp, data) => {
        try {
          if (logs) $.log(`${O}, 视频🚩: ${data}`);
          $.video = JSON.parse(data);		  
		  if($.video.resultCode == 0) {
        $.message +='⚠️'+$.video.errorDesc+'\n'      
        resolve(false);
      } else {
        console.log(`开始领取第${i+1}次视频奖励，获得${$.video.data.goldCoinNumber}金币\n`);
ins +=$.video.data.goldCoinNumber;
  await $.wait($.index*30000-29000);	  
  $.message +=  
`【视频奖励】：共领取${$.index}次视频奖励，共${ins}金币\n`
resolve(true);
      }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
	  }, i * 30000);
      }	
    },timeout)
  })
}
//金蛋视频
function goldvideo(timeout = 60000) {
  return new Promise((resolve) => {
    setTimeout( ()=>{		
if ($.isNode()) {
	tts = Math.round(new Date().getTime() +
new Date().getTimezoneOffset() * 60 * 1000 ).toString();
}else tts = Math.round(new Date().getTime() +
new Date().getTimezoneOffset() * 60 * 1000 +8 * 60 * 60 * 1000).toString();
header=iboxpayheaderVal.replace(`${oldtime}`, `${tts}`)
		goldvideobodyVal=`{"type":2,"videoList":[{"videoId":"${videoPublishId3}","type":1,"isFinishWatch":false},{"videoId":"${videoPublishId4}","type":1,"isFinishWatch":false},{"videoId":"${videoPublishId5}","type":1,"isFinishWatch":false},{"videoId":"${videoPublishId6}","type":1,"isFinishWatch":false}],"actId":"284"}`
      let url = {
        url: `https://veishop.iboxpay.com/nf_gateway/nf_customer_activity/day_cash/v1/give_gold_coin_by_video.json`,
        headers: JSON.parse(header),
        body: goldvideobodyVal,
      }
      $.post(url, async(err, resp, data) => {
        try {
          if (logs) $.log(`${O}, 金蛋视频🚩: ${data}`);
          $.goldvideo = JSON.parse(data);
	if ($.goldvideo.resultCode==1){	
      console.log('金蛋视频奖励，获得'+$.goldvideo.data.goldCoinNumber+'金币')
	  $.message +=  
  '【金蛋视频奖励】：获得'+$.goldvideo.data.goldCoinNumber+'金币\n'
	   }    
       if ($.goldvideo.resultCode==0){	
console.log($.goldvideo.errorDesc+'\n');
$.message +=  
  '【金蛋视频奖励】：'+$.goldvideo.errorDesc+'\n';
	    }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}
//直播
function lives(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{



for (let i = 0; i < CS; i++) {
$.index = i+1	
do RT = Math.floor(Math.random()*45000);
        while( RT < 35000 )
        setTimeout(() => {

if ($.isNode()) {
	tts = Math.round(new Date().getTime() +
new Date().getTimezoneOffset() * 60 * 1000 ).toString();
}else tts = Math.round(new Date().getTime() +
new Date().getTimezoneOffset() * 60 * 1000 +8 * 60 * 60 * 1000).toString();
	do liveid = Math.floor(Math.random()*4274552669282305);
        while( liveid < 3654320204128256 )
		
header=iboxpayheaderVal.replace(`${oldtime}`, `${tts}`)
		livesbodyVal=`{
 "actId": "283",
 "liveId": "135${liveid}"
}`
      let url = {
        url: `https://veishop.iboxpay.com/nf_gateway/nf_customer_activity/day_cash/v1/give_redbag_by_live.json`,
        headers: JSON.parse(header),
        body: livesbodyVal,
      }
      $.post(url, async(err, resp, data) => {
        try {
          if (logs) $.log(`${O}, 直播🚩: ${data}`);
          $.lives = JSON.parse(data);
	if ($.lives.resultCode==1){	
      console.log(`开始领取第${i+1}次直播奖励，获得500金币,等待${RT/1000}秒继续\n`);
	  ins +=$.lives.data.goldCoinAmt;
	  await $.wait($.index*45000-44000);	  
  $.message +=`【直播奖励】：共领取${$.index}次直播奖励，共2000金币\n`
	   }    
       if ($.lives.resultCode==0){	
console.log($.lives.errorDesc+'\n');
$.message +='【直播奖励】：'+$.lives.errorDesc+'\n';
	    }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })

	  }, i * RT);
      }
    },timeout)
  })
}
//收益列表
function sylist(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{


if ($.isNode()) {
	tts = Math.round(new Date().getTime() +
new Date().getTimezoneOffset() * 60 * 1000 ).toString();
}else tts = Math.round(new Date().getTime() +
new Date().getTimezoneOffset() * 60 * 1000 +8 * 60 * 60 * 1000).toString();		
      let url = {
        url: `https://veishop.iboxpay.com/nf_gateway/nf_customer_activity/day_cash/v1/list_gold_coin.json?source=WX_APP_KA_HTZP&date=${ddtime}&actTypeId=0&size=800`,
        headers: JSON.parse(header),
      }
      $.get(url, async(err, resp, data) => {
        try {
          if (logs) $.log(`${O}, 收益列表🚩: ${data}`);
          $.sylist = JSON.parse(data);
	if ($.sylist.resultCode==1 && data.match(/500/g)){
live = data.match(/500/g);	
livecs = live.length;	
      console.log('已获得直播奖励 '+livecs+' 次，共'+livecs*500+'金币\n')
	  $.message +=  
  '【直播收益】：已获得直播奖励 '+livecs+' 次，共'+livecs*500+'金币\n'
	   }else livecs = 0    
       if ($.sylist.resultCode==0){	
console.log($.sylist.errorDesc+'\n');
$.message +=  
  '【直播收益】：'+$.sylist.errorDesc+'\n';
	    }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}
//提现
function goldcointowallet(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
	  let body =`auth=${pcpopclub}&userid=${app_userid}&cashtype=3&goldcoin_amount=${CASH*10000}&validatecode=&faceno=&a=18&pm=1&v=1.7.0&device_id=${app_deviceid}&sessionid=${sessionid}&_timestamp=${tts}`
      let url = {
        url: `https://mobile.app.autohome.com.cn/fasthome/goldcoin/goldcointowallet`,
        headers: JSON.parse(iboxpayheaderVal),
		body: body,
      }
      $.post(url, async(err, resp, data) => {
        try {
          if (logs) $.log(`${O}, 提现🚩: ${data}`);
          $.goldcointowallet = JSON.parse(data);
if($.goldcointowallet.returncode==0)
  $.message += `【现金提现】:成功提现${CASH}元\n`;
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}
// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log(``,`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,``).trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):``;if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,``):e}catch(t){e=``}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+``).substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((``+e[s]).length)));return t}msg(e=t,s=``,i=``,r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=[``,"==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log(``,`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log(``,`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log(``,`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
