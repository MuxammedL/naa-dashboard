import { teachers, teachersData } from "@/constant/teachers";
import type { TeacherDTO } from "@/types/types";
// import { HttpClient } from "./HttpClient";

export class TeacherService {
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

  static async getTeachersByFinNameSurname(
    searchQuery?: string
  ): Promise<TeacherDTO[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let filteredData = teachersData;

    if (searchQuery && searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();

      filteredData = teachersData.filter((teacher) => {
        const fincode = teacher.personalInformation.fincode.toLowerCase();
        const name = teacher.personalInformation.name.toLowerCase();
        const surname = teacher.personalInformation.surname.toLowerCase();
        const fullName = teacher.fullName.toLowerCase();

        return (
          fincode.includes(query) ||
          name.includes(query) ||
          surname.includes(query) ||
          fullName.includes(query)
        );
      });
    }

    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => filteredData,
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
