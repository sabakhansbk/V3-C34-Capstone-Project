class Projectile {

    constructor(xpos, ypos, xvel, yvel) {

        this.body = Matter.Bodies.circle(xpos, ypos, 5);
        World.add(world, this.body)

        Matter.Body.setVelocity(this.body, {
            x: xvel, 
            y: yvel})

    }

    display() {
        push()
        ellipseMode(RADIUS)
        ellipse(this.body.position.x, this.body.position.y, 5,5)
        pop()
    }

}