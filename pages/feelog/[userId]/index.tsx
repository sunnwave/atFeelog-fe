import { GetServerSideProps } from "next";
import UserProfilePage from "@/components/features/profile/UserProfilePage";
import { JSX } from "react";

type Props = {
  userId: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const userId = params?.userId as string;
  return { props: { userId } };
};

export default function FeelogProfileRoute({ userId }: Props): JSX.Element {
  return <UserProfilePage userId={userId} />;
}