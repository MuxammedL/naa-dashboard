import { teachers } from "@/constant/teachers";
import type { TeacherDTO } from "@/types/types";
// import { HttpClient } from "./HttpClient";

export class TeacherSerivce {
  static async getTeachers(): Promise<TeacherDTO[]> {
    // Real Case
    // const res = await HttpClient.get<TeacherDTO[]>("/teachers");
    // return res.data;

    // Simulated Case
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => teachers,
    };

    if (!mockResponse.ok) {
      throw new Error(`Failed to fetch teachers: ${mockResponse.status}`);
    }

    const data: TeacherDTO[] = await mockResponse.json();
    return data;
  }

  static async getTeacherById(id: number): Promise<TeacherDTO | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => teachers.find((teacher) => teacher.id === id) || null,
    };

    if (!mockResponse.ok) {
      throw new Error(`Failed to fetch teacher: ${mockResponse.status}`);
    }

    const data: TeacherDTO | null = await mockResponse.json();
    return data;
  }
}
