import NavBar from '../components/NavBar';
import Layout from '../components/Layout';
import TypingAnimation from '../components/TypingAnimation';
import LandingContent from '../components/LandingContent';

export default function Index({ posts, globalData }) {
  return (
    <Layout>
      <NavBar name={'refactors'} />
      <TypingAnimation />
      <LandingContent />
    </Layout>
  );
}
