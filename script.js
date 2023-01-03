let area = [ //ゲームエリアの二次元配列（24ｘ12）
    [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8], //表示されない
    [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8], //表示されない
    [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8], //表示されない
    [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
];
const minos = [ //4ｘ4でミノの形と数字を規定
    //空ミノ
    [[0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]],
    //Z-ミノ
    [[0, 0, 0, 0],
     [0, 0, 0, 0],
     [-1, -1.5, 0, 0],
     [0,  -1,  -1, 0]],
    //J-ミノ
    [[0, 0, 0, 0],
     [0, 0, -2, 0],
     [0, 0, -2.5, 0],
     [0, -2, -2, 0]],
    //T-ミノ
    [[0, 0, 0, 0],
     [0, 0, 0, 0],
     [-3, -3.5, -3, 0],
     [0, -3, 0, 0]],
     //I-ミノ
    [[0, -4, 0, 0],
     [0, -4, 0, 0],
     [0, -4.5, 0, 0],
     [0, -4, 0, 0]],
    //S-ミノ
    [[0, 0, 0, 0],
     [0, 0, 0, 0],
     [0, -5.5, -5, 0],
     [-5, -5, 0, 0]],
    //L-ミノ
    [[0, 0, 0, 0],
     [0, -6, 0, 0],
     [0, -6.5, 0, 0],
     [0, -6, -6, 0]],
     //O-ミノ
    [[0, 0, 0, 0],
     [0, 0, 0, 0],
     [0, -7, -7.5, 0],
     [0, -7, -7, 0]],
]
const colors = ["black", "red", "blue", "purple", "skyblue", "green", "orange", "yellow", "white"];
const table = document.getElementById("gameArea");
const nxt = document.getElementById("nextMino");

let gameMode = 4, del_lines, level, score, nextMinoIndex, mSec, hiScore = 0;

//Startが押されたとき、Wrapperを隠し、ゲームを始める
function start() {
    let gameover = document.getElementById("start-wrap");
    gameover.style.display = "none";
    gameMode = 0
    main(0);
}

//メインループ
function main(time){
    switch (gameMode){
        case 0:
            //Mode0: Game Start
            resetGame();
            changeColor();
            writeScore();
            gameMode = 3;
            break;
        case 1:
            //Mode1: Mino Move
            //mSecごとにdown()
            if(time >= mSec){
                down();
                time = 0;
            } 
            changeColor();
            break;
        case 2:
            //Mode2: Delete Check
            gameMode = 9;
            changeColor();
            setTimeout(delete_check, 400);
            break;
        case 3:
            //Mode3: Next Mino
            changeScore(0);
            changeLevel();
            writeScore();
            createMino();
            nextMino();
            time = 0;
            gameMode = 1
            break;
        case 4:
            //Mode4: Game Over
            changeColor();
            let gameover = document.getElementById("start-wrap");
            gameover.style.display = "inline";
            let showscore = document.getElementById("showscore");
            if (score > hiScore) {
                hiScore = score;
            }
            showscore.innerHTML = `<p>GAME OVER<br>LEVEL: ${level}<br>SCORE: ${score}<br>Hi SCORE: ${hiScore}</p>`
            return;
        case 9: 
            //Mode9: Pause
            break;

    }
    time+=25;
    setTimeout(() => {
        main(time);
    }, 25);
}

//pause mode
function pause(){
    let pauseArea = document.getElementById("pause-wrap");
    gameMode = 9;
    pauseArea.style.display = "inline";
}

//Pause解除
function lift_pause(){
    let pauseArea = document.getElementById("pause-wrap");
    pauseArea.style.display = "none";
    gameMode = 1;
}
//GameOverの判定
function Mode_check(){
    for (let i = 1; i < area[3].length - 1; i++) {
        if (area[3][i] != 0) {
            //Game Over
            return 4;
        }
    }
    //Delete Checkへ
    return 2;
}

//Gameの状態のリセット
function resetGame(){
    //Area 中身のリセット
    for (let i = 0; i < area.length - 1; i++) {
        for (let j = 1; j < area[i].length - 1; j++) {
            area[i][j] = 0;
        }
    }
    del_lines = 0;
    level = 1;
    score = -10;
    mSec = 1000;
    nextMinoIndex = getRundom(1, minos.length - 1);
}

//LEVELを変える計算
function changeLevel(){ 
    //del_lines = 2, 4, 7, ...（階差数列が2, 3, 4, ...）でレベルアップ
    while( del_lines >= ((level + 1) * level / 2) + 1){
        level++;
    }
    //インターバル変化 Level10まで
    if(level <= 10){ 
        mSec = (11 - level) * 100;
    }
}
 //scoreを変える
function changeScore(n) {
    switch(n){
        case 0:
            //minoが下まで落ちるとLEVEL×10点
            score += level * 10;
            break;
        case 1: //列を消すとLEVEL×100点
            score += level * 100;
            break;
        default:
            break;
    }
    
}

//スコアなどの書き換え
function writeScore(){
    let levelTXT = document.getElementById("level");
    levelTXT.innerHTML = `LEVEL ${level}`;
    let scoreTXT = document.getElementById("score");
    scoreTXT.innerHTML = `SCORE ${score}`; 
    let hiscoreTXT = document.getElementById("hi_score");
    hiscoreTXT.innerHTML = `Hi SCORE ${hiScore}`;
}

 //areaの数字に応じて色を変化
function changeColor(){
    for (let i = 0; i < area.length; i++) {
        for (let j = 0; j < area[i].length; j++) {
            try {
            //LEVEL5以上、CreateMino後にUncaught TypeError: Cannot read properties of undefined (reading 'style')
            //errorになる条件は不明
            table.rows[i].cells[j].style.backgroundColor = colors[Math.floor(Math.abs(area[i][j]))];
            } catch (e) {
                console.error(e);
                console.log(i);
                console.log(j);
                continue;
            }
        }
    }
}

//ｎ以上ｍ以下の乱数を生成
function getRundom(n, m) {
    for (let i = 0 ; i < 5 ; i++){
        let num = Math.floor(Math.random() * (m + 1 - n)) + n;
        return num;
    }
};

//最上部(非表示)にミノを生成
function createMino() { 
    //gameAreaに生成
    let mino = minos[nextMinoIndex];
    let col = getRundom(1, 8);
    for(let i = 0; i < mino.length; i++){
        for(j = 0; j < mino[i].length; j++){
            area[i][j + col] = mino[i][j];
        }
    }
    for(i=0; i < 4; i++){
        area[i][11]=8;
    }
    nextMinoIndex = getRundom(1, minos.length - 1);
}

//次のMinoを表示
function nextMino(){ 
    let next = minos[nextMinoIndex];
    //LEVEL5以上、CreateMino後にUncaught TypeError: Cannot read properties of undefined (reading 'style')
    //errorになる条件は不明
    for (let m = 0; m < next.length; m++) {
        for (let n = 0; n < next[m].length; n++) {
            try {
                nxt.rows[m].cells[n].style.backgroundColor = colors[Math.floor(Math.abs(next[m][n]))];
            }catch (e) {
                console.error(e);
                console.log(m);
                console.log(n);
                continue;
            }
        }   
    }
    //Z, T, S, O ミノのとき
    if (nextMinoIndex % 2 != 0){
        for(m = 0; m < next.length - 1; m++){
            for(n = 0; n < next[m].length; n++){
                nxt.rows[m].cells[n].style.backgroundColor = nxt.rows[m + 1].cells[n].style.backgroundColor;
                if (m === next.length - 2) nxt.rows[m + 1].cells[n].style.backgroundColor = colors[0];
            }
        }
    }
}

//矢印ボタンでの操作 gameMode=1の時のみ有効
document.addEventListener('keydown', keydown_ivent);
function keydown_ivent(e) {
    if (gameMode != 1) { 
        //gemeModeが1でないとき何もしない
        return;
    }
    switch (e.key) {
        case 'ArrowDown':
            down();
            break;
        case 'ArrowLeft':
            left();
            break;
        case 'ArrowRight':
            right();
            break;
        case 'ArrowUp':
            spin();
            break;
        case ' ':
            fall();
            break;
        case 'p':
            pause();
            break;
        default:
            break;  
        }  
    }

//下移動
function down() {
    if(gameMode != 1){ 
        //gemeModeが1でないとき何もしない
        return;
    }
    let count = 0;
    for(let i = area.length - 1; i > 0; i--){
        for(let j = 0; j < area[i].length; j++){
            if(area[i][j] > 0 && area[i-1][j] < 0){
                count ++ ;
            }
        }
    }
    if(count > 0){ 
        //下に移動できなくなったとき
        count = 0;
        loop1: for (let i = 0; i < area.length; i++) {
            for (let j = 0; j < area[i].length; j++) {
                if(area[i][j] < 0){
                    area[i][j] = Math.floor(Math.abs(area[i][j]));
                    count++;
                }
                if(count === 4) break loop1;
            }
        }
        gameMode = Mode_check();
    }else{ 
        //下に移動できるとき
        loop2: for(let i = area.length - 1; i > 0; i--){
            for(let j = 0; j < area[i].length; j++){
                if(area[i-1][j] < 0){
                    area[i][j] = area[i-1][j];
                    area[i-1][j] = 0;
                }
                if(count === 4) break loop2;
            }
        }
    }   
}

//一番下まで落ちる
function fall(){ 
    if(gameMode != 1){
        return;
    }
    let count = 0;
    let minoCells =[];
    let color;
    loop1: for(let i = 0; i < area.length; i++){ //動いているミノを格納
        for(let j = 0; j <area[i].length; j++){
            if(area[i][j] < 0){
                minoCells.push([i,j]);
                color = Math.floor(Math.abs(area[i][j]));
                area[i][j] = 0;
            }
            if(minoCells.length === 4){
                break loop1;
            }
        }
    }
    loop2: for(i = 0; i< area.length; i++){
        minoCells.forEach(element => {
            if( area[element[0] + i + 1][element[1]] > 0 ){
                count++;
            }
        });
        if(count > 0){
            minoCells.forEach(element =>{
                area[element[0] + i][element[1]] = color
            });
            break loop2;
        }
    }
    gameMode = Mode_check();
}

//左移動
function left() { 
    if(gameMode != 1){ 
        //gemeModeが1でないとき何もしない
        return;
    }
    let count = 0;
    for(let i = 0; i < area.length; i++){
        for (let j = 0; j<area[i].length; j++){
            if(area[i][j] > 0 && area[i][j + 1 ] < 0){
                count ++ ;
            }
        }
    }
    if(count === 0){
        loop:for (let i = 0; i < area.length; i++){
            for (let j = 0; j < area[i].length; j++){
                if(area[i][j + 1] < 0){
                    area[i][j] = area[i][j+1];
                    area[i][j + 1] = 0;
                    count++;
                }
                if(count === 4) break loop;
            }
        }
    }
}

//右移動
function right() { 
    if(gameMode != 1){ 
        //gemeModeが1でないとき何もしない
        return;
    }
    let count = 0;
    for(let i = 0; i < area.length; i++){
        for(let j = area[i].length - 1; j > 0; j--){
            if(area[i][j] > 0 && area[i][j - 1] < 0){
                count ++ ;
            }
        }
    }
    if(count === 0){
        loop: for (let i = 0; i < area.length; i++){
            for (let j = area[i].length - 1; j > 0; j--){
                if(area[i][j - 1] < 0){
                    area[i][j] = area[i][j - 1];
                    area[i][j - 1] = 0;
                    count++;
                }
                if (count === 4) break loop;
            }
        }
    }
}

//回転
function spin() {
    if(gameMode != 1){ 
        //gemeModeが1でないとき何もしない
        return;
    }
    //基準となる位置と色を取得
    let center=[];
    let  minoCells= [];
    let color;
    loop: for(let i = 0; i < area.length; i++){
        for(let j = 0; j <area[i].length; j++){
            if (area[i][j] != Math.floor(area[i][j])){
                center.push(i);
                center.push(j);
            }else if(area[i][j] < 0){
                minoCells.push([i,j]);
                color = area[i][j];
                area[i][j] = 0;
            }
            if(center.length + minoCells.length === 5){
                break loop;
            }
        }
    }
    let tPos = [];//minoCellの動くべき位置を格納
    minoCells.forEach(element => {
        let dRow = element[0] - center[0];
        let dCol = element[1] - center[1];
        //センターの上下左右のセル
        if(dRow * dCol === 0){
            tPos.push([center[0] + dCol, center[1] + (dRow * -1)]);
        }else if(dRow * dCol > 0){
            tPos.push([center[0] + dRow, center[1] + (dCol * -1)]);
        }else{
            tPos.push([center[0] + (dRow * -1), center[1] + dCol]);
        }
    });
    try{
    //回転できるのかチェック
    let check = 0;
    tPos.forEach(element => {
        //Level 6以上でバグ element[0]でCannot read properties of undefined (reading '（数字）')
        if(area[element[0]][element[1]] != 0){
            check ++;
        } 
    });
    //回転
    if(check === 0){
        tPos.forEach(element => {
            area[element[0]][element[1]] = color;
        });    
    }else{
        minoCells.forEach(element => {
            area[element[0]][element[1]] = color;
        });
    }
    }catch(e){
        console.error(e);
        minoCells.forEach(element => {
            area[element[0]][element[1]] = color;
        });
    }
}

//１列揃っていたら消す
function delete_check() { 
    let Is = [];
    for(let I = 3; I < area.length - 1; I++) {
        let count = 0;
        area[I].forEach(element => {
            if(element > 0) {
                count++;
            }
        });
        if(count === 12){
            Is.push(I);
        }
    }
    if(Is.length != 0){
        Is.forEach((element, index) => {
            for (let ii = element; ii > 0; ii--) {
                for(let jj = 0; jj < area[ii].length; jj++){
                    area[ii][jj] = area[ii - 1][jj];
                }
            }
            del_lines++;
            action(element, index);
        });
    }else{
        gameMode = 3;
    }
}

//消えるときのアニメーション
function action(i, index) { 
    let count = 0;
    const funcA = () => {
        for(j = 0; j < area[i].length; j++){
            table.rows[i].cells[j].style.backgroundColor = "white";
        }
        count ++;
        setTimeout(funcB, mSec / 2);
    }
    const funcB = () => {
        for(j = 0; j < area[i].length; j++){
            table.rows[i].cells[j].style.backgroundColor = "black";
        }
        if(count < 4){
            setTimeout(funcA, mSec / 2);
        }else {
            changeScore(1);
            if (index === 0) {
                //Pause 解除
                gameMode = 3;
            }
        }
    }
    funcA();
}