import Layout from '../components/Layout';
import { Container } from '../components/ui';

export default function Privacy() {
  return (
    <Layout current="/privacy/">
      <Container className="py-24">
        <h1 className="text-5xl">Privacy policy</h1>
      </Container>
    </Layout>
  );
}
