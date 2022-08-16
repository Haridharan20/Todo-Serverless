import dynamoDBClient from "../model";
import TodoServerice from "./service";

const todoService = new TodoServerice(dynamoDBClient());
export default todoService;
