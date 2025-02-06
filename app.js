// const express = require('express')
// const app = express()
// const path = require('path')

// app.use(express.static(__dirname + '/public'))
// app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build/')));
// app.use('/jsm/',express.static(path.join(__dirname, 'node_modules/three/examples/jsm/')));

// app.listen(3000,()=>
// console.log('ve al url http://127.0.0.1:3000')
// );

// Importar Express desde npm en formato ESM
import express from "npm:express@4";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(join(__dirname, "public")));

// Servir Three.js desde node_modules
app.use("/build/", express.static(join(__dirname, "node_modules/three/build/")));
app.use("/jsm/", express.static(join(__dirname, "node_modules/three/examples/jsm/")));

app.listen(3000, () => console.log("Ve al URL http://127.0.0.1:3000"));
