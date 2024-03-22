import NavBar from '../components/NavBar';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import LandingContent from '../components/LandingContent';
import { Toaster } from 'react-hot-toast';

export default function Index({ posts, globalData }) {
  return (
    <Layout>
      <NavBar name={'refactors'} />
      <Hero />
    </Layout>
  );
}
