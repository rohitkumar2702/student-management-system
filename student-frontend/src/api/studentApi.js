import axiosClient from "./axiosClient";

/*
  Student API — wraps all backend endpoints.
  Backend base: /api/students  (from VITE_API_BASE_URL)
*/

/**
 * Create a new student.
 * POST /api/students/create
 * @param {{ name, email, age, department }} payload
 * @returns {Promise<{ id, name, email, age, department }>}
 */
export async function createStudent(payload) {
  const { data } = await axiosClient.post("/students/create", payload);
  return data;
}

/**
 * Get all students.
 * GET /api/students/all
 * @returns {Promise<Array<{ id, name, email, age, department }>>}
 */
export async function getAllStudents() {
  const { data } = await axiosClient.get("/students/all");
  return data;
}

/**
 * Get one student by id.
 * GET /api/students/{id}
 * @param {number|string} id
 * @returns {Promise<{ id, name, email, age, department }>}
 */
export async function getStudentById(id) {
  const { data } = await axiosClient.get(`/students/${id}`);
  return data;
}

/**
 * Update an existing student.
 * PUT /api/students/{id}
 * @param {number|string} id
 * @param {{ name, email, age, department }} payload
 * @returns {Promise<{ id, name, email, age, department }>}
 */
export async function updateStudent(id, payload) {
  const { data } = await axiosClient.put(`/students/${id}`, payload);
  return data;
}

/**
 * Delete a student by id.
 * DELETE /api/students/{id}
 * @returns {Promise<void>}
 */
export async function deleteStudent(id) {
  await axiosClient.delete(`/students/${id}`);
}