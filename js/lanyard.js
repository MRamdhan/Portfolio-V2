import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

import * as CANNON from "https://cdn.jsdelivr.net/npm/cannon-es@0.20.0/dist/cannon-es.js";


const container = document.getElementById("lanyard-container");

if (!container) {
    console.error("Element #lanyard-container tidak ditemukan.");
} else {

    /* =========================================
       SCENE
    ========================================= */

    const scene = new THREE.Scene();


    /* =========================================
       CAMERA
    ========================================= */

    const camera = new THREE.PerspectiveCamera(
        35,
        container.clientWidth / container.clientHeight,
        0.1,
        100
    );

    camera.position.set(0, 0, 7);


    /* =========================================
       RENDERER
    ========================================= */

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    renderer.shadowMap.enabled = true;

    container.appendChild(renderer.domElement);


    /* =========================================
       LIGHT
    ========================================= */

    const ambientLight =
        new THREE.AmbientLight(
            0xffffff,
            2
        );

    scene.add(ambientLight);


    const directionalLight =
        new THREE.DirectionalLight(
            0xffffff,
            3
        );

    directionalLight.position.set(
        3,
        5,
        5
    );

    directionalLight.castShadow = true;

    scene.add(directionalLight);


    /* =========================================
       PHYSICS
    ========================================= */

    const world = new CANNON.World();

    world.gravity.set(
        0,
        -9.82,
        0
    );


    /* =========================================
       ROPE
    ========================================= */

    const segments = 8;
    const segmentLength = 0.10;
    const ropeRadius = 0.030;

    const bodies = [];


    for (let i = 0; i < segments; i++) {

        const body = new CANNON.Body({
            mass: i === 0 ? 0 : 0.04,
            linearDamping: 0.2,
            angularDamping: 0.2
        });

        body.addShape(
            new CANNON.Sphere(ropeRadius)
        );

        body.position.set(
            0,
            2.1 - i * segmentLength,
            0
        );

        world.addBody(body);

        bodies.push(body);
    }


    /* =========================================
       ROPE CONSTRAINT
    ========================================= */

    for (let i = 1; i < segments; i++) {

        const constraint =
            new CANNON.DistanceConstraint(
                bodies[i - 1],
                bodies[i],
                segmentLength
            );

        world.addConstraint(
            constraint
        );
    }


    /* =========================================
       ROPE VISUAL
    ========================================= */

    const ropeGeometry =
        new THREE.BufferGeometry();

    const ropeMaterial =
        new THREE.LineBasicMaterial({
            color: 0x222222
        });

    const rope =
        new THREE.Line(
            ropeGeometry,
            ropeMaterial
        );

    scene.add(rope);


    /* =========================================
   CARD TEXTURE
========================================= */

const canvas = document.createElement("canvas");

canvas.width = 800;
canvas.height = 1100;

const ctx = canvas.getContext("2d");


/* =========================================
   BACKGROUND
========================================= */

ctx.fillStyle = "#151515";

ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
);


/* =========================================
   BORDER
========================================= */

ctx.strokeStyle = "#555";

ctx.lineWidth = 10;

ctx.strokeRect(
    20,
    20,
    760,
    1060
);


/* =========================================
   HEADER
========================================= */

ctx.textAlign = "center";

ctx.fillStyle = "#ffffff";

ctx.font = "bold 55px Arial";


/* =========================================
   PROFILE PHOTO
========================================= */

const profileImage = new Image();

profileImage.src = "./asset/me.png";

profileImage.onload = function () {

    /* Foto lingkaran */

    ctx.save();

    ctx.beginPath();

    ctx.arc(
        400,
        330,
        150,
        0,
        Math.PI * 2
    );

    ctx.closePath();

    ctx.clip();


    /* Foto */

    ctx.drawImage(
        profileImage,
        250,
        180,
        300,
        300
    );

    ctx.restore();


    /* Border foto */

    ctx.beginPath();

    ctx.arc(
        400,
        330,
        150,
        0,
        Math.PI * 2
    );

    ctx.strokeStyle = "#555";

    ctx.lineWidth = 8;

    ctx.stroke();


    /* =========================================
       NAME
    ========================================= */

    ctx.fillStyle = "#ffffff";

    ctx.font = "bold 55px Arial";

    ctx.fillText(
        "RAMDHAN",
        400,
        600
    );

    ctx.fillText(
        "IRAWAN",
        400,
        670
    );


    /* =========================================
       ROLE
    ========================================= */

    ctx.fillStyle = "#aaaaaa";

    ctx.font = "30px Arial";

    ctx.fillText(
        "FULLSTACK WEB DEVELOPER",
        400,
        750
    );


    /* =========================================
       LINE
    ========================================= */

    ctx.fillStyle = "#444";

    ctx.fillRect(
        150,
        810,
        500,
        4
    );


    /* =========================================
       DESCRIPTION
    ========================================= */

    ctx.fillStyle = "#bbbbbb";

    ctx.font = "28px Arial";

    ctx.fillText(
        "Web Development",
        400,
        890
    );

    ctx.fillText(
        "Portfolio 2026",
        400,
        940
    );


    /* Update texture */

    texture.needsUpdate = true;
};


/* =========================================
   TEXTURE
========================================= */

const texture = new THREE.CanvasTexture(canvas);

texture.colorSpace = THREE.SRGBColorSpace;


/* =========================================
   CARD
========================================= */

const cardWidth = 1.7;

const cardHeight = 2.35;


const cardGeometry =
    new THREE.BoxGeometry(
        cardWidth,
        cardHeight,
        0.08
    );


/* =========================================
   CARD MATERIAL
========================================= */

const cardMaterial =
    new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.4,
        metalness: 0.1
    });


/* =========================================
   CARD MESH
========================================= */

const card =
    new THREE.Mesh(
        cardGeometry,
        cardMaterial
    );

card.castShadow = true;

scene.add(card);


    /* =========================================
       CARD PHYSICS
    ========================================= */

    const cardBody =
        new CANNON.Body({
            mass: 0.5,
            linearDamping: 0.35,
            angularDamping: 0.4
        });


    cardBody.addShape(
        new CANNON.Box(
            new CANNON.Vec3(
                cardWidth / 2,
                cardHeight / 2,
                0.04
            )
        )
    );


    cardBody.position.set(
    0,
    -0.2,
    0
    );

    const originalCardPosition = new CANNON.Vec3(
        0,
        -0.2,
        0
    );

    world.addBody(
        cardBody
    );


    /* =========================================
       CONNECT CARD TO ROPE
    ========================================= */

    const cardConstraint =
        new CANNON.DistanceConstraint(
            bodies[segments - 1],
            cardBody,
            0.18
        );

    world.addConstraint(
        cardConstraint
    );


    /* =========================================
       MOUSE / TOUCH DRAG
    ========================================= */

    let dragging = false;
    let returning = false;

    let lastX = 0;
    let lastY = 0;


    container.addEventListener(
        "pointerdown",
        function (event) {

            dragging = true;

            lastX =
                event.clientX;

            lastY =
                event.clientY;

            container.setPointerCapture(
                event.pointerId
            );
        }
    );


    container.addEventListener(
        "pointermove",
        function (event) {

            if (!dragging) return;

            const dx =
                event.clientX - lastX;

            const dy =
                event.clientY - lastY;


            cardBody.velocity.x +=
                dx * 0.06;

            cardBody.velocity.y -=
                dy * 0.06;


            cardBody.angularVelocity.z +=
                dx * 0.01;

            cardBody.angularVelocity.x +=
                dy * 0.01;


            lastX =
                event.clientX;

            lastY =
                event.clientY;
        }
    );


    container.addEventListener(
        "pointerup",
        function (event) {

            dragging = false;
            returning = true;

            container.releasePointerCapture(
                event.pointerId
            );
        }
    );


    container.addEventListener(
        "pointercancel",
        function () {

            dragging = false;
        }
    );


    /* =========================================
       ANIMATION
    ========================================= */

    const clock =
        new THREE.Clock();


    function returnToOriginalPosition() {

        if (!returning || dragging) return;


        /* =========================================
        KEMBALIKAN CARD KE POSISI AWAL
        ========================================= */

        const strength = 0.10;
        const damping = 0.78;


        const dx =
            originalCardPosition.x -
            cardBody.position.x;

        const dy =
            originalCardPosition.y -
            cardBody.position.y;

        const dz =
            originalCardPosition.z -
            cardBody.position.z;


        cardBody.velocity.x +=
            dx * strength;

        cardBody.velocity.y +=
            dy * strength;

        cardBody.velocity.z +=
            dz * strength;


        cardBody.velocity.x *= damping;
        cardBody.velocity.y *= damping;
        cardBody.velocity.z *= damping;


        /* =========================================
        KEMBALIKAN ROTASI CARD
        ========================================= */

        const targetQuaternion =
            new CANNON.Quaternion(
                0,
                0,
                0,
                1
            );


        cardBody.quaternion.slerp(
            targetQuaternion,
            0.08
        );


        cardBody.angularVelocity.x *= 0.80;
        cardBody.angularVelocity.y *= 0.80;
        cardBody.angularVelocity.z *= 0.80;


        /* =========================================
        KEMBALIKAN TALI
        ========================================= */

        for (let i = 0; i < segments; i++) {

            const targetX = 0;

            const targetY =
                2.1 -
                i * segmentLength;

            const targetZ = 0;


            const body = bodies[i];


            const ropeStrength =
                i === 0 ? 0.15 : 0.08;


            body.velocity.x +=
                (targetX - body.position.x)
                * ropeStrength;

            body.velocity.y +=
                (targetY - body.position.y)
                * ropeStrength;

            body.velocity.z +=
                (targetZ - body.position.z)
                * ropeStrength;


            body.velocity.x *= 0.82;
            body.velocity.y *= 0.82;
            body.velocity.z *= 0.82;


            body.angularVelocity.x *= 0.80;
            body.angularVelocity.y *= 0.80;
            body.angularVelocity.z *= 0.80;
        }


        /* =========================================
        CEK SUDAH KEMBALI ATAU BELUM
        ========================================= */

        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy +
                dz * dz
            );


        if (distance < 0.04) {

            /* Card */

            cardBody.position.copy(
                originalCardPosition
            );

            cardBody.velocity.set(
                0,
                0,
                0
            );

            cardBody.angularVelocity.set(
                0,
                0,
                0
            );


            cardBody.quaternion.set(
                0,
                0,
                0,
                1
            );


            /* Rope */

            for (let i = 0; i < segments; i++) {

                const body = bodies[i];


                body.position.set(
                    0,
                    2.1 - i * segmentLength,
                    0
                );


                body.velocity.set(
                    0,
                    0,
                    0
                );


                body.angularVelocity.set(
                    0,
                    0,
                    0
                );


                body.quaternion.set(
                    0,
                    0,
                    0,
                    1
                );
            }


            returning = false;
        }
    }
        
    function animate() {

        requestAnimationFrame(
            animate
        );

        const delta =
            Math.min(
                clock.getDelta(),
                0.05
            );

        // Membuat lanyard kembali
        // ke posisi awal setelah dilepas
        returnToOriginalPosition();

        /* Physics */

        world.step(
            1 / 60,
            delta,
            3
        );

        /* Rope positions */

        const points = [];

        for (
            let i = 0;
            i < segments;
            i++
        ) {

            const body =
                bodies[i];

            points.push(
                new THREE.Vector3(
                    body.position.x,
                    body.position.y,
                    body.position.z
                )
            );
        }

        ropeGeometry.setFromPoints(
            points
        );

        /* Card */

        card.position.copy(
            cardBody.position
        );

        card.quaternion.copy(
            cardBody.quaternion
        );

        /* Render */

        renderer.render(
            scene,
            camera
        );
    }


    animate();


    /* =========================================
       RESIZE
    ========================================= */

    function resize() {

        const width =
            container.clientWidth;

        const height =
            container.clientHeight;


        if (
            width === 0 ||
            height === 0
        ) {
            return;
        }


        camera.aspect =
            width / height;

        camera.updateProjectionMatrix();


        renderer.setSize(
            width,
            height
        );
    }


    window.addEventListener(
        "resize",
        resize
    );


    resize();
}