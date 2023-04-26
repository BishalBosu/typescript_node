"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get("/", (req, res, next) => {
    return res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text
    };
    todos.push(newTodo);
    return res.json({ sucess: true, message: "sucessfully posted", todo: newTodo });
});
router.post('/deletetodo', (req, res, next) => {
    const idToRemove = req.body.id;
    const filteredTodo = todos.filter((item) => item.id !== idToRemove);
    if (todos.length == filteredTodo.length) {
        return res.status(404).json({ sucess: false, message: "Id not found" });
    }
    else {
        todos = [...filteredTodo];
        return res.json({ sucess: true, message: "sucessfully deleted", todo: {} });
    }
});
router.post('/edittodo', (req, res, next) => {
    const idToEdit = req.body.id;
    const textToEdit = req.body.text;
    todos.forEach(el => {
        if (el.id == idToEdit) {
            el.text = textToEdit;
            return res.json({ sucess: true, message: "sucessfully edited", todo: el });
        }
    });
    return res.json({ sucess: false, message: "Id not found!", todo: {} });
});
exports.default = router;
