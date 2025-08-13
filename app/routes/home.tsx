import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Grade My CV" },
    { name: "description", content: "Get Excellent Feedback For Your Dream Job!" },
  ];
}

export default function Home() {
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading">
          <h1 className="capitalize">keep track of your job applications and see how your resume scores</h1>
          <h2 className="capitalize">Review your submissions and receive actionable feedback powered by AI.</h2>
        </div>
      </section>
    </main>
  );
}
