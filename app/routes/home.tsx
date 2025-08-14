import Navbar from "~/components/Navbar";
import { useTranslation } from "~/i18n";
import type { Route } from "./+types/home";
import { resumes } from "~/constants";
import ResumeCard from "~/components/ResumeCard";

export function meta({}: Route.MetaArgs) {
  // Note: Meta tags will be handled differently - we'll need a meta hook
  // For now, keeping static but we can make this dynamic later
  return [
    { title: "Grade My CV" },
    { name: "description", content: "Get Excellent Feedback For Your Dream Job!" },
  ];
}

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-12">
          <h1 className="capitalize">{t('home.heading')}</h1>
          <h2 className="capitalize">{t('home.subheading')}</h2>
        </div>

        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}