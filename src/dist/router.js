"use strict";
exports.__esModule = true;
var express_1 = require("express");
var createController = require('./todos/create');
var readController = require('./todos/read');
var updateController = require('./todos/update');
var router = (0, express_1.Router)();
// POST
// Add New Todo
router.post('/postTodo', createController.postTodo);
// GET
// Find a single Todo
router.get('/todos/:todoId', readController.getOneTodo);
// Find all Todos
router.get('/todos', readController.getAllTodos);
// Find a user's profile
router.get('/user/:userId', readController.getUser);
// PUT
// Mark a Todo as finished
router.put('/finishTodo/:todoId', updateController.finishTodo);
// Soft Delete Todo
router.put('/deleteTodo/:todoId', updateController.softDelete);
// Update a Todo
router.put('/updateTodo/:todoId', updateController.updateTodo);
exports["default"] = router;
//# sourceMappingURL=router.js.map