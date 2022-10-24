class Ball
{
    constructor(position, onLoosingBall)
    {
        this.position = position;
        this.radius = 10;

        
        this.direction = {x: RandomBetween(-1, 1), y: 1};
        //this.direction = {x: RandomBetween(-1, 1), y: RandomBetween(-1, 1)};
        //this.direction = {x: 0, y: 1};
        this.velocity = 300;

        this.onLoosingBall = onLoosingBall
    }


    Start()
    {
        
    }

    Update(deltaTime)
    {
        if(timeSinceBegining > 10 && this.velocity < 500){
            this.velocity = 300 * (1+ (timeSinceBegining/100))
        }

        const deg = Math.atan2(this.direction.y, this.direction.x);
        this.position.x += Math.cos(deg) * this.velocity * deltaTime;
        this.position.y += Math.sin(deg) * this.velocity * deltaTime;

        if(this.position.x + this.radius > canvas.width)
        {
            this.direction.x = -this.direction.x;
            this.position.x = canvas.width - this.radius;
        }
        if (this.position.x - this.radius < 0)
        {
            this.direction.x = -this.direction.x;
            this.position.x = this.radius;
        }
        if(this.position.y - this.radius < 0)
        {
            this.direction.y = -this.direction.y;
            this.position.y = this.radius;
        }

        if(this.position.y > canvas.height)
        {
            this.onLoosingBall(this);
        }

        if (this.position.x + this.radius > player.position.x &&
            this.position.x - this.radius < player.position.x + player.width &&
            this.position.y + this.radius > player.position.y &&
            this.position.y - this.radius < player.position.y + player.height)
            {
            if (this.direction.y > 0)
                this.position.y = player.position.y - this.radius;
            else if (this.direction.y < 0)
                this.position.y = player.position.y + player.height + this.radius;
            this.direction.y = - this.direction.y;

            if (this.position.x < player.halfPosX)
                this.direction.x -= ((player.halfPosX - this.position.x) / player.halfPosX) * 5;
            else if (this.position.x > player.halfPosX)
                this.direction.x += ((this.position.x - player.halfPosX) / player-halfPosX) * 5;
            }
    }

    Draw(ctx)
    {
        ctx.fillStyle = "white";

        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, PI2, false);
        ctx.closePath();
        ctx.fill();
    }

}