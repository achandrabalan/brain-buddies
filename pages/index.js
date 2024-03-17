import NavBar from '../components/NavBar';
import Layout from '../components/Layout';
import TypingAnimation from '../components/TypingAnimation';
import LandingContent from '../components/LandingContent';
import { Toaster } from 'react-hot-toast';

export default function Index({ posts, globalData }) {
  return (
    <Layout>
      <NavBar name={'refactors'} />
      <TypingAnimation />
      <LandingContent />
    </Layout>
  );
}
