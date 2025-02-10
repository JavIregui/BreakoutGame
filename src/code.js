var canvas;
var ctx;

var targetDeltaTime = 1 / 60;
var currentDeltaTime = 0;
var time = 0,
    FPS = 0,
    frames = 0,
    acumDelta = 0;
var timeSinceBegining = 0;
var timePlayed = 0;
var vidas = 5;

window.requestAnimationFrame = (function (evt){
    return window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback){
            window.setTimeout(callback, targetDeltaTime * 1000)
        };

}) ();

window.onload = BodyLoaded;

const GAME_STATE = {
    init: 0,
    normal: 1,
    end: 2
}

var currentGameState = GAME_STATE.init;

var balls = [];
var bricks = [];

function BodyLoaded(){

    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    SetupKeyboardEvents();

    Start();
    Loop();
}

function Start(){
    time = Date.now();
    timeSinceBegining = 0;
    timePlayed = 0;
    balls = [];

    player.Start();
    let ball = new Ball({x: canvas.width / 2, y: canvas.height / 2}, BallLost);
    balls.push(ball);
    balls.forEach(ball => ball.Start());

    for (let i = 0; i < 8; i++)
    {
        let width = canvas.width / 8;
        let height = 30;

        for (let j = 0; j < 6; j = ++j)
        {
            const brick = new Brick({x: i * width, y: j * height}, width, height, GetRandomColor());
            bricks.push(brick);
        }
    }

    currentGameState = GAME_STATE.init;
}

function Loop(){

    requestAnimationFrame(Loop);

    const now = Date.now();
    let deltaTime = (now - time) / 1000;
    currentDeltaTime = deltaTime;

    time = now;

    frames++;
    acumDelta += deltaTime;

    if (acumDelta > 1)
    {
        FPS = frames;
        frames = 0;
        acumDelta-= 1;
    }

    if (deltaTime > 0.1)
        deltaTime = 0.1;
    
    Update(deltaTime);

    Draw(ctx);

    Input.PostUpdate();
}

function Update(deltaTime)
{
    switch (currentGameState)
    {
        case GAME_STATE.init:

            if(Input.IsKeyDown(KEY_SPACE))
            currentGameState = GAME_STATE.normal
            vidas = 5;

        break;


        case GAME_STATE.normal:

            if(bricks.length == 0){
                currentGameState = GAME_STATE.end;
            }

            timeSinceBegining += deltaTime;
            timePlayed = Math.trunc(timeSinceBegining)

            player.Update(deltaTime);
            balls.forEach(ball => ball.Update(deltaTime));

            let ball = balls[0];

            for (let i = 0; i < bricks.length; i++)
            {
                for (let j = 0; j < balls.length; j++)
                {
                    let brick = bricks[i];
                    let ball = balls[j];
                    if (ball.position.x + ball.radius + 0.5 > brick.position.x &&
                        ball.position.x - ball.radius - 0.5 < brick.position.x + brick.width &&
                        ball.position.y + ball.radius + 0.5 > brick.position.y &&
                        ball.position.y - ball.radius - 0.5 < brick.position.y + brick.height)
                        {
                        if (ball.direction.y > 0)
                            ball.position.y = brick.position.y - ball.radius;
                        else if (ball.direction.y < 0)
                            ball.position.y = ball.position.y + brick.height + ball.radius;

                            ball.direction.y = -ball.direction.y;

                            bricks.splice(i, 1);
                            i--;
                        }
                }
            }

        break;

        case GAME_STATE.end:

            if(Input.IsKeyDown(KEY_SPACE))
            Start();

        break;
    } 

}

function Draw(ctx)
{
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
     
    switch (currentGameState)
    {
        case GAME_STATE.init:
            bricks.forEach(brick => brick.Draw(ctx));
            player.Draw(ctx);
            balls.forEach(ball => ball.Draw(ctx));

            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "white";
            ctx.font = "24px Comic Sans MS regular";
            ctx.textAlign = "center";
            ctx.fillText("Press SPACE to  start", canvas.width / 2, canvas.height / 2 + 30);
        break;
        
        case GAME_STATE.normal:
            bricks.forEach(brick => brick.Draw(ctx));
            player.Draw(ctx);
            balls.forEach(ball => ball.Draw(ctx));
        break;
        
        case GAME_STATE.end:
            bricks.forEach(brick => brick.Draw(ctx));
            player.Draw(ctx);
            balls.forEach(ball => ball.Draw(ctx));

            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "white";
            ctx.font = "24px Comic Sans MS regular";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 + 30);
            ctx.font = "14px Comic Sans MS regular";
            ctx.fillText("press SPACE to start again", canvas.width / 2, canvas.height / 2 + 50);
            
        break;
    }

    ctx.fillStyle = "white";
    ctx.font = "12px Comic Sans MS regular";
    ctx.textAlign = "start";
    ctx.fillText("Time=" + timePlayed, 10, canvas.height-55);
    ctx.fillText("FPS=" + FPS, 10, canvas.height-40);
    ctx.fillText("deltaTime=" + currentDeltaTime, 10, canvas.height-25);
    ctx.fillText("currentFPS=" + (1/currentDeltaTime).toFixed(2), 10, canvas.height-10);

    ctx.fillStyle = "white";
    ctx.font = "24px Comic Sans MS regular";
    ctx.textAlign = "end";
    ctx.fillText("BALLS : " + vidas, canvas.width-20, canvas.height-20);
}

function BallLost(ball)
{
    vidas = vidas -1;
        
    if (vidas == 0)
        currentGameState = GAME_STATE.end;
    else{

        balls.push(new Ball({x: canvas.width / 2, y: canvas.height / 2 - 50}, BallLost));

        //player.position.x = (canvas.width / 2) - player.width /2;
        //player.position.y = canvas.height - 80;

    }
    
    const ballIndex = balls.indexOf(ball);
    if (ballIndex > -1 )
    {
        balls.splice(ballIndex, 1);
    }
}