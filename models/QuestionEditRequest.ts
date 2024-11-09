/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JudgeCase } from './JudgeCase';
import type { JudgeConfig } from './JudgeConfig';
export type QuestionEditRequest = {
    acceptedNum?: number;
    answer?: string;
    content?: string;
    id?: number;
    judgeCase?: Array<JudgeCase>;
    judgeConfig?: Array<JudgeConfig>;
    submitNum?: number;
    tags?: Array<string>;
    title?: string;
};

