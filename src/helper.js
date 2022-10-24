const PI2 = Math.PI * 2;

function RandomBetween(min, max)
{
    return (Math.random() * (max - min)) + min;
}

function GetRandomColor() {
    var r = 255 * RandomBetween(0.15,1);
        g = 255 * RandomBetween(0.15,1);
        b = 255 * RandomBetween(0.15,1);
    return `rgb(${r},${g},${b})`;
}