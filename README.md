# 🛫 National Aviation Academy — Front-End Task

## Project Overview

This project is built using **React + TypeScript + TailwindCSS + React Query + Framer Motion**.  
It follows **Atomic Design Architecture** and modular development practices.

---

## ⚡ Technical Features

### 1. Tailwind Configuration

- All color palette and font sizes used in Figma (e.g., `label1`, `label2`) are configured in `tailwind.config.js`.
- Utility classes and `@apply` directives were used for easier reuse.

### 2. Routing System

- Navigation is implemented using the `useRoutes` hook.
- All routes are centralized in `routes.tsx` and support dynamic imports.

### 3. Project Structure

- Follows **Atomic Design** principles: `atoms`, `molecules`, `organisms`, `templates`, `pages`.
- Each page is modular and reusable.

### 4. Multi-functional Drawer

- Drawer component can open from **top, bottom, left, and right** directions.
- Rendered via portal and controlled by a **Context Controller**.

### 5. Animations

- Enter and exit animations use `ease-out`.
- Hover effects use `ease`.
- All transitions are handled using **Framer Motion** for smooth animations.

### 6. Performance Optimization

- **React Query caching** prevents redundant API calls.
- Transitions are applied only to changing elements to reduce CPU usage.
- `useCallback` and `useMemo` are used to prevent unnecessary re-renders.

### 7. UX Improvements

- **Skeleton UI** for loading states.
- Teacher add/edit panel opens with animations.
- Smooth transitions for **Stepper** navigation.
- `scrollbar-gutter: stable` ensures layout stability during scrolling.
- **Body scroll disabled** for dashboard pages to maintain controlled scrolling.

### 8. Global State Management

- Teacher info panels are accessible globally via **Context Controller**.

### 9. Modular Styling

- All CSS is in `*.module.css` to prevent class conflicts.
- Inline class usage minimized for cleaner code.

### 10. Form Handling & Validation

- **Formik + Yup** for form validation.
- Error, focus, and disabled states styled according to the design.

### 11. Mock API / Services

- Services can switch between **mock data** and **real API** by changing `baseURL`.
- Example service for teachers:

```ts
// src/services/TeacherService.ts
import type { TeacherDTO } from "@/types/types";
import { teachers } from "@/constant/teachers";

export class TeacherService {
  static async getTeachers(): Promise<TeacherDTO[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(teachers), 500);
    });
  }

  static async addTeacher(newTeacher: TeacherDTO): Promise<TeacherDTO> {
    return new Promise((resolve) => {
      setTimeout(() => {
        teachers.push(newTeacher);
        resolve(newTeacher);
      }, 500);
    });
  }

  static async updateTeacher(updatedTeacher: TeacherDTO): Promise<TeacherDTO> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = teachers.findIndex((t) => t.id === updatedTeacher.id);
        if (index === -1) return reject("Teacher not found");
        teachers[index] = updatedTeacher;
        resolve(updatedTeacher);
      }, 500);
    });
  }

  static async deleteTeacher(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = teachers.findIndex((t) => t.id === id);
        if (index === -1) return reject("Teacher not found");
        teachers.splice(index, 1);
        resolve();
      }, 500);
    });
  }
}
```
