/*
Zhiheng Su, CMPM120-01
'Hunting Game 2021'
4/19/2021
Time Taken: 24 hrs

randomize "ships" -- check. (5) (Helped from Prof Adam in office hour)
background music -- check. (5)
display time -- check.(10) (Help from TA Tessa Eagle)
add time for hits -- check (20) (Thomas and Jared helped from discord)
full reskin -- check(60) (new assets; new sfx; new UI; new menu screen)
100 points

//sound effects from mixkit.com, The Mushroom Kingdom, www.fesliyanstudios.com, www.storyblocks.com

*/
let config = {
    type: Phaser.CANVAS,
    width:640,
    height:480,
    scene: [Menu, Play],
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let bulletSpeed = 4;

let keyF, keyR, keyLEFT, keyRIGHT;