import { CreateTaskDatasourceEntity, TaskEntity } from "../interfaces/task.interface";
import { v4 as uuid } from "uuid";


export class TasksAdapter {

    static datasourceCreateEntity (datasource: CreateTaskDatasourceEntity): TaskEntity {
        return {
            id: uuid(),
            title: datasource.title,
            description: datasource.description,
            done: false,
            createdAt: new Date(),
            updatedAt: new Date()
        };
    }

    static updateEntity(datasource: TaskEntity): TaskEntity {
        return {
            id: datasource.id,
            title: datasource.title,
            description: datasource.description,
            done: !datasource.done,
            createdAt: datasource.createdAt,
            updatedAt: new Date()
        };
    }

}