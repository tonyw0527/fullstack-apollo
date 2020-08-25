const { MongoDataSource } = require('apollo-datasource-mongodb');
const mongoose = require('mongoose');
const MINUTE = 60; // for caching

// schema
const Todo = new mongoose.Schema({
    title: String,
    content: String,
    done: Boolean
});

// model - 'Todo'는 todos collection을 가리킴.
const todoModel = mongoose.model('Todo', Todo);

class TodoModel extends MongoDataSource {
    constructor() {
        super(todoModel);
    }

    getTodo(todoId) {
        const result = this.findOneById(todoId, { ttl: MINUTE });
        console.log(result);
        return result;
    }

    UpdateTodoTitle(_id, newTitle) {
        this.deleteFromCacheById(_id);
        todoModel.findOne({_id: _id}, function(err, todo) {

            todo.title = newTitle;
            todo.content = "몽구스를 이용해 몽고디비 데이터 소스 제어(업데이트)";
            todo.save();
        })
        return "update 실행";
    }
    
}

module.exports = {TodoModel}