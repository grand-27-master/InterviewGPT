import {User} from "@clerk/nextjs/server"
import { JobRoleId } from "../constants/roles"


export interface ExtendedUser extends User {
    intervieweHistory: InterviewSession[];
    preferences: UserPreferences;
    lastActivity: Date;
}

export interface UserPreferences {
    jobRole: JobRoleId;
    difficulty: "beginner" | "intermediate" | "advanced";
}

export interface InterviewSession {
    jobId: JobRoleId;
    date: Date;
    id:string;
    createdAt: Date;
    difficulty: "beginner" | "intermediate" | "advanced";
    status: "in-progress" | "completed" | "cancelled";
    duration: number;
    totalQuestions: number;
    currentQuestion: number;
}

export interface InterviewQuestion {
    id: string;
    question: string;
    category: QuestionCategory;
    difficulty: QuestionDifficulty;
}

export type QuestionCategory = "technical" | "system-design" | "behavioral" | "problem-solving";
export type QuestionDifficulty = "easy" | "medium" | "hard";

export interface GenerateQuestions{
    jobId: JobRoleId;
    category: QuestionCategory;
    difficulty: QuestionDifficulty;
    count: number;
}

export interface GenerateResponse{
    questions: InterviewQuestion[];
    success: boolean;
}

export interface ApiError {
    error: string;
}

export type ApiResponse<T> = {
    data: T;
    success: boolean;
    error?: ApiError;
}

export function isApiError(response: ApiResponse<unknown>): response is ApiResponse<never> {
    return "error" in response;
}