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

  static async getTeacherByIdFromAllTeachers(
    id: number
  ): Promise<TeacherDTO | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const mockResponse = {
      ok: true,
      status: 200,
      json: async () =>
        teachersData.find((teacher) => teacher.id === id) ||
        teachers.find((teacher) => teacher.id === id) ||
        null,
    };

    if (!mockResponse.ok) {
      throw new Error(`Failed to fetch teacher: ${mockResponse.status}`);
    }

    const data: TeacherDTO | null = await mockResponse.json();
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

  static async addTeacher(
    teacherData: Omit<TeacherDTO, "id" | "avatar" | "fullName" | "status">
  ): Promise<TeacherDTO> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newId = Math.max(...teachersData.map((t) => t.id), 0) + 1;

    const fullName = `${teacherData.personalInformation.name} ${teacherData.personalInformation.surname} ${teacherData.personalInformation.fatherName}`;

    const avatar = `https://images.unsplash.com/photo-${Date.now()}?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=880`;
    const status = "Əmr gözləyir";
    const newTeacher: TeacherDTO = {
      id: newId,
      avatar,
      fullName,
      status,
      ...teacherData,
    };

    teachersData.push(newTeacher);

    const mockResponse = {
      ok: true,
      status: 201,
      json: async () => newTeacher,
    };

    if (!mockResponse.ok) {
      throw new Error(`Failed to add teacher: ${mockResponse.status}`);
    }

    const data: TeacherDTO = await mockResponse.json();
    return data;
  }

  static async updateTeacher(
    id: number,
    teacherData: Omit<TeacherDTO, "id" | "avatar" | "fullName" | "status">
  ): Promise<TeacherDTO> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const teacherIndex =
      teachersData.findIndex((t) => t.id === id) ||
      teachers.findIndex((t) => t.id === id);

    if (teacherIndex === -1) {
      throw new Error(`Teacher with id ${id} not found`);
    }

    const existingTeacher =
      teachersData[teacherIndex] || teachers[teacherIndex];

    const fullName = `${teacherData.personalInformation.name} ${teacherData.personalInformation.surname} ${teacherData.personalInformation.fatherName}`;
    const status = "Əmr var";

    const updatedTeacher: TeacherDTO = {
      ...existingTeacher,
      ...teacherData,
      fullName,
      status,
    };

    teachersData[teacherIndex] = updatedTeacher;

    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => updatedTeacher,
    };

    if (!mockResponse.ok) {
      throw new Error(`Failed to update teacher: ${mockResponse.status}`);
    }

    const data: TeacherDTO = await mockResponse.json();
    return data;
  }

  static async deleteTeacher(id: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const teacherIndex = teachersData.findIndex((t) => t.id === id);

    if (teacherIndex === -1) {
      throw new Error(`Teacher with id ${id} not found`);
    }

    teachersData.splice(teacherIndex, 1);

    const mockResponse = {
      ok: true,
      status: 204,
    };

    if (!mockResponse.ok) {
      throw new Error(`Failed to delete teacher: ${mockResponse.status}`);
    }
  }
}
