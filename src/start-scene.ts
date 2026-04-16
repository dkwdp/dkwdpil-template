import {AutoDrawScene, Context, Sprite, Label, HoverEffect} from 'dkwdpil';

export class StartScene extends AutoDrawScene {
    startSprite: Sprite = new Sprite("playSprite", "play.png", 0, 0, {size: 12.0});
    editSprite: Sprite = new Sprite("editSprite", "edit.png", -30, 16, {size: 3.0});
    eventLabel: Label = new Label("eventsLabel", "Events", -30, 13, {fontsize: 1.0});
    testLabel1: Label = new Label("testLabel", "Example Title", 0, 15, {fontsize: 3.0, horizAlign: "center", vertAlign: "center"});

    hoverEffect: HoverEffect;

    constructor() {
        super();
        this.hoverEffect = new HoverEffect(this.startSprite);
    }

    update(c: Context) {
        if (c.keyJustPressed("KeyE")) {
            c.nextScene = "editScene";
        }
        if (c.keyJustPressed("KeyV")) {
            c.nextScene = "eventScene";
        }

        if (this.startSprite.clicked) {
            c.nextScene = "nextScene";
        }
        if (this.editSprite.clicked) {
            c.nextScene = "editScene";
        }

        if (this.eventLabel.hovered) {
            this.eventLabel.color = [255, 0, 0];
            if (this.eventLabel.clicked) {
                c.nextScene = "eventScene";
            }
        } else {
            this.eventLabel.color = [0, 0, 0];
        }
    }
}
