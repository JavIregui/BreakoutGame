var player = {
    position: {x: 0, y: 0},
    velocity: 500,
    width: 100,
    height:20,
    halfPosX: 0,

    Start: function () {
        this.position.x = (canvas.width / 2) - this.width /2;
        this.position.y = canvas.height - 80;
    },

    Update: function (deltaTime) {
        if ((Input.IsKeyPressed(KEY_LEFT)) || (Input.IsKeyPressed(KEY_A)))
            this.position.x -= this.velocity * deltaTime;
        if ((Input.IsKeyPressed(KEY_RIGHT)) || (Input.IsKeyPressed(KEY_D)))
            this.position.x += this.velocity * deltaTime;
        if (this.position.x < 0)
            this.position.x = 0;
        else if (this.position.x + this.width > canvas.width)
            this.position.x = canvas.width - this.width;
        
        this.halfPosX = this.position.x + this.width / 2;
    },
    
    Draw: function (ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

}