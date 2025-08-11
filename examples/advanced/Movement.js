export class Movement {
    constructor() {
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.moveUp = false;
        this.moveDown = false;
        this.boost = false; // Keep boost for now, can be triggered by other means if needed

        this.isPanning = false;
        this.lastPanPosition = { x: 0, y: 0 };

        document.addEventListener("wheel", (event) => this.onWheel(event));
        document.addEventListener("mousedown", (event) => this.onMouseDown(event));
        document.addEventListener("mouseup", (event) => this.onMouseUp(event));
        document.addEventListener("mousemove", (event) => this.onMouseMove(event));
    }

    onWheel(event) {
        if (event.deltaY < 0) {
            // Scroll up -> move forward
            this.moveForward = true;
            setTimeout(() => { this.moveForward = false; }, 50);
        } else if (event.deltaY > 0) {
            // Scroll down -> move backward
            this.moveBackward = true;
            setTimeout(() => { this.moveBackward = false; }, 50);
        }
    }

    onMouseDown(event) {
        // Middle mouse button for panning
        if (event.button === 1) {
            this.isPanning = true;
            this.lastPanPosition.x = event.clientX;
            this.lastPanPosition.y = event.clientY;
        }
    }

    onMouseUp(event) {
        if (event.button === 1) {
            this.isPanning = false;
            this.moveLeft = false;
            this.moveRight = false;
            this.moveUp = false;
            this.moveDown = false;
        }
    }

    onMouseMove(event) {
        if (!this.isPanning) {
            return;
        }

        const deltaX = event.clientX - this.lastPanPosition.x;
        const deltaY = event.clientY - this.lastPanPosition.y;

        // Horizontal panning
        if (deltaX < -1) {
            this.moveLeft = true;
            this.moveRight = false;
        } else if (deltaX > 1) {
            this.moveRight = true;
            this.moveLeft = false;
        } else {
            this.moveLeft = false;
            this.moveRight = false;
        }

        // Vertical panning
        if (deltaY < -1) {
            this.moveUp = true;
            this.moveDown = false;
        } else if (deltaY > 1) {
            this.moveDown = true;
            this.moveUp = false;
        } else {
            this.moveUp = false;
            this.moveDown = false;
        }

        this.lastPanPosition.x = event.clientX;
        this.lastPanPosition.y = event.clientY;
    }
}