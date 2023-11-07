import RegisterForm from "./component/RegisterForm";

export default function page() {
  return (
    <main className="center-container h-[90vh]">
      <h1 className="text-2xl font-bold mb-5">Register</h1>
      <RegisterForm />
    </main>
  );
}
