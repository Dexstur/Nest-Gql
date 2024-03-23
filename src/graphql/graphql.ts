
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface LoginInput {
    email: string;
    password: string;
}

export interface RegisterInput {
    email: string;
    password: string;
    name: string;
    departmentId: string;
}

export interface CreateDept {
    name: string;
    description?: Nullable<string>;
    leadId?: Nullable<string>;
}

export interface User {
    id: string;
    email: string;
    password: string;
    role: string;
    slackId: string;
    name: string;
    active: boolean;
    confirmed: boolean;
    departmentId: string;
    department?: Nullable<Department>;
    manageIds?: Nullable<Nullable<string>[]>;
    manages?: Nullable<Nullable<Department>[]>;
    taskIds?: Nullable<Nullable<string>[]>;
    code: string;
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    statusCode: number;
    message: string;
    data?: Nullable<User>;
    token: string;
}

export interface IQuery {
    me(): Nullable<User> | Promise<Nullable<User>>;
    getAllUsers(): Nullable<User>[] | Promise<Nullable<User>[]>;
}

export interface IMutation {
    register(input: RegisterInput): AuthResponse | Promise<AuthResponse>;
    login(input: LoginInput): AuthResponse | Promise<AuthResponse>;
    create(input: CreateDept): Department | Promise<Department>;
}

export interface Department {
    id: string;
    name: string;
    description?: Nullable<string>;
    leadId?: Nullable<string>;
    memberIds: Nullable<string>[];
    lead?: Nullable<User>;
    members: Nullable<User>[];
    managerIds: Nullable<string>[];
    managers: Nullable<User>[];
}

type Nullable<T> = T | null;
