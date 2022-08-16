import { handlerPath } from "@libs/handler-resolver";
export const getAllTodos = {
  handler: `${handlerPath(__dirname)}/handler.getAllTodos`,
  events: [
    {
      http: {
        method: "get",
        path: "todo/",
      },
    },
  ],
};

export const createTodo = {
  handler: `${handlerPath(__dirname)}/handler.createTodo`,
  events: [
    {
      http: {
        method: "post",
        path: "create",
      },
    },
  ],
};

export const getTodo = {
  handler: `${handlerPath(__dirname)}/handler.getTodoById`,
  events: [
    {
      http: {
        method: "get",
        path: "todo/{id}",
      },
    },
  ],
};

export const updateTodo = {
  handler: `${handlerPath(__dirname)}/handler.updateTodoById`,
  events: [
    {
      http: {
        method: "put",
        path: "update/{id}",
      },
    },
  ],
};

export const deleteTodo = {
  handler: `${handlerPath(__dirname)}/handler.deleteTodoById`,
  events: [
    {
      http: {
        method: "delete",
        path: "delete/{id}",
      },
    },
  ],
};
