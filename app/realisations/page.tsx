import { request } from "@/lib/datocms/datocms";
import Query from "@/lib/datocms/queries";
import RealisationsPage from "./template/realisationsPage";

export default async function Realisations() {
  const {
    data: { allProjets: realisations },
  } = await request({ query: Query.QUERY_CARD_PROJETS });
  const {
    data: { home },
  } = await request({ query: Query.QUERY_HOME });

  return <RealisationsPage data={[realisations, home]} />;
}
