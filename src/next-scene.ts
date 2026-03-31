import {Context, Scene, Sprite} from 'dkwdpil';

const IMAGE_MODES: ("center" | "radius" | "corner")[] = ["center", "radius", "corner"];

export class NextScene extends Scene {
    face: Sprite = new Sprite("face.png", 0, 0, {size: 12.0, imageMode: "center"});
    imageModeIndex: number = 0;

    init(c: Context) {
        c.textAlign(c.CENTER, c.CENTER);
    }

    update(context: Context) {
        context.background(235);

        this.face.rotation += 0.01;

        if (this.face.touches(context.mousePos.x, context.mousePos.y, context)) {
            context.text("touching", 0, -17);
        }

        if (this.face.clicked) {
            this.imageModeIndex = (this.imageModeIndex + 1) % IMAGE_MODES.length;
            this.face.imageMode = IMAGE_MODES[this.imageModeIndex];
        }
    }
}
