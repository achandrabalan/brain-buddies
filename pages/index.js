import Header from '../components/Header';
import Layout from '../components/Layout';

export default function Index({ posts, globalData }) {
  return (
    <Layout>
      <Header name={'refactors'} />
    </Layout>
  );
}
