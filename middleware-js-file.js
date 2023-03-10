"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const ejs = require("ejs");
const cors = require("cors");
const app = express();
app.use(cors());
app.set("view engine", "ejs");
class Model {
    constructor(data) {
        this.image = data.image;
        this.title = data.title;
        this.metaDescription = data.metaDescription;
        this.author = data.author;
        this.html = data.html;
        this.images = data.images;
    }
}
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let url = `https://stage-api.homluv.com/api/nlc/`;
    let url2 = `/?pagesize=16&page=${req.query.page}`;
    if (req.query.category) {
        url += `category`;
        url += url2;
        url += `&category=${req.query.category}`;
    }
    else {
        url += `articles`;
        url += url2;
    }
    if (req.query.search) {
        url += `&search=${req.query.search}`;
    }
    console.log(url);
    const data = yield fetch(url);
    const dataa = yield data.json();
    console.log(dataa);
    let data_to_send = [];
    dataa.forEach((element) => {
        data_to_send.push(new Model(element));
    });
    res.json(data_to_send);
}));
app.listen(1700);

