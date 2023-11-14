import RegisterForm from "./component/RegisterForm";

export default function page() {
  return (
    <main className="center-container h-screen p-5">
      <h1 className="text-2xl font-bold mb-5">Register</h1>
      <RegisterForm />
    </main>
  );
}
