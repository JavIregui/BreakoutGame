class Brick
{
    constructor(position, width, height, color)
    {
        this.position = position;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    Draw (ctx)
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}