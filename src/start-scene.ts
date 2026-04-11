import {Scene, Context, Sprite, Label} from 'dkwdpil';

export class StartScene extends Scene {
    startSprite: Sprite = new Sprite("play.png", 0, 0, {size: 12.0});
    testLabel1: Label = new Label("Example Title", 0, 15, {fontsize: 3.0, horizAlign: "center", vertAlign: "center"});

    init(context: Context): void {
        context.imageMode(context.CENTER);
        context.noStroke();
        context.fill(0);
    }

    update(c: Context) {
        c.background(235);

        if (this.startSprite.clicked) {
            c.nextScene = "nextScene";
        }
        if (this.testLabel1.hovered) {
            this.testLabel1.color = [255, 0, 0];
        } else {
            this.testLabel1.color = [0, 0, 0];
        }
    }

    duration(): number {
        return -1;
    }
}
