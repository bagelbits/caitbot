import styles from "./page.module.css";
import SequenceGenerator from "../components/sequenceGenerator"
import {server} from "../config"
import {Trick} from "./api/tricks/route"

async function getTricks() {
  const res = await fetch(`${server}/api/tricks`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const tricks:Trick[] = await getTricks();
  console.log(tricks);
  return (
    <main className={styles.main}>
      <SequenceGenerator tricks={tricks}/>
    </main>
  );
}
