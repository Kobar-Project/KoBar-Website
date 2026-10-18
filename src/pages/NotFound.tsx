import Layout from '../components/Layout';
import { Container } from '../components/ui';

export default function NotFound() {
  return (
    <Layout>
      <Container className="py-24">
        <h1 className="text-5xl">Page not found</h1>
      </Container>
    </Layout>
  );
}
