import { Course, Message } from ".";

export enum CourseTypes {
  RECORD_COUSE = "RECORD_COUSE",
  DSTRY_COURSE = "DSTRY_COURSE",
  RTR_COURSE = "RTR_COURSE",
  L_COURSE = "L_COURSE",
  FAILURE_COURSE = "FAILURE_COURSE",
}

export interface CourseState {
  readonly course: Course[];
  readonly data: Course;
  readonly validate: boolean;
  readonly message: Message;
}
