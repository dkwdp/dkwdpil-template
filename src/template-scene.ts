import {Scene, Context, Sprite, Label} from 'dkwdpil';

export class TemplateScene extends Scene {
    title: Label = new Label("title", "Title", 0, 15, {fontsize: 2.5, horizAlign: "center", vertAlign: "center"});

    update(c: Context) {
        c.background(235);
    }
}
