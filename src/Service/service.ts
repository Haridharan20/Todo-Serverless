import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Todo from "../model/Todo";

export default class TodoServerice {
  private Tablename: string = "TodoTable_Hari";

  constructor(private docClient: DocumentClient) {}

  async getAllTodos(): Promise<Todo[]> {
    const todos = await this.docClient
      .scan({
        TableName: this.Tablename,
      })
      .promise();
    return todos.Items as Todo[];
  }

  async createTodo(todo: Todo): Promise<Todo> {
    await this.docClient
      .put({
        TableName: this.Tablename,
        Item: todo,
      })
      .promise();
    return todo as Todo;
  }

  async getTodo(id: string): Promise<any> {
    const todo = await this.docClient
      .get({
        TableName: this.Tablename,
        Key: {
          todoId: id,
        },
      })
      .promise();
    if (!todo.Item) {
      throw new Error("Id does not exit");
    }
    return todo.Item as Todo;
  }

  async updateTodo(id: string, todo: Partial<Todo>): Promise<Todo> {
    console.log(todo);
    console.log(todo);
    let exp = "set ";
    let attNames: any = {};
    let attVal: any = {};
    for (const attribute in todo) {
      const valKey = `:${attribute}`;
      exp += `#${attribute}=${valKey}, `;
      attNames[`#${attribute}`] = attribute;
      const val = todo[attribute];
      attVal[valKey] = val;
    }
    exp = exp.substring(0, exp.length - 2);
    console.log(exp, attNames, attVal);
    const updated = await this.docClient
      .update({
        TableName: this.Tablename,
        Key: { todoId: id },
        UpdateExpression: exp,
        ExpressionAttributeNames: attNames,
        ExpressionAttributeValues: attVal,
        ReturnValues: "ALL_NEW",
      })
      .promise();
    return updated.Attributes as Todo;
  }

  async deleteTodo(id: string): Promise<any> {
    return await this.docClient
      .delete({
        TableName: this.Tablename,
        Key: {
          todoId: id,
        },
      })
      .promise();
  }
}
