import { Project } from "../../../models/project.model";


export interface ProjectListDTO {
  count: number,
  projects: Project[]

}
