import {Scene, Context, Sprite} from 'dkwdpil';

export class StartScene extends Scene {
    public startSprite: Sprite = new Sprite("play.png", 0, 0, {size: 12.0});

    init(context: Context): void {
        context.imageMode(context.CENTER);
        context.noStroke();
        context.fill(0);
    }

    update(c: Context) {
        c.background(235);

        c.textAlign(c.CENTER, c.CENTER);
        c.textSize(1.0);
        c.text("Example Text", 0, 15);

        for (const evt of c.events) {
            if (evt.kind === 'mousedown') {
                if (this.startSprite.touches(c.mousePos.x, c.mousePos.y, c)) {
                    c.nextScene = "nextScene";
                    return;
                }
            }
        }
    }

    duration(): number {
        return -1;
    }
}
