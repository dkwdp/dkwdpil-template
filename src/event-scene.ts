import {Scene, Context, Label} from 'dkwdpil';
import {Evt} from "../../dkwdp-interactivelib/src/event";

export class EventScene extends Scene {
    labels: Label[] = [];

    init(context: Context): void {
        context.imageMode(context.CENTER);
        context.noStroke();
        context.fill(0);
    }

    update(c: Context) {
        c.background(235);

        if (c.keyJustPressed("KeyQ")) {
            c.nextScene = "startScene";
        }

        for (const evt of c.events) {
            this.labels.push(new Label("", eventText(evt), -28, 0, {fontsize: 1.0}));
            if (this.labels.length > 10) {
                this.labels.shift();
            }
        }

        this.labels.forEach(label => label.update(c));


        for (let i = 0; i < this.labels.length; i++) {
            this.labels[i].y = 16 - i * 2;
        }

        this.labels.forEach(label => label.draw());
    }
}

function eventText(evt: Evt): string {
    switch (evt.kind) {
        case 'keydown':
            return `keydown (key=${evt.key}, keyCode=${evt.keyCode}, code=${evt.code})`;
        case'keyup':
            return `keyup (key=${evt.key}, keyCode=${evt.keyCode}, code=${evt.code})`;
        case 'keytyped':
            return `keytyped (key=${evt.key}, keyCode=${evt.keyCode}, code=${evt.code})`;
        case 'mousedown':
            return `mousedown (x=${evt.x.toFixed(2)}, y=${evt.y.toFixed(2)}, taste=${getMouseButtonText(evt.button)})`;
        case 'mouseup':
            return `mouseup (x=${evt.x.toFixed(2)}, y=${evt.y.toFixed(2)}, taste=${getMouseButtonText(evt.button)})`;
        case 'click':
            return `click (x=${evt.x.toFixed(2)}, y=${evt.y.toFixed(2)}, taste=${getMouseButtonText(evt.button)})`;
        case 'mousemove':
            return `mousemove (x=${evt.x.toFixed(2)}, y=${evt.y.toFixed(2)}, dx=${evt.dx.toFixed(2)}, dy=${evt.dy.toFixed(2)}, ziehen=${evt.dragging})`;
        case 'mousewheel':
            return `mousewheel (wheelY=${evt.wheelY})`;
    }

    return "unknown event";
}

function getMouseButtonText(button: number): string {
    switch (button) {
        case 0: return 'links';
        case 1: return 'mitte';
        case 2: return 'rechts';
    }
    throw new Error(`Unknown mouse button: ${button}`);
}
