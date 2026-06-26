import UserProfileScreen from "@/components/features/user/ui/screen/UserProfileScreen";
import { GetServerSideProps } from "next";
import { JSX } from "react";

type Props = {
  userId: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const userId = params?.userId as string;
  return { props: { userId } };
};

export default function UserProfileRoute({ userId }: Props): JSX.Element {
  return <UserProfileScreen userId={userId} />;
}