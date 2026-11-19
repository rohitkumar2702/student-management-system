import { useEffect, useMemo, useState } from "react";
import { Plus, Users, Search, RefreshCw, ServerCrash } from "lucide-react";
import toast from "react-hot-toast";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import Modal from "../components/ui/Modal";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import StudentForm from "../components/students/StudentForm";
import StudentFilters from "../components/students/StudentFilters";
import StudentTable from "../components/students/StudentTable";
import StudentDetailModal from "../components/students/StudentDetailModal";
import {
  createStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
} from "../api/studentApi";
import { getErrorMessage, getFieldErrors } from "../utils/apiErrors";
import useDebounce from "../hooks/useDebounce";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const debouncedSearch = useDebounce(search, 250);

  // Modals State
  const [formModal, setFormModal] = useState({ open: false, mode: "create", student: null });
  const [viewStudent, setViewStudent] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverFieldErrors, setServerFieldErrors] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllStudents();
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const departments = useMemo(() => {
    const set = new Set(students.map((s) => (s.department || "").trim()).filter(Boolean));
    return Array.from(set).sort();
  }, [students]);

  const filtered = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    return students.filter((s) => {
      const matchDept = !department || s.department === department;
      if (!matchDept) return false;
      if (!q) return true;
      return (
        s.name?.toLowerCase().includes(q) ||
        s.email?.toLowerCase().includes(q) ||
        s.department?.toLowerCase().includes(q)
      );
    });
  }, [students, debouncedSearch, department]);

  const hasActiveFilters = Boolean(search || department);

  const clearFilters = () => {
    setSearch("");
    setDepartment("");
  };

  // ----- Create / Edit -----
  const openCreate = () => {
    setServerFieldErrors(null);
    setFormModal({ open: true, mode: "create", student: null });
  };

  const openEdit = (student) => {
    setServerFieldErrors(null);
    setViewStudent(null);
    setFormModal({ open: true, mode: "edit", student });
  };

  const closeForm = () => {
    if (submitting) return;
    setFormModal({ open: false, mode: "create", student: null });
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    setServerFieldErrors(null);
    try {
      if (formModal.mode === "create") {
        await createStudent(values);
        toast.success("Student added successfully");
      } else {
        await updateStudent(formModal.student.id, values);
        toast.success("Student updated successfully");
      }
      setFormModal({ open: false, mode: "create", student: null });
      await load(); // Data reload karo
    } catch (err) {
      const fe = getFieldErrors(err);
      if (fe) setServerFieldErrors(fe);
      toast.error(getErrorMessage(err));
      // throw nahi karenge taaki form band na ho, par spinner ruk jaye
    } finally {
      setSubmitting(false);
    }
  };

  // ----- Delete -----
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteStudent(deleteTarget.id);
      toast.success("Student deleted");
      setDeleteTarget(null);
      await load(); // Data reload karo
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="students-page">
      {/* Header */}
      <div className="students-page__head">
        <div>
          <p className="eyebrow">Directory</p>
          <h2 className="students-page__title">All Students</h2>
          <p className="students-page__sub">
            {loading
              ? "Loading students…"
              : `${filtered.length} of ${students.length} student${students.length === 1 ? "" : "s"}`}
          </p>
        </div>
        <Button variant="primary" iconLeft={<Plus size={16} />} onClick={openCreate}>
          Add Student
        </Button>
      </div>

      {/* Filters */}
      <Card padded={false} className="students-page__filters-card">
        <div className="students-page__filters-inner">
          <StudentFilters
            search={search}
            onSearchChange={setSearch}
            departments={departments}
            department={department}
            onDepartmentChange={setDepartment}
            onClear={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>
      </Card>

      {/* Body */}
      {error ? (
        <Card>
          <EmptyState
            icon={<ServerCrash size={26} />}
            title="Could not load students"
            description={error}
            action={
              <Button variant="secondary" iconLeft={<RefreshCw size={16} />} onClick={load}>
                Retry
              </Button>
            }
          />
        </Card>
      ) : !loading && students.length === 0 ? (
        <Card>
          <EmptyState
            icon={<Users size={26} />}
            title="No students yet"
            description="Add your first student to get started."
            action={
              <Button variant="primary" iconLeft={<Plus size={16} />} onClick={openCreate}>
                Add Student
              </Button>
            }
          />
        </Card>
      ) : !loading && filtered.length === 0 ? (
        <Card>
          <EmptyState
            variant="compact"
            icon={<Search size={22} />}
            title="No matching students"
            description="Try adjusting your search or filters."
            action={
              hasActiveFilters ? (
                <Button variant="secondary" onClick={clearFilters}>
                  Clear filters
                </Button>
              ) : null
            }
          />
        </Card>
      ) : (
        <Card padded={false}>
          <StudentTable
            students={filtered}
            loading={loading}
            onView={(s) => setViewStudent(s)}
            onEdit={openEdit}
            onDelete={(s) => setDeleteTarget(s)}
          />
        </Card>
      )}

      {/* Create/Edit modal */}
      <Modal
        open={formModal.open}
        onClose={closeForm}
        title={formModal.mode === "create" ? "Add Student" : "Edit Student"}
        subtitle={
          formModal.mode === "create"
            ? "Fill in the details to add a new student."
            : `Update record #${formModal.student?.id}`
        }
        size="md"
        closeOnBackdrop={!submitting}
        footer={
          <>
            <Button variant="secondary" onClick={closeForm} disabled={submitting}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" form="student-form" loading={submitting}>
              {formModal.mode === "create" ? "Add Student" : "Save Changes"}
            </Button>
          </>
        }
      >
        <StudentForm
          key={formModal.mode + (formModal.student?.id ?? "new")}
          initialValues={
            formModal.student
              ? {
                  name: formModal.student.name,
                  email: formModal.student.email,
                  age: formModal.student.age,
                  department: formModal.student.department,
                }
              : undefined
          }
          onSubmit={handleSubmit}
          serverFieldErrors={serverFieldErrors}
        />
      </Modal>

      {/* Detail modal */}
      <StudentDetailModal
        open={Boolean(viewStudent)}
        onClose={() => setViewStudent(null)}
        student={viewStudent}
        onEdit={() => viewStudent && openEdit(viewStudent)}
      />

      {/* Delete confirm */}
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => (deleting ? null : setDeleteTarget(null))}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete this student?"
        description={
          <>
            You are about to delete <strong>{deleteTarget?.name}</strong>. This action cannot be undone.
          </>
        }
        confirmLabel="Delete"
      />

      <style>{`
        .students-page { display: flex; flex-direction: column; gap: var(--space-5); }
        .students-page__head { display: flex; align-items: flex-end; justify-content: space-between; gap: var(--space-4); flex-wrap: wrap; }
        .students-page__title { font-size: var(--fs-2xl); margin: 2px 0 0; }
        .students-page__sub { color: var(--color-text-muted); font-size: var(--fs-sm); margin: 2px 0 0; }
        .students-page__filters-card { overflow: visible; }
        .students-page__filters-inner { padding: var(--space-4) var(--space-5); }
        @media (max-width: 640px) { .students-page__filters-inner { padding: var(--space-3); } }
      `}</style>
    </div>
  );
}