let coins;
let player;
let score = 0;
let mySound;
let BGM;
let count=0;

function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('wadaiko.mp3');
  BGM=loadSound('kogane.mp3');
  img = loadImage("bakuhatu.png");
}

function setup() {
    createCanvas(600, 600);
    // スコア表示用の設定
    fill(255);
    noStroke();
    textSize(72);
    textAlign(CENTER, CENTER);
  BGM.play();

    coins = new Group();
    // 黄色の小さな矩形のコライトを10個作成して、コイングループに追加
  
  
   
    
    // プレイヤー用の白い矩形
    player = createSprite(25, 25, 25, 25);
    player.shapeColor = color(255);
  
}


function draw() {
    background(50);
  
  if(coins.length<2) {
        
     let c = createSprite(random(600, width - 100), random(600, height - 100), 80, 40);
        c.shapeColor = color(255, 0, 255);
        coins.add(c);
        count=0.5;
     
    }
  else if (coins.length<3){ 
      
        let c = createSprite(random(600, width - 100), random(600, height - 100), 80, 40);
        c.shapeColor = color('#00ff00');
        coins.add(c);
        count=2;
    }
   else if (coins.length<4){ 
      
        let c = createSprite(random(600, width - 100), random(600, height - 100), 80, 40);
        c.shapeColor = color(255, 255, 0);
        coins.add(c);
         count=4;
    
    }
   
  else{}

  for (let i = 0; i < coins.length; i++) {
        // 各スプライトを、そのスプライトの幅の1%だけ右に移動
    
        coins[i].position.x += coins[i].width * 0.02;
        const randomNumber1 = Math.floor(Math.random() * 600);
        // スケッチの右端まで到達したら、左端に移動 => 再び右に現れ移動を開始する
        if (coins[i].position.x > width) {
            coins[i].position.x = 0;
            coins[i].position.y=randomNumber1;
        }
    }
    // プレイヤーを少し遅れてマウスに追随
    player.velocity.x = (mouseX - player.position.x) * 0.1;
    player.velocity.y = (mouseY - player.position.y) * 0.1;
  
  

    // プレイヤーがコイングループと重なったら、
    
  player.overlap(coins, function(player, coin) {
        // 重なったそのコインを削除
   
    coin.remove();
  // playing a sound file on a user gesture
  // is equivalent to `userStartAudio()`
  mySound.play();
        // スコアを1増やす
        score ++;
        
    });
    drawSprites();
  
    if (BGM.isPlaying()) {
        text(score, width / 2, height / 2);
    }
    else{
        text("おめでとう！", width / 2, height / 2);
    }
}