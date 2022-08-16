"use strict";

const canvas = document.querySelector("canvas"),
      ctx = canvas.getContext("2d");

      window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

const Particles = [];
const countParticles = 80;

const properties = {
    maxVelocity: 0.5,
    connectionRadius: 150 
};

class Particle {
    constructor() {
        this.radius = 3;
        this.x = this.getRandom(this.radius*2, canvas.width - this.radius);
        this.y = this.getRandom(this.radius*2, canvas.height - this.radius);
        this.vx = Math.random() * (properties.maxVelocity * 2) - properties.maxVelocity;
        this.vy = Math.random() * (properties.maxVelocity * 2) - properties.maxVelocity;
    }

    draw() {
        ctx.fillStyle = "rgb(234, 244, 253)";   
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.closePath();
        ctx.fill();
    }

    getRandom(min, max) {
        return Math.floor(Math.random() * (min + max) + 1);
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function animate() {
    clearCanvas();

    for (let i in Particles) {
        let particle = Particles[i];

        if (particle.x - particle.radius <= 0 || particle.x + particle.radius >= canvas.width) {
            particle.vx *= -1;
        }
        if (particle.y - particle.radius <= 0 || particle.y + particle.radius >= canvas.height) {
            particle.vy *= -1;
        }


        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.draw();

        for (let j in Particles) {
            let neighbor = Particles[j];
            let distance = Math.sqrt(Math.pow(particle.x - neighbor.x, 2) + Math.pow(particle.y - neighbor.y, 2));
            if (distance < properties.connectionRadius) {
                let opacity = 1 - distance/properties.connectionRadius;
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(neighbor.x, neighbor.y);
                ctx.closePath();
                ctx.strokeStyle = `rgba(200, 200, 200, ${opacity})`;
                ctx.stroke();
            }
        }
    }


    requestAnimationFrame(animate);
}


function init() {
    for (let i = 0; i < countParticles; i++) {
        let particle = new Particle();
        Particles.push(particle);
        particle.draw();
    }
    animate();
}

init();

function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
}