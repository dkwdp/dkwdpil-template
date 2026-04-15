import {Context, Label, Scene, Sprite} from 'dkwdpil';

const IMAGE_MODES: ("center" | "radius" | "corner")[] = ["center", "radius", "corner"];

export class NextScene extends Scene {
    face: Sprite = new Sprite("faceSprite", "face.png", 0, 0, {size: 12.0, imageMode: "center"});
    touchingLabel: Label = new Label("touchingLabel", "touching", 0, -16, {fontsize: 1.5, horizAlign: "center", vertAlign: "center"});
    imageModeIndex: number = 0;

    update(context: Context) {
        context.background(235);

        this.face.rotation += 0.01;

        this.touchingLabel.visible = this.face.hovered;

        if (this.face.clicked) {
            this.imageModeIndex = (this.imageModeIndex + 1) % IMAGE_MODES.length;
            this.face.imageMode = IMAGE_MODES[this.imageModeIndex];
        }
    }
}
