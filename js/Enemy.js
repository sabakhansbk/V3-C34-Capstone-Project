class Enemy {

    constructor(xpos, ypos) {

        this.body = Matter.Bodies.circle(xpos, ypos, 40)
        World.add(world, this.body);

    }

    display() {

        ellipse(this.body.position.x, this.body.position.y, 80, 80);

    }

    update() {

        this.body.angle = Math.atan2((this.body.position.y - player.position.y) * -1, (this.body.position.x - player.position.x) * -1);
        Matter.Body.setVelocity(this.body, {x: Math.cos(this.body.angle) * 3, y: Math.sin(this.body.angle) * 3})

    }

}