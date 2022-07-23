const gameArea = [ //ゲームエリアの二次元配列（25ｘ12）
    [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8], //表示されない
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
const table = document.getElementById("gameArea");
const minos = [ //4ｘ4でミノの形と数字を規定
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
    //I-ミノ
    [[0, -3, 0, 0],
     [0, -3, 0, 0],
     [0, -3.5, 0, 0],
     [0, -3, 0, 0]],
    //T-ミノ
    [[0, 0, 0, 0],
     [0, 0, 0, 0],
     [-4, -4.5, -4, 0],
     [0, -4, 0, 0]],
    //S-ミノ
    [[0, 0, 0, 0],
     [0, 0, 0, 0],
     [0, -5.5, -5, 0],
     [-5, -5, 0, 0]],
    //O-ミノ
    [[0, 0, 0, 0],
     [0, 0, 0, 0],
     [0, -6, -6.5, 0],
     [0, -6, -6, 0]],
    //L-ミノ
    [[0, 0, 0, 0],
     [0, -7, 0, 0],
     [0, -7.5, 0, 0],
     [0, -7, -7, 0]]
]
let gameMode = 3;
let area = gameArea;
let delieted_lines = 0;
let level = 1;
let score = 0;
let hiScore = 0;
let mSec = 1000;
function modeChange() {//ゲームモードの指定
    switch (gameMode) {
        case 0: //start
            for (let i = 0; i < area.length - 1; i++) {
                for (let j = 1; j < area[i].length - 1; j++) {
                    area[i][j] = 0;
                }
            }
            delieted_lines = 0; //reset
            level = 1;
            score = 0;
            mSec = 1000;
            gameMode = 1;
            changeLevel();
            changeScore();
            modeChange();
            break;
        case 1: //minoを動かす
            createMino()
            downInterval = setInterval(down, mSec);
            break;
        case 2:
            //GAMEOVERの判定
            for (let i = 1; i < area[4].length - 1; i++) {
                if (area[4][i] != 0) {
                    //GAMEOVERの処理
                    let hiscoreTXT = document.getElementById("hi_score");
                    if(score > hiScore){
                        hiScore = score;
                        hiscoreTXT.innerHTML = `Hi SCORE ${hiScore}`;
                    }
                    alert("GAMEOVER");
                    gameMode = 3;
                    return;
                }
            }
            changeScore(0);
            changeLevel();
            gameMode = 1;
            modeChange();
            break;
        default:
            break;
    }
}
function start() { //gameStart
    if (gameMode != 3) { //gemeModeが3でないとき何もしない
        return;
    }
    gameMode = 0
    modeChange();
}
function changeLevel(){ //LEVELを変えて書き換え
    if(delieted_lines > (level - 2) * level + 4){ //5, 8, 13, 20 ...でレベルアップ
        level++;
        changeLevel();
    }else if (delieted_lines > 1) { //2列消すとLEVEL2
        level = 2;
        changeLevel;
    }
    let levelTXT = document.getElementById("level");
    levelTXT.innerHTML = `LEVEL ${level}`; //HTML書き換え
    if(level < 10){ //インターバル変化
        mSec = (11 - level) * 100;
    }else{
        mSec = 1000 / level;
    }
}
function changeScore(n) { //scoreを変えて書き換え
    switch(n ){
        case 0: //minoが下まで落ちるとLEVEL×10点
            score += level * 10;
            break;
        case 1: //列を消すとLEVEL×100点
            score += level * 100;
            break;
        default:
            break;
    }
    let scoreTXT = document.getElementById("score");
    scoreTXT.innerHTML = `SCORE ${score}`;
}
function changeColor(){ //areaの数字に応じて色を変化
    if(gameMode != 1){ //gemeModeが1でないとき何もしない
        return;
    }
    const colors = ["black", "red", "blue", "skyblue", "purple", "green", "yellow", "orange", "black"];
    for (i = 0; i < area.length; i++) {
        for (j = 0; j < area[i].length; j++) {
            table.rows[i].cells[j].style.backgroundColor = colors[Math.floor(Math.abs(area[i][j]))];
        }
    }
}
function getRundom(n, m) { //ｎ以上ｍ以下の乱数を生成
    for (let i = 0 ; i < 5 ; i++){
        let num = Math.floor(Math.random() * (m + 1 - n)) + n;
        return num;
    }
};
function createMino() { //最上部(非表示)にミノを生成
    if(gameMode != 1){ //gemeModeが1でないとき何もしない
        return;
    }
    let mino = minos[getRundom(0, 6)];
    let col = getRundom(1, 8);
    for(i = 0; i < mino.length; i++){
        for(j = 0; j < mino[i].length; j++){
            area[i][j + col] = mino[i][j];
        }
    }
    for(i=0; i<4; i++){
        area[i][11]=8;
    }
}
//矢印ボタンでの操作 gameMode=1の時のみ有効
document.addEventListener('keydown', keydown_ivent);
function keydown_ivent(e) {
    if (gameMode != 1) { //gemeModeが1でないとき何もしない
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
    }
}
//移動と回転
function down() { //下
    if(gameMode != 1){ //gemeModeが1でないとき何もしない
        return;
    }
    let count = 0;
    for(i = area.length - 1; i > 0; i--){
        for(j = 0; j < area[i].length; j++){
            if(area[i][j] > 0 && area[i-1][j] < 0){
                count ++ ;
            }
        }
    }
    if(count > 0){ //下に移動できなくなったとき
        for (i = 0; i < area.length; i++) {
            for (j = 0; j < area[i].length; j++) {
                area[i][j] = Math.floor(Math.abs(area[i][j]));
            }
        }
        gameMode = 2;
        clearInterval(downInterval); //自動で落ちるのを止める
        delete_check();
    }else{
        for(i = area.length - 1; i > 0; i--){
            for(j = 0; j < area[i].length; j++){
                if(area[i-1][j] < 0){
                    area[i][j] = area[i-1][j];
                    area[i-1][j] = 0;
                }
            }
        }
    }   
    changeColor();
} 
function left() { //左
    if(gameMode != 1){ //gemeModeが1でないとき何もしない
        return;
    }
    let count = 0;
    for(i = 0; i < area.length; i++){
        for(j = 0; j<area[i].length; j++){
            if(area[i][j] > 0 && area[i][j + 1 ] < 0){
                count ++ ;
            }
        }
    }
    if(count === 0){
        for(i = 0; i < area.length; i++){
            for(j = 0; j < area[i].length; j++){
                if(area[i][j + 1] < 0){
                    area[i][j] = area[i][j+1];
                    area[i][j + 1] = 0;
                }
            }
        }
    }
    changeColor();
}
function right() { //右
    if(gameMode != 1){ //gemeModeが1でないとき何もしない
        return;
    }
    let count = 0;
    for(i = 0; i < area.length; i++){
        for(j = area[i].length - 1; j > 0; j--){
            if(area[i][j] > 0 && area[i][j - 1] < 0){
                count ++ ;
            }
        }
    }
    if(count === 0){
        for(i = 0; i < area.length; i++){
            for(j = area[i].length - 1; j > 0; j--){
                if(area[i][j - 1] < 0){
                    area[i][j] = area[i][j - 1];
                    area[i][j - 1] = 0;
                }
            }
        }
    }
    changeColor();
}
function spin() { //回転
    if(gameMode != 1){ //gemeModeが1でないとき何もしない
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
    //回転できるのかチェック
    let check = 0;
    tPos.forEach(element => {
        if(area[element[0]][element[1]] != 0){
            check ++;
        } 
    });
    //回転
    if(check === 0){
        tPos.forEach(element => {
            area[element[0]][element[1]] = color
        });    
    }else{
        minoCells.forEach(element => {
            area[element[0]][element[1]] = color
        });
    }
    changeColor();
}
function delete_check() { //１列揃っていたら消す
    if(gameMode != 2){ //gemeModeが2でないとき何もしない
        return;
    }
    let Is = [];
    for(let I = 4; I < area.length - 1; I++) {
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
    if(Is.length === 0){
        modeChange();
    }else{
        Is.forEach((element, index) => {
            for (let ii = element; ii > 0; ii--) {
                for(let jj = 0; jj < area[ii].length; jj++){
                    area[ii][jj] = area[ii - 1][jj];
                }
            }
            delieted_lines++;
            action(element, index);
        });
    } 
}
function action(i, actionCount) { //消えるときのアニメーション
    if(gameMode != 2){ //gemeModeが1でないとき何もしない
        return;
    }
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
            if (actionCount === 0) {
                modeChange();
            }
        }
    }
    funcA();
}