import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { v4 } from "uuid";
import todosService from "../../Service";

export const getAllTodos = middyfy(async (): Promise<APIGatewayProxyResult> => {
  const todos = await todosService.getAllTodos();
  return formatJSONResponse({
    todos,
  });
});

export const createTodo = middyfy(
  async (event: any): Promise<APIGatewayProxyResult> => {
    try {
      const id = v4();
      const todo = await todosService.createTodo({
        todoId: id,
        title: event.body.title,
        description: event.body.description,
        createdAt: new Date().toISOString(),
      });
      return formatJSONResponse({
        todo,
      });
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);

export const getTodoById = middyfy(
  async (event: any): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
      const todo = await todosService.getTodo(id);
      return formatJSONResponse({
        todo,
        id,
      });
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);

export const updateTodoById = middyfy(
  async (event: any): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
      const todo = await todosService.updateTodo(id, event.body);
      return formatJSONResponse({
        todo,
        id,
      });
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);

export const deleteTodoById = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
      const todo = await todosService.deleteTodo(id);
      return formatJSONResponse({
        todo,
        id,
      });
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);
