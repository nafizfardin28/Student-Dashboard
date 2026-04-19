import api from "./client";

export const getStudents = async (params?: {
  search?: string;
  year?: string;
  status?: string;
}) => {
  const response = await api.get("/students", { params });
  return response.data;
};

export const getStudentById = async (id: string) => {
  const response = await api.get(`/students/${id}`);
  return response.data;
};

export const createStudent = async (payload: any) => {
  const response = await api.post("/students", payload);
  return response.data;
};

export const updateStudent = async (id: string, payload: any) => {
  const response = await api.put(`/students/${id}`, payload);
  return response.data;
};

export const createScholarship = async (payload: any) => {
  const response = await api.post("/scholarships", payload);
  return response.data;
};

export const updateScholarship = async (id: string, payload: any) => {
  const response = await api.put(`/scholarships/${id}`, payload);
  return response.data;
};

export const createMeeting = async (payload: any) => {
  const response = await api.post("/meetings", payload);
  return response.data;
};

export const updateMeeting = async (id: string, payload: any) => {
  const response = await api.put(`/meetings/${id}`, payload);
  return response.data;
};

export const getMentors = async () => {
  const response = await api.get("/mentors");
  return response.data;
};