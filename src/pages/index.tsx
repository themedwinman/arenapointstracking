import Dashboard from "@/pages/dashboard";
import Login from "@/components/login/Login";
import { useSession } from "next-auth/react";
import scss from "../components/Layout/Layout.module.scss";
import React from "react";

import { db } from '@/db';
import { points } from '@/db/schema/points';
import { get } from "http";


type pointsDB =  {
  pointsGained: number;
  pointsLost: number;
  associatedHouse: string;
}

export const getServerSideProps = (async () => {
  const pointsDB = await db.select({
    points_gained: points.pointsGained,
    points_lost: points.pointsLost,
    house: points.associatedHouse
  }).from(points).execute();
  return { props: { points: pointsDB } }
});

console.log(points)

const Home: React.FC = () => {
  const { data: session } = useSession();

  return (
    <main className={scss.main}>
      {session && <Dashboard />}
      {!session && <Login />}
    </main>
  );
};

export default Home;