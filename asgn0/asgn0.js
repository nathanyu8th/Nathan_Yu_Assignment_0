// Global variables so all functions can access them
let canvas;
let ctx;

function main() {
    canvas = document.getElementById("example");
    if (!canvas) {
        console.log("Failed to retrieve the <canvas> element");
        return;
    }

    ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 400, 400);
}

// Draw a vector from the origin
function drawVector(v, color) {
    ctx.strokeStyle = color;
    ctx.beginPath();

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + v.elements[0] * 20, cy - v.elements[1] * 20);

    ctx.stroke();
}

function handleDrawEvent() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 400, 400);

    // input values
    const x1 = parseFloat(document.getElementById("xCoord1").value);
    const y1 = parseFloat(document.getElementById("yCoord1").value);

    const v1 = new Vector3([x1, y1, 0]);

    const x2 = parseFloat(document.getElementById("xCoord2").value);
    const y2 = parseFloat(document.getElementById("yCoord2").value);

    const v2 = new Vector3([x2, y2, 0]);

    drawVector(v1, "red");
    drawVector(v2, "blue");
}

function handleDrawOperationEvent() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 400, 400);

    // input values
    const x1 = parseFloat(document.getElementById("xCoord1").value);
    const y1 = parseFloat(document.getElementById("yCoord1").value);

    const v1 = new Vector3([x1, y1, 0]);

    const x2 = parseFloat(document.getElementById("xCoord2").value);
    const y2 = parseFloat(document.getElementById("yCoord2").value);

    const v2 = new Vector3([x2, y2, 0]);

    const operation = document.getElementById("operation").value;
    const scalar = parseFloat(document.getElementById("scalar").value);

    drawVector(v1, "red");
    drawVector(v2, "blue");

    const v3 = v1;
    const v4 = v2;

    if (operation == "Add") {
        v3.add(v2);
        drawVector(v3, "green");
    } else if (operation == "Subtract") {
        v3.sub(v2);
        drawVector(v3, "green");
    } else if (operation == "Multiply") {
        v3.mul(scalar);
        v4.mul(scalar);
        drawVector(v3, "green");
        drawVector(v4, "green");
    } else if (operation == "Divide") {
        v3.div(scalar);
        v4.div(scalar);
        drawVector(v3, "green");
        drawVector(v4, "green");
    } else if (operation == "Magnitude") {
        console.log(v1.magnitude());
        console.log(v2.magnitude());
    } else if (operation == "Normalize") {
        v3.normalize();
        v4.normalize();
        drawVector(v3, "green");
        drawVector(v4, "green");
    } else if (operation == "Angle Between") {
        console.log(angleBetween(v1, v2));
    } else if (operation == "Area") {
        const area = areaTriangle(v1, v2);
        console.log("Triangle area:", area);
    }
}

function angleBetween(v1, v2) {
    const product = Vector3.dot(v1, v2);
    const mag1 = v1.magnitude();
    const mag2 = v2.magnitude();

    if (mag1 === 0 || mag2 === 0) {
        return null;
    }
    return Math.acos(product / (mag1 * mag2)) * (180 / Math.PI);
}

function areaTriangle(v1, v2) {
    const crossVec = Vector3.cross(v1, v2);
    console.log(crossVec);
    const parallelogramArea = crossVec.magnitude();
    return parallelogramArea / 2;
}
