import { User } from "@clerk/nextjs/server";
import { JobRoleId } from "../constants/roles";

export interface ExtendedUser extends User {
    interviewHistory: InterviewSession[];  // Fixed typo
    preferences: UserPreferences;
    lastActivity: Date;
}

export interface UserPreferences {
    jobRole: JobRoleId;
    difficulty: DifficultyLevel;
}

export interface InterviewSession {
    jobId: JobRoleId;
    date: Date;
    id: string;
    createdAt: Date;
    difficulty: DifficultyLevel;
    status: InterviewStatus;
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

export enum QuestionDifficulty {
    Easy = "easy",
    Medium = "medium",
    Hard = "hard",
}

export enum DifficultyLevel {
    Beginner = "beginner",
    Intermediate = "intermediate",
    Advanced = "advanced",
}

export enum InterviewStatus {
    InProgress = "in-progress",
    Completed = "completed",
    Cancelled = "cancelled",
}

export interface GenerateQuestions {
    jobId: JobRoleId;
    category: QuestionCategory;
    difficulty: QuestionDifficulty;
    count: number;
}

export interface GenerateResponse {
    questions: InterviewQuestion[];
    success: boolean;
}

export interface ApiError {
    error: string;
    code?: number;
    details?: string;
}

export type ApiResponse<T> = {
    data: T;
    success: boolean;
    error?: ApiError;
};

export function isApiError(response: ApiResponse<unknown>): response is ApiResponse<never> {
    return !!response.error;
}
