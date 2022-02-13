export default class AnimatedCircle {
    constructor(p5, x, y, hue, size, lifetime, opacity = 0.1) {
        this.p = p5;
        this.origin = this.p.createVector(x, y);
        this.hue = hue;
        this.size = 0;
        this.maxSize = size;
        this.setLifeTime(lifetime);
        this.opacity = opacity;
    }
    setLifeTime(lifetime) {
        const frameRate = this.p.getFrameRate() ? this.p.getFrameRate() : 60;
        this.totalsFrames = frameRate * lifetime;
    }

    draw() {
        for (let i = 0; i < this.maxSize / this.totalsFrames; i++) {
            this.p.stroke(this.hue, 0, 0);
            this.p.fill(this.hue, 100, 100, this.opacity);
            this.p.ellipse(this.origin.x, this.origin.y, this.size, this.size);
            if(this.size < this.maxSize){
                this.size++;
            }
        }
    }
}