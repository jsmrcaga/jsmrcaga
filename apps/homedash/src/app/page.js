import { connection } from 'next/server'
import styles from "./page.module.css";

import { Page } from '../components/page';
import { Swiper } from '../components/swiper';
import { Reloader } from './components/reloader';
import { KubernetesNode } from "./components/kubernetes/node";
import { UnifiNetwork } from "./components/network/unifi";

export default async function Home() {
  await connection();

  return (
    <>
      <Swiper>
        {/* Default in order to allow next to pre-render the page without secrets */}
        <Page name="Network" description={(new URL(process.env.UNIFI_LOCAL_ENDPOINT || 'https://0.0.0.0')).host}>
          <UnifiNetwork/>
        </Page>

        {/*<Page name="k3s cluster">
          <KubernetesNode name="jo-home-lab-1" ip="10.0.0.2"/>
          <KubernetesNode name="jo-home-lab" ip="10.0.0.2"/>
        </Page>*/}
      </Swiper>
      <Reloader/>
    </>
  );
}
