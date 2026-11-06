import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Marquee from './components/Marquee';
import Hero from './sections/Hero';
import About from './sections/About';
import Method from './sections/Method';
import Expertise from './sections/Expertise';
import Projects from './sections/Projects';
import Blog from './sections/Blog';
import Record from './sections/Record';
import Resume from './sections/Resume';
import Faq from './sections/Faq';
import Contact from './sections/Contact';
import { useRepos, usePosts } from './hooks/useRemote';
import { useI18n } from './i18n';
import { toolsUsed } from './data/expertise';

export default function App() {
  const { t } = useI18n();
  const repos = useRepos();
  const posts = usePosts();
  return (
    <>
      <a href="#main" className="btn-primary sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]">{t.nav.skip}</a>
      <Navbar />
      <main id="main">
        <Hero repos={repos} posts={posts} />
        <div className="border-y border-line/70 bg-surface/40 py-7">
          <p className="sr-only">{t.marquee}</p>
          <Marquee items={toolsUsed} label={t.marquee} />
        </div>
        <About projects={repos.projects} posts={posts.posts} />
        <Method />
        <Expertise />
        <Projects {...repos} />
        <Blog {...posts} />
        <Record />
        <Resume />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
