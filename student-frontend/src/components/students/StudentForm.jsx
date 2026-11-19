import { useState } from "react";
import { User, Mail, CalendarDays, Building2 } from "lucide-react";
import Input from "../ui/Input";
import { isValidEmail } from "../../utils/validators";

const EMPTY = { name: "", email: "", age: "", department: "" };

export default function StudentForm({
  initialValues,
  onSubmit,
  serverFieldErrors = null,
  submitId = "student-form",
}) {
  const [values, setValues] = useState(() => ({
    ...EMPTY,
    ...initialValues,
    age: initialValues?.age ? String(initialValues.age) : "",
  }));

  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const clientErrors = validate(values);
  const mergedErrors = { ...clientErrors };

  if (serverFieldErrors) {
    Object.entries(serverFieldErrors).forEach(([k, v]) => {
      mergedErrors[k] = v;
    });
  }

  const showError = (field) =>
    (touched[field] || serverFieldErrors?.[field]) && mergedErrors[field];

  const handleChange = (field) => (e) => {
    let value = e.target.value;
    if (field === "age") {
      value = value.replace(/\D/g, ""); // Sirf numbers allow karo
    }
    setValues((v) => ({ ...v, [field]: value }));
  };

  const handleBlur = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, age: true, department: true });

    if (Object.keys(clientErrors).length > 0) return;

    setSubmitting(true);
    try {
      const payload = {
        name: values.name.trim(),
        email: values.email.trim(),
        age: Number(values.age),
        department: values.department.trim(),
      };
      await onSubmit(payload);
    } catch (err) {
      // Error parent component handle karega
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form id={submitId} className="student-form" onSubmit={handleSubmit} noValidate>
      <Input
        id="sf-name"
        label="Full Name"
        placeholder="e.g. Rohit Sharma"
        iconLeft={<User size={16} />}
        value={values.name}
        onChange={handleChange("name")}
        onBlur={handleBlur("name")}
        error={showError("name")}
      />
      <Input
        id="sf-email"
        label="Email Address"
        type="email"
        placeholder="student@example.com"
        iconLeft={<Mail size={16} />}
        value={values.email}
        onChange={handleChange("email")}
        onBlur={handleBlur("email")}
        error={showError("email")}
      />
      <div className="student-form__row">
        <Input
          id="sf-age"
          label="Age"
          type="text"
          inputMode="numeric"
          placeholder="16 - 60"
          iconLeft={<CalendarDays size={16} />}
          value={values.age}
          onChange={handleChange("age")}
          onBlur={handleBlur("age")}
          error={showError("age")}
        />
        <Input
          id="sf-department"
          label="Department"
          placeholder="e.g. Computer Science"
          iconLeft={<Building2 size={16} />}
          value={values.department}
          onChange={handleChange("department")}
          onBlur={handleBlur("department")}
          error={showError("department")}
        />
      </div>

      <style>{`
        .student-form { display: flex; flex-direction: column; gap: var(--space-4); }
        .student-form__row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); }
        @media (max-width: 520px) { .student-form__row { grid-template-columns: 1fr; } }
      `}</style>
    </form>
  );
}

function validate(v) {
  const e = {};
  const name = (v.name || "").trim();
  const email = (v.email || "").trim();
  const dept = (v.department || "").trim();
  const ageStr = String(v.age || "").trim();
  const ageNum = Number(ageStr);

  if (!name) e.name = "Student name is required";
  else if (name.length < 3) e.name = "Name must be at least 3 characters";
  else if (name.length > 50) e.name = "Name must be at most 50 characters";

  if (!email) e.email = "Email is required";
  else if (!isValidEmail(email)) e.email = "Please enter a valid email address";

  if (!ageStr) e.age = "Age is required";
  else if (Number.isNaN(ageNum)) e.age = "Age must be a number";
  else if (ageNum < 16) e.age = "Age must be at least 16";
  else if (ageNum > 60) e.age = "Age cannot be greater than 60";

  if (!dept) e.department = "Department is required";
  else if (dept.length < 2) e.department = "Department must be at least 2 characters";
  else if (dept.length > 50) e.department = "Department must be at most 50 characters";

  return e;
}